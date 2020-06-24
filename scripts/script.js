
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



const formEditProfile = document.querySelector('.popup__container_edit-profile');
const formAddCard = document.querySelector('.popup__container_add-card');


const nameInput = document.querySelector('.popup__input_field_name');
const jobInput  = document.querySelector('.popup__input_field_status');

const profileName = document.querySelector('.profile__name');
const profileStatus  = document.querySelector('.profile__status');

const btnProfileEdit = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');





// Универсальное открытие формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Универсальное закрытие формы
const btnPopupCloseList = document.querySelectorAll('.popup__close');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

btnPopupCloseList.forEach(function(btnPopupClose) {
  btnPopupClose.addEventListener('click',function(evt) {
    closePopup(evt.target.closest('.popup'));
  })
});

// Форма добавления карточки
btnAddCard.addEventListener('click',function() {
  openPopup(document.querySelector('.popup_add-card'));
});

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard(document.querySelector('.popup__input_field_location').value, document.querySelector('.popup__input_field_image').value);
  document.querySelector('.popup__input_field_location').value = '';
  document.querySelector('.popup__input_field_image').value = '';
  closePopup(evt.target.closest('.popup'));
});

// Форма редактирования профиля
btnProfileEdit.addEventListener('click',function() {
  openPopup(document.querySelector('.popup_edit-profile'));
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
});

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
});



// Добавление карточек:
const cardsContainer = document.querySelector('.elements');

function addCard(title, image) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.elements__image').src = image;
  newCard.querySelector('.elements__image').alt = title;
  newCard.querySelector('.elements__title').textContent  = title;

  newCard.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });


  cardsContainer.prepend(newCard);
}

initialCards.forEach(item => addCard(item.name, item.link));
