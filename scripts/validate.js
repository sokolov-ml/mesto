
// Валидация форм:
// function setFormsEventListeners() {
//   Array.from(document.forms).forEach((form) => {
//     form.addEventListener('input', (evt) => {
//       const inputList  = Array.from(form.querySelectorAll('.popup__input'));
//       const buttonSave  = form.querySelector('.popup__save');
//       toggleButtonState(inputList, buttonSave);
//       checkPopupInputValidity(evt.currentTarget, evt.target);
//     });
//   });
// }
// setFormsEventListeners();

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid
  });
}

// function toggleButtonState(inputList,button) {
//   if (hasInvalidInput(inputList)) {
//     button.disabled = true;
//   } else {
//     button.disabled = false;
//   }
// }

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  //errorElement.classList.add('popup__input-error_active');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  //errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};


// function checkPopupFormValidity(popup) {
//   const popupForm = popup.querySelector('.popup__form');
//   const formInputList = Array.from(popupForm.querySelectorAll('.popup__input'))
//   const formButtonSave = popupForm.querySelector('.popup__save')
//   checkPopupInputValidity(popupForm,formInputList);
//   toggleButtonState(formInputList,formButtonSave);
// }

// function checkPopupInputValidity(formElement, inputElementList) {
//   [].concat(inputElementList).forEach((inputElement) => {
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//       hideInputError(formElement, inputElement);
//     }
//   });
// };



function enableValidation(object) {
  const formList = document.querySelectorAll(object.formSelector);
  formList.forEach((form) => {

    validateForm(form);

    form.addEventListener('input',(evt) => {
      validateForm(evt.currentTarget);
      //validateInput(evt.currentTarget, evt.target);
    });

    form.addEventListener('reset',(evt) => {
      validateForm(evt.currentTarget);
    });
  });
}

function validateForm(form) {
  const inputList = form.querySelectorAll(validationSettings.inputSelector);
  const buttonSubmit = form.querySelector(validationSettings.submitButtonSelector);

  const isFormValid = !hasInvalidInput(inputList);
  validateInputList(form, inputList);

  if (isFormValid) {
    changeButtonState(buttonSubmit, 'disable');
  } else {
    changeButtonState(buttonSubmit, 'enable');
  }

}

function changeButtonState(buttonElement, action) {
  switch(action) {
    case 'enable':
      buttonElement.disabled = true;
      break;
    case 'disable':
      buttonElement.disabled = false;
      break;
    default:
      console.log('unexpected action in changeButtonState()')
  }
}

function validateInputList(formElement, inputList) {
  inputList.forEach(inputElement => {
    validateInput(formElement, inputElement);
  })
}

function validateInput(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  //inactiveButtonClass: 'popup__button_disabled',
  //inputErrorClass: 'popup__input_type_error',
  //errorClass: 'popup__input-error_visible'
}

enableValidation(validationSettings);
