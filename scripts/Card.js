import * as popup from './popup.js';

export default class Card {
	constructor(card, templateSelector) {
		this._title = card.name;
    this._image = card.link;
    this._like = false;
		this._templateSelector = templateSelector;
  }

	_getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.image = this._element.querySelector('.elements__image');
    this._element.caption = this._element.querySelector('.elements__title');

    this._element.caption.textContent  = this._title;
    this._element.image.src  = this._image;
    this._element.image.alt  = this._title;

    this._setEventListeners();

  	return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like_active');
    });

    this._element.querySelector('.elements__remove').addEventListener('click', function (evt) {
      evt.target.closest('.elements__element').remove();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._showImage();
    });
  }

  _showImage() {
    const formShowImage = document.querySelector('.popup_show-image');
    const fullSizeImage = formShowImage.querySelector('.popup__image');
    fullSizeImage.src = this._image;
    fullSizeImage.alt = this._title;
    formShowImage.querySelector('.popup__caption').textContent = this._title;
    document.addEventListener('keydown', popup.closePopupByEsc);
    popup.openPopup(formShowImage);
  }

}
