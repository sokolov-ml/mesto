export default class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  enableValidation() {
    this._setEventListeners();
    this.validateForm();
  }

  _setEventListeners() {
    this._form.addEventListener('input',() => {
      this.validateForm();
    });

    this._form.addEventListener('reset',() => {
      this.validateForm();
    });
  }

  validateForm() {
    const inputList = this._form.querySelectorAll(this._data.inputSelector);
    const buttonSubmit = this._form.querySelector(this._data.submitButtonSelector);

    const isFormValid = !this._hasInvalidInput(inputList);
    this._validateInputList(this._form, inputList);

    if (isFormValid) {
      this._changeButtonState(buttonSubmit, 'disable');
    } else {
      this._changeButtonState(buttonSubmit, 'enable');
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _changeButtonState(buttonElement, action) {
    switch(action) {
      case 'enable':
        buttonElement.disabled = true;
        break;
      case 'disable':
        buttonElement.disabled = false;
        break;
    }
  }

  _validateInputList(formElement, inputList) {
    inputList.forEach(inputElement => {
      this._validateInput(formElement, inputElement);
    });
  }

  _validateInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
  }
}



