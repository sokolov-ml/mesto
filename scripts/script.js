
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  addCard(document.querySelector('.popup__input_field_location').value, document.querySelector('.popup__input_field_image').value);
  evt.target.reset();
  closePopup(evt.target.closest('.popup'));
});

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput  = document.querySelector('.popup__input_field_status');

const profileName = document.querySelector('.profile__name');
const profileStatus  = document.querySelector('.profile__status');

const btnProfileEdit = document.querySelector('.profile__edit-btn');
btnProfileEdit.addEventListener('click',function() {
  const popup = document.querySelector('.popup_edit-profile');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
  checkPopupFormValidity(popup);
  openPopup(popup);
});

const btnAddCard = document.querySelector('.profile__add-btn');
btnAddCard.addEventListener('click',function() {
  const popup = document.querySelector('.popup_add-card');
  popup.querySelector('.popup__form').reset();
  checkPopupFormValidity(popup);
  openPopup(popup);
});


// Закрытие popup по крестику
document.querySelectorAll('.popup__close').forEach(function(btnPopupClose) {
  btnPopupClose.addEventListener('click',function(evt) {
    closePopup(evt.target.closest('.popup'));
  })
});

// Закрытие popup по клику в Overlay
document.querySelectorAll('.popup').forEach(function(popup) {
  popup.addEventListener('mousedown',function(evt) {
    if (evt.target.classList.contains('popup') ) {
      closePopup(evt.target.closest('.popup'));
    }
  })
});

// Закрытие popup по Escape
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape" && document.querySelector('.popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
});

// Универсальное открытие формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальное закрытие формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Увеличить изображение
function showImage(title, img) {
  const formShowImage = document.querySelector('.popup_show-image')
  formShowImage.querySelector('.popup__image').src = img;
  formShowImage.querySelector('.popup__image').alt = title;
  formShowImage.querySelector('.popup__caption').textContent = title;
  openPopup(formShowImage);
}

// Добавление карточек:
const cardsContainer = document.querySelector('.elements');

function addCard(title, image) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.elements__image').src = image;
  newCard.querySelector('.elements__image').alt = title;
  newCard.querySelector('.elements__image').addEventListener('click', function (evt) {
    showImage(evt.target.alt, evt.target.src);
  });

  newCard.querySelector('.elements__title').textContent  = title;

  newCard.querySelector('.elements__remove').addEventListener('click', function (evt) {
    evt.target.closest('.elements__element').remove();
  });

  newCard.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });


  cardsContainer.prepend(newCard);
}

initialCards.forEach(item => addCard(item.name, item.link));



// Валидация форм:
function setFormsEventListeners() {
  Array.from(document.forms).forEach((form) => {
    form.addEventListener('input', (evt) => {
      const inputList  = Array.from(form.querySelectorAll('.popup__input'));
      const buttonSave  = form.querySelector('.popup__save');
      toggleButtonState(inputList, buttonSave);
      checkPopupInputValidity(evt.currentTarget, evt.target);
    });
  });
}
setFormsEventListeners();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

function toggleButtonState(inputList,button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};


function checkPopupFormValidity(popup) {
  const popupForm = popup.querySelector('.popup__form');
  const formInputList = Array.from(popupForm.querySelectorAll('.popup__input'))
  const formButtonSave = popupForm.querySelector('.popup__save')
  checkPopupInputValidity(popupForm,formInputList);
  toggleButtonState(formInputList,formButtonSave);
}

function checkPopupInputValidity(formElement, inputElementList) {
  [].concat(inputElementList).forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  });
};
