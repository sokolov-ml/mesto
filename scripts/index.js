import { initialCards } from './init.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


//// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save'
};

//// Формы и сабмиты:
const formEditProfile = document.querySelector('.popup__form_edit-profile');
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
});

const formAddCard = document.querySelector('.popup__form_add-card');
formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard({
    name: document.querySelector('.popup__input_field_location').value,
    link: document.querySelector('.popup__input_field_image').value
  });
  evt.target.reset();
  closePopup(evt.target.closest('.popup'));
});

// Включаем валидацию
document.querySelectorAll('.popup__form').forEach(form => {

  const formValidator = new FormValidator(validationSettings, form);
  formValidator.enableValidation();
})

//// Элементы и кнопки:
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_status');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const btnProfileEdit = document.querySelector('.profile__edit-btn');
btnProfileEdit.addEventListener('click', function () {
  const popup = document.querySelector('.popup_edit-profile');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  // validateForm(popup);
  openPopup(popup);
});

const btnAddCard = document.querySelector('.profile__add-btn');
btnAddCard.addEventListener('click', function () {
  const popup = document.querySelector('.popup_add-card');
  popup.querySelector('.popup__form').reset();
  // validateForm(popup);
  openPopup(popup);
});

//// Закрытие форм
// Закрытие popup по крестику
document.querySelectorAll('.popup__close').forEach(function (btnPopupClose) {
  btnPopupClose.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

// Закрытие popup по клику в Overlay
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target.closest('.popup'));
    }
  });
});

// Универсальное открытие формы
function openPopup(popup) {
  // Валидируем форму
  const popupForm = popup.querySelector('.popup__form');
  if (popupForm) {
    const formValidator = new FormValidator(validationSettings, popupForm);
    formValidator.validateForm();
  }

  // Показываем popup
  popup.classList.add('popup_opened');

  // Добавляем слушатель закрытия popup по Escape
  document.addEventListener('keydown', function (event) {
    const activePopup = document.querySelector('.popup_opened');
    if (event.key === "Escape" && activePopup) {
      closePopup(activePopup);
    }
  });
}

// Универсальное закрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Закрытие popup по Escape
  document.removeEventListener('keydown', function (event) {
    const activePopup = document.querySelector('.popup_opened');
    if (event.key === "Escape" && activePopup) {
      closePopup(activePopup);
    }
  });
}

// Добавление карточек:
const cardsContainer = document.querySelector('.elements');

function addCard(item) {
  const card = new Card(item, '#card-template');
  cardsContainer.prepend(card.generateCard());
}

initialCards.forEach(item => addCard(item));

