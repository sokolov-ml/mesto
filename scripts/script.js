
let popup = document.querySelector('.popup');

let popup__container = document.querySelector('.popup__container');
let nameInput = document.querySelector('#popup__input_field_name');
let jobInput  = document.querySelector('#popup__input_field_status');
let btnPopupClose = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileStatus  = document.querySelector('.profile__status');
let btnProfileEdit = document.querySelector('.profile__edit-btn');

function openPopupEdit() {
  popup.classList.add('popup_opened');
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
    popup.classList.remove('popup_opened');
}

btnProfileEdit.addEventListener('click',openPopupEdit);
btnPopupClose.addEventListener('click',closePopupEdit);
popup__container.addEventListener('submit', formSubmitHandler);
