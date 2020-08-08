export default class UserInfo {
  constructor({ selectorUserName, selectorUserStatus }) {
    this._name = document.querySelector(selectorUserName);
    this._status = document.querySelector(selectorUserStatus);
  }

  getUserInfo() {
    return { name: this._name.textContent, status: this._status.textContent };
  }

  setUserInfo({ name, status }) {
    console.log(this);
    this._name.textContent = name;
    this._status.textContent = status;
  }
}
