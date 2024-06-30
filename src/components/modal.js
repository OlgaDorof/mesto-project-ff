// функция открытия попапа

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  const popupClose = popupElement.querySelector(".popup__close");
  popupClose.addEventListener("click", closePopup);
  document.addEventListener("keydown", closeEsc);
  popupElement.addEventListener("click", closeOverlay);
}

// функция закрытия попапа

function closePopup() {
  document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

// функция закрытия попапа через escape

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// функция закрытия попапа при нажатии на overlay

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

export {openPopup, closePopup };
