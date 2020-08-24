import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css';
import '../favicon.ico';

//// Переменные и константы:
//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '23bbe762-c214-4ce4-b9fd-b26b33fa43ee',
    'Content-Type': 'application/json',
  },
});

// Поля ввода
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_status');

// Кнопки
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');
//Фото профиля
const imgProfilePhoto = document.querySelector('.profile__photo-overlay');

// Информация о пользователе
const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserStatus: '.profile__status',
  selectorUserPhoto: '.profile__photo',
});
let cardsList;

let activeCard;

// Формы:
const popupEditProfile = new PopupWithForm('.popup_edit-profile', updateUserInfo);

const popupEditPhoto = new PopupWithForm('.popup_update-photo', updateUserPhoto);

const popupAddCard = new PopupWithForm('.popup_add-card', (inputValues) => {
  // Надо исправить:
  // Код создания карточки дублируется ниже. Вынесите это в отдельную функцию,
  // в идеале передавая только данные карточки, а возвращая - `generateCard()`
  const card = new Card(
    { name: inputValues.location, link: inputValues.image, owner: { _id: userInfo.id }, likes: [] },
    '#card-template',
    handleCardClick,
    userInfo.id,
    handleCardRemove,
    handleCardLike
  );
  // Надо исправить:
  // 1. Рендер карточки должен происходить после успешного запроса,
  // внутри промиса (.then()). Вы это уже реализовывали для других запросов,
  // которые находятся в самом низу этого файла.
  // 2. Необходимо отлавливать ошибки запросов с помощью .catch()
  // Вы это уже также делали в самом низу.
  cardsList.addItem(card.generateCard());

  popupAddCard._saveButton.textContent = 'Сохранение...';
  api.addNewCard(inputValues.location, inputValues.image).finally(() => {
    popupAddCard._saveButton.textContent = 'Сохранить';
  });
});

const popupRemoveCard = new PopupWithForm('.popup_remove-card', (inputValues) => {
  // Надо исправить:
  // См. строку 59
  activeCard.removeCard();
  api.removeCard(activeCard.getId());
});

const popupCardImage = new PopupWithImage('.popup_show-image');

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

//// Функции
function handleCardClick(img, title) {
  popupCardImage.open(img, title);
}

function handleCardRemove(evt) {
  activeCard = this;
  popupRemoveCard.open();
}

function handleCardLike(evt) {
  // Надо исправить:
  // 1. Нету обработки ошибок: `.catch()`
  // 2. Лайк в Card ставится до ответа сервера, поэтому нужно
  // а) Возвращать здесь промис и обрабатывать его в Card с помощью `.then()`
  // б) Прямо здесь в `.then()` вызывать метод карточки `like`, который меняет
  // состояние лайка в DOM.
  //
  // Рекомендую вариант "б", т.к он более гибкий.
  api.setLikeCard(this._id, this._isLikedByMe);
  if (this._isLikedByMe) {
    api.setLikeCard(this._id);
  } else {
    api.unsetLikeCard(this._id);
  }
}

function updateUserInfo(obj) {
  popupEditProfile._saveButton.textContent = 'Сохранение...';
  // Надо исправить:
  // См. строку 59
  // Можно лучше:
  // Для чего здесь нужен .bind()?
  userInfo.setUserInfo.bind(userInfo)(obj);
  api.updateCurrentUserInfo(obj.name, obj.status).finally(() => {
    popupEditProfile._saveButton.textContent = 'Сохранить';
  });
}

function updateUserPhoto(obj) {
  popupEditPhoto._saveButton.textContent = 'Сохранение...';
  // Надо исправить:
  // см. строку 59
  userInfo.setUserPhoto(obj.image);
  api.updateCurrentUserPhoto(obj.image).finally(() => {
    popupEditPhoto._saveButton.textContent = 'Сохранить';
  });
}

//// Действия
// Включаем валидацию на всех формах
document.querySelectorAll('.popup__form').forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});

// Назначаем слушатели
popupEditProfile.setEventListeners();
popupEditPhoto.setEventListeners();

popupAddCard.setEventListeners();
popupRemoveCard.setEventListeners();
popupCardImage.setEventListeners();

imgProfilePhoto.addEventListener('click', () => {
  new FormValidator(validationSettings, popupEditPhoto._element).validateForm();
  popupEditPhoto.open();
});

btnProfileEdit.addEventListener('click', function () {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().status;

  new FormValidator(validationSettings, popupEditProfile._element).validateForm();
  popupEditProfile.open();
});

btnAddCard.addEventListener('click', function () {
  new FormValidator(validationSettings, popupAddCard._element).validateForm();
  popupAddCard.open();
});

//Получаем информацию о пользователе
// Можно лучше:
// Использовать Promise.all() для получения карточек и информации о пользователе.
api
  .getCurrentUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      status: result.about,
      id: result._id,
    });
    userInfo.setUserPhoto(result.avatar);
  })
  .catch(() => {
    console.error('can`t get userInfo');
  });

//Отрисовываем первые карточки
api
  .getCards()
  .then((result) => {
    cardsList = new Section(
      {
        items: result.reverse(),
        renderer: (item) => {
          // Надо исправить:
          // См. строку 48
          const card = new Card(item, '#card-template', handleCardClick, userInfo.id, handleCardRemove, handleCardLike);
          cardsList.addItem(card.generateCard());
        },
      },
      '.elements'
    );
    cardsList.renderItems();
  })
  .catch(() => {
    console.error('can`t get cards');
  });

/**
 * Здравствуйте, Михаил!
 *
 * Прошу прощения, что не досмотрел ошибки на предыдущих итерациях.
 * Ваша работа все еще замечательная, нужно доработать лишь несколько моментов,
 * касающихся запросов и дублирования кода.
 *
 * Комментарии имеют формат "Надо исправить:", "Можно лучше:"
 *
 * ***
 *
 * Надеюсь на понимание,
 * желаю успехов.
 */
