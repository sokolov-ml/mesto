
const popup = document.querySelector('.popup');

const popup__container = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput  = document.querySelector('.popup__input_field_status');
const btnPopupClose = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileStatus  = document.querySelector('.profile__status');
const btnProfileEdit = document.querySelector('.profile__edit-btn');

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
