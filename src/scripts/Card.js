export default class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._title = card.name;
    this._image = card.link;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.image = this._element.querySelector('.elements__image');
    this._element.caption = this._element.querySelector('.elements__title');
    this._element.caption.textContent = this._title;
    this._element.image.src = this._image;
    this._element.image.alt = this._title;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', function (evt) {
      this._isLiked = !this._isLiked;
      evt.target.classList.toggle('elements__like_active');
    });

    this._element.querySelector('.elements__remove').addEventListener('click', function (evt) {
      evt.target.closest('.elements__element').remove();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._image, this._title);
    });
  }
}
