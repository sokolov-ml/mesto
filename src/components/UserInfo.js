export default class UserInfo {
  constructor({ selectorUserName, selectorUserStatus, selectorUserPhoto }) {
    this._name = document.querySelector(selectorUserName);
    this._status = document.querySelector(selectorUserStatus);
    this._photo = document.querySelector(selectorUserPhoto);
  }

  getId() {
    return this._data._id;
  }

  getUserInfo() {
    return this._data;
  }

  setUserInfo(data) {
    this._data = data;
    this._name.textContent = this._data.name;
    this._status.textContent = this._data.about;
  }

  setUserPhoto(data) {
    this._data = data;
    this._photo.src = this._data.avatar;
  }
}
