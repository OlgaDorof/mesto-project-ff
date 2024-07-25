import "./pages/index.css";
import { createCard, likeCard, cardDeleteInform } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  deleteCardApi,
  editProfileApi,
  addNewCardApi,
  editProfileAvatarApi,
  cardsApi,
  profileApi,
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDeleteCard = document.querySelector(".popup_type_delete");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__image");
const buttonProfileAvatar = document.querySelector(".profile__images");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// константы для формы удаления
const formDelete = document.forms["delete-card"];

// константы для формы редактирования
const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");

// константы для формы добавления карточек
const formAdd = document.forms["new-place"];
const placeInput = formAdd.querySelector('input[name="place-name"]');
const linkInput = formAdd.querySelector('input[name="link"]');

// константы для формы редактирования аватара
const formEditAvatar = document.forms["new-avatar"];
const linkInputAvatar = formEditAvatar.querySelector(
  'input[name="link-avatar"]'
);

// const для открытия картинки на весь экран
const popupImg = document.querySelector(".popup_type_image");
const imageFullScreen = popupImg.querySelector(".popup__image");
const popupParagraf = popupImg.querySelector(".popup__caption");

const cardCallbacks = { likeCard, popupImage, openCardDeletePopup };

const validation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validation);

//функция добавления картчки в определенное место в списке

function renderCard(card, PrifileId, method = "prepend") {
  const cardElement = createCard(card, PrifileId, cardCallbacks);
  cardsContainer[method](cardElement);
}

function openCardDeletePopup() {
  openPopup(popupDeleteCard)
}

// функция для открытия большой картинки

function popupImage(cardImg, cardName) {
  imageFullScreen.src = cardImg;
  imageFullScreen.alt = cardName;
  popupParagraf.textContent = cardName;
  openPopup(popupImg);
}

// закрытие попапа при нажатии на крестик и оверлэй

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

// нажатие на редоктирование профиля

buttonEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  clearValidation(formEdit, validation);
});

// функция удаления карточки

function delCard(cardDeleteInform) {
  deleteCardApi(cardDeleteInform)
    .then(() => {
      cardDeleteInform.cardElement.remove();
      closePopup(popupDeleteCard);
    })
    .catch((err) => console.log(err));
}

formDelete.addEventListener("submit", () => {
  delCard(cardDeleteInform);
});

// нажатие на кружок редактирования аватара

buttonProfileAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
  clearValidation(formEditAvatar, validation);
});

// нажатие на кнопку добавления новой карточки

buttonAdd.addEventListener("click", function () {
  openPopup(popupNewCard);
  clearValidation(formAdd, validation);
});

// функция редактирования профиля

function handleProfileFormSubmit(evt) {
  const buttonPopupEdit = popupEdit.querySelector(".popup__button");
  loading(buttonPopupEdit,true,"Сохранить","Сохранение...")
  editProfileApi(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => 
      loading(buttonPopupEdit,false,"Сохранить","Сохранение...")
    )
}

formEdit.addEventListener("submit", handleProfileFormSubmit);

// функция добавления новой карточки

function createNewCard(evt) {
  const buttonPopupNewCard = popupNewCard.querySelector(".popup__button");
  loading(buttonPopupNewCard,true,"Создать","Создание...")
  addNewCardApi(placeInput.value, linkInput.value)
    .then((card) => {
      renderCard(card, card.owner["_id"]);
      closePopup(popupNewCard);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => loading(buttonPopupNewCard,false,"Создать","Создание..."))

}

// замена текста на кнопке во время загрузки на сервер

function loading(button,boolean,text,textLoad) {
  if (boolean){
    button.textContent = textLoad;
  } else {
    button.textContent = text;
  }
  
}

formAdd.addEventListener("submit", createNewCard);

// функция замены изображения на аватарке

function handleAvatarFormSubmit(evt) {
  const buttonPopupAvatar = popupAvatar.querySelector(".popup__button")
  loading(buttonPopupAvatar,true,"Сохранить","Сохранение...")
  editProfileAvatarApi(linkInputAvatar.value)
    .then(() => {
      profileAvatar.style = `background-image: url(${linkInputAvatar.value})`;
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => loading(buttonPopupAvatar,false,"Сохранить","Сохранение..."))

}

formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

Promise.all([cardsApi, profileApi])
  .then(([cardsApi, profileApi]) => {
    cardsApi.forEach(function (card) {
      renderCard(card, profileApi["_id"], "append");
    });
    profileTitle.textContent = profileApi.name;
    profileDescription.textContent = profileApi.about;
    profileAvatar.style = `background-image: url(${profileApi.avatar})`;
  })
  .catch((err) => console.log(err));
