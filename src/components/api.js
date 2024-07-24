const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "32ce3e57-23ce-4269-9ab9-b9e27817e7bb",
    "Content-Type": "application/json",
  },
};

function handleResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function deleteCardApi(CardDeleteInform) {
  return fetch(`${config.baseUrl}/cards/${CardDeleteInform.cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResult(res));
}

function EditProfileApi(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((res) => handleResult(res));
}

function addNewCardApi(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => handleResult(res));
}

function editProfileApi(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => handleResult(res));
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => handleResult(res));
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResult(res));
}

const cardsApi = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then((res) => handleResult(res));

const profileApi = fetch(`${config.baseUrl}//users/me`, {
  headers: config.headers,
}).then((res) => handleResult(res));

export {
  deleteCardApi,
  EditProfileApi,
  addNewCardApi,
  editProfileApi,
  cardsApi,
  profileApi,
  putLike,
  deleteLike
};
