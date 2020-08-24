export default class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._token = options.headers.authorization;
    this._path = {
      user: '/users/me',
      cards: '/cards',
      avatar: '/users/me/avatar',
    };
  }

  _fetch(path, method = 'GET', body) {
    return fetch(`${this._options.baseUrl}${path}`, {
      headers: this._options.headers,
      method: method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getCurrentUserInfo() {
    return this._fetch(this._path.user);
  }

  getCards() {
    return this._fetch(this._path.cards);
  }

  updateCurrentUserInfo(newName, newAbout) {
    return this._fetch(this._path.user, 'PATCH', {
      name: newName,
      about: newAbout,
    });
  }

  updateCurrentUserPhoto(newImageUrl) {
    return this._fetch(this._path.avatar, 'PATCH', {
      avatar: newImageUrl,
    });
  }

  addNewCard(name, link) {
    return this._fetch(this._path.cards, 'POST', {
      name: name,
      link: link,
    });
  }

  removeCard(cardId) {
    return this._fetch(`${this._path.cards}/${cardId}`, 'DELETE');
  }

  setLikeCard(cardId) {
    return this._fetch(`${this._path.cards}/likes/${cardId}`, 'PUT');
  }

  unsetLikeCard(cardId) {
    return this._fetch(`${this._path.cards}/likes/${cardId}`, 'DELETE');
  }
}
