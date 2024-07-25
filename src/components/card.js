import { putLike, deleteLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
let cardDeleteInform;

// Функция создания карточки

function createCard(card, profileId, callbacksCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__like-number").textContent =
    card.likes.length;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // отображение корзин только на своих карточках
  if (card.owner["_id"] === profileId) {
    deleteButton.classList.add("card__delete-button-active");
    deleteButton.addEventListener("click", () => {
      callbacksCard.openCardDeletePopup();
      cardDeleteInform = { cardElement, cardId: card["_id"] };
    });
  }

  const cardLike = cardElement.querySelector(".card__like-button");
// окрашивание уже лайкнутых сердечек
  card.likes.forEach((like) => {
    if (like["_id"] === profileId) {
      cardLike.classList.add("card__like-button_is-active");
    }
  });
  cardLike.addEventListener("click", () => {
    callbacksCard.likeCard(card, cardElement);
  });
  cardImage.addEventListener("click", () =>
    callbacksCard.popupImage(card.link, card.name)
  );
  return cardElement;
}

// Функция лайка

function likeCard(card, cardElement) {
  const cardLike = cardElement.querySelector(".card__like-button");
  const likeNumber = cardElement.querySelector(".card__like-number");
  if (cardLike.classList.contains("card__like-button_is-active")) {
    deleteLike(card["_id"])
      .then((card) => {
        likeNumber.textContent = card.likes.length;
        cardLike.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    putLike(card["_id"])
      .then((card) => {
        likeNumber.textContent = card.likes.length;
        cardLike.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, likeCard, cardDeleteInform };
