import "./pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// константы для формы редактирования
const formEdit = document.forms["edit-profile"];
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
// константы для формы добавления карточек
const formAdd = document.forms["new-place"];
const placeInput = formAdd.querySelector('input[name="place-name"]');
const linkInput = formAdd.querySelector('input[name="link"]');
// const для открытия картинки на весь экран
const popupImg = document.querySelector(".popup_type_image");
const image = popupImg.querySelector(".popup__image");
const popupParagraf = popupImg.querySelector(".popup__caption");

const cardCallbacks = { deleteCard, likeCard, popupImage };

initialCards.forEach(function (element) {
  const cardName = element.name;
  const cardImg = element.link;
  renderCard(cardName, cardImg, "append");
});

//функция добавления картчки в определенное место в списке

function renderCard(cardName, cardImg, method = "prepend") {
  const cardElement = createCard(cardName, cardImg, cardCallbacks);
  cardsContainer[method](cardElement);
}

// функция для открытия большой картинки

function popupImage(cardImg, cardName) {
  image.src = cardImg;
  image.alt = cardName;
  popupParagraf.textContent = cardName;
  openPopup(popupImg);
}

// закрытие попапа при нажатии на крестик и оверлэй

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

// нажатие на редоктирование профиля

buttonEdit.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

// нажатие на кнопку добавления новой карточки

buttonAdd.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// функция редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

formEdit.addEventListener("submit", handleProfileFormSubmit);

// функция добавления новой карточки

function createNewCard(evt) {
  evt.preventDefault();
  renderCard(placeInput.value, linkInput.value);
  closePopup(popupNewCard);
  evt.target.reset();
}

formAdd.addEventListener("submit", createNewCard);
