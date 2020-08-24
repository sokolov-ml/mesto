export default class Card {
  constructor(card, templateSelector, handleCardClick, currentUserId, handleCardRemove, handleCardLike) {
    this._data = card;

    this._isMyCard = currentUserId === card.owner._id;
    this._isAlreadyLiked = card.likes.some((item) => item._id === currentUserId);

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove.bind(this);
    this._handleCardLike = handleCardLike.bind(this);
  }

  getId() {
    return this._data._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    if (this._element) {
      return this._element;
    }
    this._element = this._getTemplate();
    this._element.image = this._element.querySelector('.elements__image');
    this._element.caption = this._element.querySelector('.elements__title');
    this._element.likeButton = this._element.querySelector('.elements__like-button');
    this._element.likeCounter = this._element.querySelector('.elements__like-counter');
    this._element.removeButton = this._element.querySelector('.elements__remove');
    this._element.caption.textContent = this._data.name;
    this._element.image.src = this._data.link;
    this._element.image.alt = this._data.name;
    this._element.likeCounter.textContent = this._data.likes.length;

    if (!this._isMyCard) {
      this._element.removeButton.remove();
    }

    if (this._isAlreadyLiked) {
      this._element.likeButton.classList.add('elements__like-button_active');
    }

    this._setEventListeners();
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = '';
  }

  toggleLike(response, currentUserId) {
    this._data = response;
    this._isAlreadyLiked = this._data.likes.some((item) => item._id === currentUserId);
    this._element.likeCounter.textContent = this._data.likes.length;

    if (this._isAlreadyLiked) {
      this._element.likeButton.classList.add('elements__like-button_active');
    } else {
      this._element.likeButton.classList.remove('elements__like-button_active');
    }
  }

  _setEventListeners() {
    this._element.likeButton.addEventListener('click', () => {
      // this.like();
      this._handleCardLike();
    });

    this._element.removeButton.addEventListener('click', () => {
      this._handleCardRemove();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._image, this._title);
    });
  }
}
