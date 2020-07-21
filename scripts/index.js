import { initialCards } from './init.js';
import Card from './Card.js';
import * as popup from './popup.js';
import FormValidator from './FormValidator.js';



//// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save'
};

// Включаем валидацию
document.querySelectorAll('.popup__form').forEach(form => {
  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
})

//// Формы и сабмиты:
const formEditProfile = document.querySelector('.popup__form_edit-profile');
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  popup.closePopup(evt.target.closest('.popup'));
});

const formAddCard = document.querySelector('.popup__form_add-card');
formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard({
    name: document.querySelector('.popup__input_field_location').value,
    link: document.querySelector('.popup__input_field_image').value
  });
  evt.target.reset();
  popup.closePopup(evt.target.closest('.popup'));
});

//// Элементы и кнопки:
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_status');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const btnProfileEdit = document.querySelector('.profile__edit-btn');
btnProfileEdit.addEventListener('click', function () {
  const popupEdit = document.querySelector('.popup_edit-profile');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;

  // Валидируем форму
  (new FormValidator(validationSettings, popupEdit)).validateForm();

  popup.openPopup(popupEdit);
});

const btnAddCard = document.querySelector('.profile__add-btn');
btnAddCard.addEventListener('click', function () {
  const popupAddCard = document.querySelector('.popup_add-card');
  popupAddCard.querySelector('.popup__form').reset();
  (new FormValidator(validationSettings, popupAddCard)).validateForm();
  popup.openPopup(popupAddCard);
});

// Добавление карточек:
const cardsContainer = document.querySelector('.elements');

function addCard(item) {
  const card = new Card(item, '#card-template');
  cardsContainer.prepend(card.generateCard());
}

initialCards.forEach(item => addCard(item));

