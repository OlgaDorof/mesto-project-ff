import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupImg = document.querySelector(".popup_type_image");

// Функция создания карточки

function createCard(cardName, cardImg, deleteCard, likeButton, popupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = cardName;
  cardImage.src = cardImg;
  cardImage.alt = cardName;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  const cardLike = cardElement.querySelector(".card__like-button");
  cardLike.addEventListener("click", likeButton);
  cardImage.addEventListener("click", () => popupImage(cardImg, cardName));
  return cardElement;
}

function popupImage(cardImg, cardName) {
  const image = popupImg.querySelector(".popup__image");
  const paragraf = popupImg.querySelector(".popup__caption");
  image.src = cardImg;
  image.alt = cardName;
  paragraf.textContent = cardName;
  openPopup(popupImg);
}

// Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

// Функция лайка

function likeButton(evt) {
  const like = evt.target;
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeButton, popupImage };
