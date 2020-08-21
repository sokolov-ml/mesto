export default class UserInfo {
  constructor({ selectorUserName, selectorUserStatus, selectorUserPhoto }) {
    this._name = document.querySelector(selectorUserName);
    this._status = document.querySelector(selectorUserStatus);
    this._photo = document.querySelector(selectorUserPhoto);
  }

  getUserInfo() {
    return { name: this._name.textContent, status: this._status.textContent, photo: this._photo };
  }

  setUserInfo({ name, status, id }) {
    this._name.textContent = name;
    this._status.textContent = status;
    this.id = id;
  }

  setUserPhoto(newImageUrl) {
    this._photo.src = newImageUrl;
  }
}
