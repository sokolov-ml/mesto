
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


const popup = document.querySelector('.popup');

const popup__container = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput  = document.querySelector('.popup__input_field_status');
const btnPopupClose = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileStatus  = document.querySelector('.profile__status');
const btnProfileEdit = document.querySelector('.profile__edit-btn');

const cardsContainer = document.querySelector('.elements');
/*
В практической работе есть два требования:
- DOM-элементы, к которым есть обращение в скрипте, вынесены в константы.
- Переменные объявлены через let.
У меня объекты (выше) в константах, а "обычных" переменных нет вообще. Поэтому без let
*/

function openPopupEdit() {
  popup.classList.add('popup_opened');
  // В описании к работе тут предполагают сохранить значения со страницы в переменные,
  // а потом уже их присваивать в поля для ввода. Не вижу в этом смысла
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopupEdit();
}

btnProfileEdit.addEventListener('click',openPopupEdit);
btnPopupClose.addEventListener('click',closePopupEdit);
popup__container.addEventListener('submit', formSubmitHandler);

function addCard(title, image) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.elements__image').src = image;
  newCard.querySelector('.elements__image').alt = title;
  newCard.querySelector('.elements__title').textContent  = title;

  cardsContainer.append(newCard);
}


initialCards.forEach(item => addCard(item.name, item.link));
