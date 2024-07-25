function enableValidation(validation) {
  const formList = Array.from(
    document.querySelectorAll(validation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validation);
  });
}

function setEventListeners(formElement, validation) {
  const inputList = Array.from(
    formElement.querySelectorAll(validation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validation.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validation);
      toggleButtonState(inputList, buttonElement, validation);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validation.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validation.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function checkInputValidity(formElement, formInput, validation) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage, validation);
  } else {
    hideError(formElement, formInput, validation);
  }
}

function showError(formElement, input, errorMessage, validation) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(validation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validation.errorClass);
}

const hideError = (formElement, input, validation) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(validation.inputErrorClass);
  errorElement.classList.remove(validation.errorClass);
  errorElement.textContent = "";
};

function clearValidation(formElement, validation) {
  const inputList = Array.from(
    formElement.querySelectorAll(validation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validation.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validation);
  inputList.forEach((input) => {
    hideError(formElement, input, validation);
  });
}

export {enableValidation, clearValidation };