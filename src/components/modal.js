// функция открытия попапа

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

// функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

// функция закрытия попапа через escape

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export {openPopup, closePopup };
