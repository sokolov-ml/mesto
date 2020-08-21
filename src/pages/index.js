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
  const card = new Card(
    { name: inputValues.location, link: inputValues.image, owner: { _id: userInfo.id }, likes: [] },
    '#card-template',
    handleCardClick,
    userInfo.id,
    handleCardRemove,
    handleCardLike
  );
  cardsList.addItem(card.generateCard());

  popupAddCard._saveButton.textContent = 'Сохранение...';
  api
    .addNewCard(inputValues.location, inputValues.image)
    .finally(() => (popupAddCard._saveButton.textContent = 'Сохранить'));
});

const popupRemoveCard = new PopupWithForm('.popup_remove-card', (inputValues) => {
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
  api.setLikeCard(this._id, this._isLikedByMe);
}

function updateUserInfo(obj) {
  popupEditProfile._saveButton.textContent = 'Сохранение...';
  userInfo.setUserInfo.bind(userInfo)(obj);
  api
    .updateCurrentUserInfo(obj.name, obj.status)
    .finally(() => (popupEditProfile._saveButton.textContent = 'Сохранить'));
}

function updateUserPhoto(obj) {
  popupEditPhoto._saveButton.textContent = 'Сохранение...';
  userInfo.setUserPhoto(obj.image);
  api.updateCurrentUserPhoto(obj.image).finally(() => (popupEditPhoto._saveButton.textContent = 'Сохранить'));
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
    console.log('can`t get userInfo');
  });

//Отрисовываем первые карточки
api
  .getCards()
  .then((result) => {
    cardsList = new Section(
      {
        items: result.reverse(),
        renderer: (item) => {
          const card = new Card(item, '#card-template', handleCardClick, userInfo.id, handleCardRemove, handleCardLike);
          cardsList.addItem(card.generateCard());
        },
      },
      '.elements'
    );
    cardsList.renderItems();
  })
  .catch(() => {
    console.log('can`t get cards');
  });
