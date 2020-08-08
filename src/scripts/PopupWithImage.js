import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._element.querySelector('.popup__image');
    this._caption = this._element.querySelector('.popup__caption');
  }

  open(img, title) {
    this._image.src = img;
    this._image.alt = title;
    this._caption.textContent = title;
    super.open();
  }
}
