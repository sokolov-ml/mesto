import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.form = this._element.querySelector('.popup__form');
    this._saveButton = this.form.querySelector('.popup__save');
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  setInputValues(values) {
    console.log(values);
    if (values) {
      Array.from(this.form.elements).forEach((item) => {
        if (item.nodeName === 'INPUT') {
          item.value = values[item.name];
        }
      });
    }
  }

  close() {
    super.close();
    this.form.reset();
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
