// @todo: Темплейт карточки

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (element) {
  const cardName = element.name;
  const cardImg = element.link;
  placesList.append(cardsAdd(cardName, cardImg, cardDelete));
});

// Функция создания карточки

function cardsAdd(cardName, cardImg, cardDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__image").src = cardImg;
  cardElement.querySelector(".card__image").alt = cardName;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", cardDelete);
  return cardElement;
}

// Функция удаления карточки

function cardDelete(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".card").remove();
}

