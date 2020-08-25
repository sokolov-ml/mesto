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

// Карточки
let cardsList;
let activeCard;

// Формы:
const popupEditProfile = new PopupWithForm('.popup_edit-profile', updateUserInfo);

const popupEditPhoto = new PopupWithForm('.popup_update-avatar', updateUserPhoto);

const popupAddCard = new PopupWithForm('.popup_add-card', (inputValues) => {
  popupAddCard._saveButton.textContent = 'Сохранение...';
  api
    .addNewCard(inputValues.location, inputValues.image)
    .then((response) => {
      cardsList.addItem(createNewCard(response));
      popupAddCard.close();
    })
    .catch(() => {
      console.error('can`t add cards');
    })
    .finally(() => {
      popupAddCard._saveButton.textContent = 'Сохранить';
    });
});

const popupRemoveCard = new PopupWithForm('.popup_remove-card', (inputValues) => {
  popupRemoveCard._saveButton.textContent = 'Удаление...';
  api
    .removeCard(activeCard.getId())
    .then(() => {
      activeCard.removeCard();
      popupRemoveCard.close();
    })
    .catch(() => {
      console.error('can`t delete cards');
    })
    .finally(() => {
      popupRemoveCard._saveButton.textContent = 'Да';
    });
});

const popupCardImage = new PopupWithImage('.popup_show-image');

// Настройки валидации

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

const validators = {};
validators.popupEditProfile = new FormValidator(validationSettings, popupEditProfile.form);
validators.popupEditPhoto = new FormValidator(validationSettings, popupEditPhoto.form);
validators.popupAddCard = new FormValidator(validationSettings, popupAddCard.form);
validators.popupRemoveCard = new FormValidator(validationSettings, popupRemoveCard.form);

//// Функции
function initUserInfo() {
  api
    .getCurrentUserInfo()
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.setUserPhoto(result);
    })
    .catch(() => {
      console.error('can`t get userInfo');
    });
}

function initCards() {
  api
    .getCards()
    .then((result) => {
      cardsList = new Section(
        {
          items: result.reverse(),
          renderer: (item) => {
            cardsList.addItem(createNewCard(item));
          },
        },
        '.elements'
      );
      cardsList.renderItems();
    })
    .catch(() => {
      console.error('can`t get cards');
    });
}

function createNewCard(data) {
  const card = new Card(data, '#card-template', handleCardClick, userInfo.getId(), handleCardRemove, handleCardLike);
  return card.generateCard();
}

function handleCardClick(img, title) {
  popupCardImage.open(img, title);
}

function handleCardRemove() {
  activeCard = this;
  popupRemoveCard.open();
}

function handleCardLike() {
  if (this._isAlreadyLiked) {
    api
      .setLikeCardOff(this.getId())
      .then((response) => {
        this.toggleLike(response, userInfo.getId());
      })
      .catch(() => {
        console.error('can`t set like');
      });
  } else {
    api
      .setLikeCardOn(this.getId())
      .then((response) => {
        this.toggleLike(response, userInfo.getId());
      })
      .catch(() => {
        console.error('can`t set like');
      });
  }
}

function updateUserInfo(obj) {
  popupEditProfile._saveButton.textContent = 'Сохранение...';
  api
    .updateCurrentUserInfo(obj.name, obj.about)
    .then((response) => {
      userInfo.setUserInfo(response);
      popupEditProfile.close();
    })
    .catch(() => {
      console.error('can`t update userinfo');
    })
    .finally(() => {
      popupEditProfile._saveButton.textContent = 'Сохранить';
    });
}

function updateUserPhoto(obj) {
  popupEditPhoto._saveButton.textContent = 'Сохранение...';
  api
    .updateCurrentUserPhoto(obj.avatar)
    .then((response) => {
      userInfo.setUserPhoto(response);
      popupEditPhoto.close();
    })
    .catch(() => {
      console.error('can`t update userphoto');
    })
    .finally(() => {
      popupEditPhoto._saveButton.textContent = 'Сохранить';
    });
}

//// Действия
// Включаем валидацию на всех формах
validators.popupEditProfile.enableValidation();
validators.popupEditPhoto.enableValidation();
validators.popupAddCard.enableValidation();
validators.popupRemoveCard.enableValidation();

// Назначаем слушатели
popupEditProfile.setEventListeners();
popupEditPhoto.setEventListeners();
popupAddCard.setEventListeners();
popupRemoveCard.setEventListeners();
popupCardImage.setEventListeners();

imgProfilePhoto.addEventListener('click', () => {
  popupEditPhoto.setInputValues(userInfo.getUserInfo());
  validators.popupEditPhoto.validateForm();
  popupEditPhoto.open();
});

btnProfileEdit.addEventListener('click', function () {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  validators.popupEditProfile.validateForm();
  popupEditProfile.open();
});

btnAddCard.addEventListener('click', function () {
  validators.popupAddCard.validateForm();
  popupAddCard.open();
});

initUserInfo();
initCards();
