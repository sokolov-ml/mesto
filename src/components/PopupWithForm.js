import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._element.querySelector('.popup__form');
    this._saveButton = this._form.querySelector('.popup__save');
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._element.querySelectorAll('.popup__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }
}
