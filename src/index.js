import "./pages/index.css";
import { initialCards } from "./cards.js";
import {
  createCard,
  deleteCard,
  likeButton,
  popupImage,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewcard = document.querySelector(".popup_type_new-card");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const title = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");
const formEdit = popupEdit.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.querySelector(".popup__input_type_name");
const jobInput = formEdit.querySelector(".popup__input_type_description");
const formAdd = popupNewcard.querySelector('form[name="new-place"]');
const placeInput = formAdd.querySelector('input[name="place-name"]');
const linkInput = formAdd.querySelector('input[name="link"]');

initialCards.forEach(function (element) {
  const cardName = element.name;
  const cardImg = element.link;
  cardsContainer.append(
    createCard(cardName, cardImg, deleteCard, likeButton, popupImage)
  );
});

// нажатие на редоктирование профиля

buttonEdit.addEventListener("click", function () {
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEdit);
});

// нажатие на кнопку добавления новой карточки

buttonAdd.addEventListener("click", function () {
  placeInput.value = "";
  linkInput.value = "";
  openPopup(popupNewcard);
});

// функция редактирования профиля

function handleFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}

formEdit.addEventListener("submit", handleFormSubmit);

// функция добавления новой карточки

function createnewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(
    createCard(
      placeInput.value,
      linkInput.value,
      deleteCard,
      likeButton,
      popupImage
    )
  );
  closePopup();
}

formAdd.addEventListener("submit", createnewCard);
