// @todo: Темплейт карточки

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (element) {
  const cardName = element.name;
  const cardImg = element.link;
  cardsContainer.append(createCard(cardName, cardImg, deleteCard));
});

// Функция создания карточки

function createCard(cardName, cardImg, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = cardName;
  cardImage.src = cardImg;
  cardImage.alt = cardName;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

// Функция удаления карточки

function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

