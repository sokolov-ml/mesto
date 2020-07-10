
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
  validateForm(popup);
  openPopup(popup);
});

const btnAddCard = document.querySelector('.profile__add-btn');
btnAddCard.addEventListener('click',function() {
  const popup = document.querySelector('.popup_add-card');
  popup.querySelector('.popup__form').reset();
  validateForm(popup);
  openPopup(popup);
});

//// Закрытие форм
// Закрытие popup по крестику
document.querySelectorAll('.popup__close').forEach(function(btnPopupClose) {
  btnPopupClose.addEventListener('click',function(evt) {
    closePopup(evt.target.closest('.popup'));
  });
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
  const activePopup = document.querySelector('.popup_opened')
  if (event.key === "Escape" && activePopup) {
    closePopup(activePopup);
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
  const fullSizeImage = formShowImage.querySelector('.popup__image')
  fullSizeImage.src = img;
  fullSizeImage.alt = title;
  formShowImage.querySelector('.popup__caption').textContent = title;
  openPopup(formShowImage);
}

// Добавление карточек:
const cardsContainer = document.querySelector('.elements');

function addCard(title, image) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.elements__image')

  newCardImage.src = image;
  newCardImage.alt = title;
  newCardImage.addEventListener('click', function (evt) {
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



