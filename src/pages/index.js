import { initialCards } from '../scripts/init.js';
import Card from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import FormValidator from '../scripts/FormValidator.js';

import '../pages/index.css';

//// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

// Включаем валидацию
document.querySelectorAll('.popup__form').forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});

// Добавление карточек:
const popupImage = new PopupWithImage('.popup_show-image');
popupImage.setEventListeners();

function handleCardClick() {
  popupImage.open(this._image, this._title);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card-template', handleCardClick);
      cardsList.addItem(card.generateCard());
    },
  },
  '.elements'
);

cardsList.renderItems();

//// Формы и сабмиты:
// Попап редактирования профиля:
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo({ name: nameInput.value, status: jobInput.value });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

// Попап добавления карточки:
const popupAddCard = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  const input = popupAddCard._getInputValues();
  const card = new Card({ name: input.location, link: input.image }, '#card-template', handleCardClick);
  cardsList.addItem(card.generateCard());
  popupAddCard.close();
});
popupAddCard.setEventListeners();

//// Элементы и кнопки:
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_status');

const userInfo = new UserInfo({ selectorUserName: '.profile__name', selectorUserStatus: '.profile__status' });

const btnProfileEdit = document.querySelector('.profile__edit-btn');
btnProfileEdit.addEventListener('click', function () {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().status;

  // Валидируем форму
  new FormValidator(validationSettings, popupEditProfile._element).validateForm();

  popupEditProfile.open();
});

const btnAddCard = document.querySelector('.profile__add-btn');
btnAddCard.addEventListener('click', function () {
  new FormValidator(validationSettings, popupAddCard._element).validateForm();
  popupAddCard.open();
});
