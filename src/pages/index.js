import { initialCards } from '../scripts/init.js';
import Card from '../scripts/Card.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import FormValidator from '../scripts/FormValidator.js';

import '../pages/index.css';

//// Переменные и константы:
// Поля ввода
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_status');

// Кнопки
const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');

// Информация о пользователе
const userInfo = new UserInfo({ selectorUserName: '.profile__name', selectorUserStatus: '.profile__status' });
//Контейнер карточек:
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

// Формы:
const popupEditProfile = new PopupWithForm('.popup_edit-profile', userInfo.setUserInfo.bind(userInfo));

const popupAddCard = new PopupWithForm('.popup_add-card', (inputValues) => {
  const card = new Card({ name: inputValues.location, link: inputValues.image }, '#card-template', handleCardClick);
  cardsList.addItem(card.generateCard());
});

const popupImage = new PopupWithImage('.popup_show-image');

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
};

//// Функции
function handleCardClick(img, title) {
  popupImage.open(img, title);
}

//// Действия
// Включаем валидацию на всех формах
document.querySelectorAll('.popup__form').forEach((form) => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
});

// Назначаем слушатели
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

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

//Отрисовываем первые карточки
cardsList.renderItems();
