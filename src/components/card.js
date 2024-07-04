const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(cardName, cardImg, callbacksCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = cardName;
  cardImage.src = cardImg;
  cardImage.alt = cardName;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", callbacksCard.deleteCard);
  const cardLike = cardElement.querySelector(".card__like-button");
  cardLike.addEventListener("click", callbacksCard.likeCard);
  cardImage.addEventListener("click", () =>
    callbacksCard.popupImage(cardImg, cardName)
  );
  return cardElement;
}

// Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

// Функция лайка

function likeCard(evt) {
  const like = evt.target;
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
