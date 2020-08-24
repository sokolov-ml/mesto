/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Api; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Api = /*#__PURE__*/function () {\n  function Api(options) {\n    _classCallCheck(this, Api);\n\n    this._options = options;\n    this._url = options.baseUrl;\n    this._token = options.headers.authorization;\n    this._path = {\n      user: '/users/me',\n      cards: '/cards',\n      avatar: '/users/me/avatar'\n    };\n  }\n\n  _createClass(Api, [{\n    key: \"_fetch\",\n    value: function _fetch(path) {\n      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';\n      var body = arguments.length > 2 ? arguments[2] : undefined;\n      return fetch(\"\".concat(this._options.baseUrl).concat(path), {\n        headers: this._options.headers,\n        method: method,\n        body: JSON.stringify(body)\n      }).then(function (res) {\n        if (res.ok) {\n          return res.json();\n        }\n\n        return Promise.reject(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430: \".concat(res.status));\n      });\n    }\n  }, {\n    key: \"getCurrentUserInfo\",\n    value: function getCurrentUserInfo() {\n      return this._fetch(this._path.user);\n    }\n  }, {\n    key: \"updateCurrentUserInfo\",\n    value: function updateCurrentUserInfo(newName, newAbout) {\n      return this._fetch(this._path.user, 'PATCH', {\n        name: newName,\n        about: newAbout\n      });\n    }\n  }, {\n    key: \"updateCurrentUserPhoto\",\n    value: function updateCurrentUserPhoto(newImageUrl) {\n      return this._fetch(this._path.avatar, 'PATCH', {\n        avatar: newImageUrl\n      });\n    }\n  }, {\n    key: \"getCards\",\n    value: function getCards() {\n      return this._fetch(this._path.cards);\n    }\n  }, {\n    key: \"addNewCard\",\n    value: function addNewCard(name, link) {\n      return this._fetch(this._path.cards, 'POST', {\n        name: name,\n        link: link\n      });\n    }\n  }, {\n    key: \"removeCard\",\n    value: function removeCard(cardId) {\n      return this._fetch(\"\".concat(this._path.cards, \"/\").concat(cardId), 'DELETE');\n    }\n  }, {\n    key: \"setLikeCardOn\",\n    value: function setLikeCardOn(cardId) {\n      return this._fetch(\"\".concat(this._path.cards, \"/likes/\").concat(cardId), 'PUT');\n    }\n  }, {\n    key: \"setLikeCardOff\",\n    value: function setLikeCardOff(cardId) {\n      return this._fetch(\"\".concat(this._path.cards, \"/likes/\").concat(cardId), 'DELETE');\n    }\n  }]);\n\n  return Api;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Card = /*#__PURE__*/function () {\n  function Card(card, templateSelector, handleCardClick, currentUserId, handleCardRemove, handleCardLike) {\n    _classCallCheck(this, Card);\n\n    this._data = card;\n    this._isMyCard = currentUserId === card.owner._id;\n    this._isAlreadyLiked = card.likes.some(function (item) {\n      return item._id === currentUserId;\n    });\n    this._templateSelector = templateSelector;\n    this._handleCardClick = handleCardClick;\n    this._handleCardRemove = handleCardRemove.bind(this);\n    this._handleCardLike = handleCardLike.bind(this);\n  }\n\n  _createClass(Card, [{\n    key: \"getId\",\n    value: function getId() {\n      return this._data._id;\n    }\n  }, {\n    key: \"_getTemplate\",\n    value: function _getTemplate() {\n      var cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__element').cloneNode(true);\n      return cardElement;\n    }\n  }, {\n    key: \"generateCard\",\n    value: function generateCard() {\n      if (this._element) {\n        return this._element;\n      }\n\n      this._element = this._getTemplate();\n      this._element.image = this._element.querySelector('.elements__image');\n      this._element.caption = this._element.querySelector('.elements__title');\n      this._element.likeButton = this._element.querySelector('.elements__like-button');\n      this._element.likeCounter = this._element.querySelector('.elements__like-counter');\n      this._element.removeButton = this._element.querySelector('.elements__remove');\n      this._element.caption.textContent = this._data.name;\n      this._element.image.src = this._data.link;\n      this._element.image.alt = this._data.name;\n      this._element.likeCounter.textContent = this._data.likes.length;\n\n      if (!this._isMyCard) {\n        this._element.removeButton.remove();\n      }\n\n      if (this._isAlreadyLiked) {\n        this._element.likeButton.classList.add('elements__like-button_active');\n      }\n\n      this._setEventListeners();\n\n      return this._element;\n    }\n  }, {\n    key: \"removeCard\",\n    value: function removeCard() {\n      this._element.remove();\n\n      this._element = '';\n    }\n  }, {\n    key: \"toggleLike\",\n    value: function toggleLike(response, currentUserId) {\n      this._data = response;\n      this._isAlreadyLiked = this._data.likes.some(function (item) {\n        return item._id === currentUserId;\n      });\n      this._element.likeCounter.textContent = this._data.likes.length;\n\n      if (this._isAlreadyLiked) {\n        this._element.likeButton.classList.add('elements__like-button_active');\n      } else {\n        this._element.likeButton.classList.remove('elements__like-button_active');\n      }\n    }\n  }, {\n    key: \"_setEventListeners\",\n    value: function _setEventListeners() {\n      var _this = this;\n\n      this._element.likeButton.addEventListener('click', function () {\n        // this.like();\n        _this._handleCardLike();\n      });\n\n      this._element.removeButton.addEventListener('click', function () {\n        _this._handleCardRemove();\n      });\n\n      this._element.querySelector('.elements__image').addEventListener('click', function () {\n        _this._handleCardClick(_this._image, _this._title);\n      });\n    }\n  }]);\n\n  return Card;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FormValidator; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar FormValidator = /*#__PURE__*/function () {\n  function FormValidator(data, form) {\n    _classCallCheck(this, FormValidator);\n\n    this._data = data;\n    this._form = form;\n  }\n\n  _createClass(FormValidator, [{\n    key: \"enableValidation\",\n    value: function enableValidation() {\n      this._setEventListeners();\n\n      this.validateForm();\n    }\n  }, {\n    key: \"_setEventListeners\",\n    value: function _setEventListeners() {\n      var _this = this;\n\n      this._form.addEventListener('input', function () {\n        _this.validateForm();\n      });\n\n      this._form.addEventListener('reset', function () {\n        _this.validateForm();\n      });\n    }\n  }, {\n    key: \"validateForm\",\n    value: function validateForm() {\n      var inputList = this._form.querySelectorAll(this._data.inputSelector);\n\n      var buttonSubmit = this._form.querySelector(this._data.submitButtonSelector);\n\n      var isFormValid = !this._hasInvalidInput(inputList);\n\n      this._validateInputList(this._form, inputList);\n\n      if (isFormValid) {\n        this._changeButtonState(buttonSubmit, 'disable');\n      } else {\n        this._changeButtonState(buttonSubmit, 'enable');\n      }\n    }\n  }, {\n    key: \"_hasInvalidInput\",\n    value: function _hasInvalidInput(inputList) {\n      return Array.from(inputList).some(function (inputElement) {\n        return !inputElement.validity.valid;\n      });\n    }\n  }, {\n    key: \"_changeButtonState\",\n    value: function _changeButtonState(buttonElement, action) {\n      switch (action) {\n        case 'enable':\n          buttonElement.disabled = true;\n          break;\n\n        case 'disable':\n          buttonElement.disabled = false;\n          break;\n      }\n    }\n  }, {\n    key: \"_validateInputList\",\n    value: function _validateInputList(formElement, inputList) {\n      var _this2 = this;\n\n      inputList.forEach(function (inputElement) {\n        _this2._validateInput(formElement, inputElement);\n      });\n    }\n  }, {\n    key: \"_validateInput\",\n    value: function _validateInput(formElement, inputElement) {\n      if (!inputElement.validity.valid) {\n        this._showInputError(formElement, inputElement, inputElement.validationMessage);\n      } else {\n        this._hideInputError(formElement, inputElement);\n      }\n    }\n  }, {\n    key: \"_showInputError\",\n    value: function _showInputError(formElement, inputElement, errorMessage) {\n      var errorElement = formElement.querySelector(\"#\".concat(inputElement.id, \"-error\"));\n      errorElement.textContent = errorMessage;\n    }\n  }, {\n    key: \"_hideInputError\",\n    value: function _hideInputError(formElement, inputElement) {\n      var errorElement = formElement.querySelector(\"#\".concat(inputElement.id, \"-error\"));\n      errorElement.textContent = '';\n    }\n  }]);\n\n  return FormValidator;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Popup; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Popup = /*#__PURE__*/function () {\n  function Popup(popupSelector) {\n    _classCallCheck(this, Popup);\n\n    this._element = document.querySelector(popupSelector);\n    this._closeButton = this._element.querySelector('.popup__close');\n    this._handleEscClose = this._handleEscClose.bind(this);\n  }\n\n  _createClass(Popup, [{\n    key: \"open\",\n    value: function open() {\n      document.addEventListener('keydown', this._handleEscClose);\n\n      this._element.classList.add('popup_opened');\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      document.removeEventListener('keydown', this._handleEscClose);\n\n      this._element.classList.remove('popup_opened');\n    }\n  }, {\n    key: \"_handleEscClose\",\n    value: function _handleEscClose() {\n      if (event.key === 'Escape') {\n        this.close();\n      }\n    }\n  }, {\n    key: \"setEventListeners\",\n    value: function setEventListeners() {\n      var _this = this;\n\n      this._closeButton.addEventListener('click', function () {\n        _this.close();\n      });\n\n      this._element.addEventListener('mousedown', function (evt) {\n        if (evt.target.classList.contains('popup')) {\n          _this.close();\n        }\n      });\n    }\n  }]);\n\n  return Popup;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PopupWithForm; });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar PopupWithForm = /*#__PURE__*/function (_Popup) {\n  _inherits(PopupWithForm, _Popup);\n\n  var _super = _createSuper(PopupWithForm);\n\n  function PopupWithForm(popupSelector, handleFormSubmit) {\n    var _this;\n\n    _classCallCheck(this, PopupWithForm);\n\n    _this = _super.call(this, popupSelector);\n    _this.form = _this._element.querySelector('.popup__form');\n    _this._saveButton = _this.form.querySelector('.popup__save');\n    _this._handleFormSubmit = handleFormSubmit.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(PopupWithForm, [{\n    key: \"setEventListeners\",\n    value: function setEventListeners() {\n      var _this2 = this;\n\n      _get(_getPrototypeOf(PopupWithForm.prototype), \"setEventListeners\", this).call(this);\n\n      this.form.addEventListener('submit', function (evt) {\n        evt.preventDefault();\n\n        var inputValues = _this2._getInputValues();\n\n        _this2._handleFormSubmit(inputValues);\n      });\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      _get(_getPrototypeOf(PopupWithForm.prototype), \"close\", this).call(this);\n\n      this.form.reset();\n    }\n  }, {\n    key: \"_getInputValues\",\n    value: function _getInputValues() {\n      var _this3 = this;\n\n      // достаём все элементы полей\n      this._inputList = this._element.querySelectorAll('.popup__input'); // создаём пустой объект\n\n      this._formValues = {}; // добавляем в этот объект значения всех полей\n\n      this._inputList.forEach(function (input) {\n        _this3._formValues[input.name] = input.value;\n      }); // возвращаем объект значений\n\n\n      return this._formValues;\n    }\n  }]);\n\n  return PopupWithForm;\n}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PopupWithImage; });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar PopupWithImage = /*#__PURE__*/function (_Popup) {\n  _inherits(PopupWithImage, _Popup);\n\n  var _super = _createSuper(PopupWithImage);\n\n  function PopupWithImage(popupSelector) {\n    var _this;\n\n    _classCallCheck(this, PopupWithImage);\n\n    _this = _super.call(this, popupSelector);\n    _this._image = _this._element.querySelector('.popup__image');\n    _this._caption = _this._element.querySelector('.popup__caption');\n    return _this;\n  }\n\n  _createClass(PopupWithImage, [{\n    key: \"open\",\n    value: function open(img, title) {\n      this._image.src = img;\n      this._image.alt = title;\n      this._caption.textContent = title;\n\n      _get(_getPrototypeOf(PopupWithImage.prototype), \"open\", this).call(this);\n    }\n  }]);\n\n  return PopupWithImage;\n}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Section; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Section = /*#__PURE__*/function () {\n  function Section(_ref, containerSelector) {\n    var items = _ref.items,\n        renderer = _ref.renderer;\n\n    _classCallCheck(this, Section);\n\n    this._initialArray = items;\n    this._renderer = renderer; // renderer — это функция\n\n    this._container = document.querySelector(containerSelector);\n  }\n\n  _createClass(Section, [{\n    key: \"renderItems\",\n    value: function renderItems() {\n      var _this = this;\n\n      this._initialArray.forEach(function (item) {\n        _this._renderer(item); // вызываем renderer, передав item\n\n      });\n    }\n  }, {\n    key: \"addItem\",\n    value: function addItem(element) {\n      this._container.prepend(element);\n    }\n  }]);\n\n  return Section;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return UserInfo; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar UserInfo = /*#__PURE__*/function () {\n  function UserInfo(_ref) {\n    var selectorUserName = _ref.selectorUserName,\n        selectorUserStatus = _ref.selectorUserStatus,\n        selectorUserPhoto = _ref.selectorUserPhoto;\n\n    _classCallCheck(this, UserInfo);\n\n    this._name = document.querySelector(selectorUserName);\n    this._status = document.querySelector(selectorUserStatus);\n    this._photo = document.querySelector(selectorUserPhoto);\n  }\n\n  _createClass(UserInfo, [{\n    key: \"getUserInfo\",\n    value: function getUserInfo() {\n      return {\n        name: this._name.textContent,\n        status: this._status.textContent,\n        photo: this._photo\n      };\n    }\n  }, {\n    key: \"setUserInfo\",\n    value: function setUserInfo(_ref2) {\n      var name = _ref2.name,\n          status = _ref2.status,\n          id = _ref2.id;\n      this._name.textContent = name;\n      this._status.textContent = status;\n      this.id = id;\n    }\n  }, {\n    key: \"setUserPhoto\",\n    value: function setUserPhoto(newImageUrl) {\n      this._photo.src = newImageUrl;\n    }\n  }]);\n\n  return UserInfo;\n}();\n\n\n\n//# sourceURL=webpack:///./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/favicon.ico":
/*!*************************!*\
  !*** ./src/favicon.ico ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"./favicon.ico\");\n\n//# sourceURL=webpack:///./src/favicon.ico?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/pages/index.css?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _favicon_ico__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../favicon.ico */ \"./src/favicon.ico\");\n\n\n\n\n\n\n\n\n //// Переменные и константы:\n//API\n\nvar api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',\n  headers: {\n    authorization: '23bbe762-c214-4ce4-b9fd-b26b33fa43ee',\n    'Content-Type': 'application/json'\n  }\n}); // Поля ввода\n\nvar nameInput = document.querySelector('.popup__input_field_name');\nvar jobInput = document.querySelector('.popup__input_field_status'); // Кнопки\n\nvar btnProfileEdit = document.querySelector('.profile__edit-btn');\nvar btnAddCard = document.querySelector('.profile__add-btn'); //Фото профиля\n\nvar imgProfilePhoto = document.querySelector('.profile__photo-overlay'); // Информация о пользователе\n\nvar userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  selectorUserName: '.profile__name',\n  selectorUserStatus: '.profile__status',\n  selectorUserPhoto: '.profile__photo'\n});\nvar cardsList;\nvar activeCard; // Формы:\n\nvar popupEditProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('.popup_edit-profile', updateUserInfo);\nvar popupEditPhoto = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('.popup_update-photo', updateUserPhoto);\nvar popupAddCard = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('.popup_add-card', function (inputValues) {\n  popupAddCard._saveButton.textContent = 'Сохранение...';\n  api.addNewCard(inputValues.location, inputValues.image).then(function (response) {\n    cardsList.addItem(createNewCard(response));\n    popupAddCard.close();\n  }).catch(function () {\n    console.error('can`t add cards');\n  }).finally(function () {\n    popupAddCard._saveButton.textContent = 'Сохранить';\n  });\n});\nvar popupRemoveCard = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('.popup_remove-card', function (inputValues) {\n  popupRemoveCard._saveButton.textContent = 'Удаление...';\n  api.removeCard(activeCard.getId()).then(function () {\n    activeCard.removeCard();\n    popupRemoveCard.close();\n  }).catch(function () {\n    console.error('can`t delete cards');\n  }).finally(function () {\n    popupRemoveCard._saveButton.textContent = 'Да';\n  });\n});\nvar popupCardImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('.popup_show-image'); // Настройки валидации\n\nvar validationSettings = {\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__save'\n};\nvar validators = {};\nvalidators.popupEditProfile = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](validationSettings, popupEditProfile.form);\nvalidators.popupEditPhoto = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](validationSettings, popupEditPhoto.form);\nvalidators.popupAddCard = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](validationSettings, popupAddCard.form);\nvalidators.popupRemoveCard = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](validationSettings, popupRemoveCard.form); //// Функции\n\nfunction createNewCard(data) {\n  var card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](data, '#card-template', handleCardClick, userInfo.id, handleCardRemove, handleCardLike);\n  return card.generateCard();\n}\n\nfunction handleCardClick(img, title) {\n  popupCardImage.open(img, title);\n}\n\nfunction handleCardRemove() {\n  activeCard = this;\n  popupRemoveCard.open();\n}\n\nfunction handleCardLike() {\n  var _this = this;\n\n  if (this._isAlreadyLiked) {\n    api.setLikeCardOff(this.getId()).then(function (response) {\n      _this.toggleLike(response, userInfo.id);\n    }).catch(function () {\n      console.error('can`t set like');\n    });\n  } else {\n    api.setLikeCardOn(this.getId()).then(function (response) {\n      _this.toggleLike(response, userInfo.id);\n    }).catch(function () {\n      console.error('can`t set like');\n    });\n  }\n}\n\nfunction updateUserInfo(obj) {\n  popupEditProfile._saveButton.textContent = 'Сохранение...';\n  api.updateCurrentUserInfo(obj.name, obj.status).then(function () {\n    userInfo.setUserInfo(obj);\n    popupEditProfile.close();\n  }).finally(function () {\n    popupEditProfile._saveButton.textContent = 'Сохранить';\n  });\n}\n\nfunction updateUserPhoto(obj) {\n  popupEditPhoto._saveButton.textContent = 'Сохранение...';\n  api.updateCurrentUserPhoto(obj.image).then(function () {\n    userInfo.setUserPhoto(obj.image);\n    popupEditPhoto.close();\n  }).finally(function () {\n    popupEditPhoto._saveButton.textContent = 'Сохранить';\n  });\n} //// Действия\n// Включаем валидацию на всех формах\n\n\nvalidators.popupEditProfile.enableValidation();\nvalidators.popupEditPhoto.enableValidation();\nvalidators.popupAddCard.enableValidation();\nvalidators.popupRemoveCard.enableValidation(); // Назначаем слушатели\n\npopupEditProfile.setEventListeners();\npopupEditPhoto.setEventListeners();\npopupAddCard.setEventListeners();\npopupRemoveCard.setEventListeners();\npopupCardImage.setEventListeners();\nimgProfilePhoto.addEventListener('click', function () {\n  validators.popupEditPhoto.validateForm();\n  popupEditPhoto.open();\n});\nbtnProfileEdit.addEventListener('click', function () {\n  nameInput.value = userInfo.getUserInfo().name;\n  jobInput.value = userInfo.getUserInfo().status;\n  validators.popupEditProfile.validateForm();\n  popupEditProfile.open();\n});\nbtnAddCard.addEventListener('click', function () {\n  validators.popupAddCard.validateForm();\n  popupAddCard.open();\n}); //Получаем информацию о пользователе\n// Можно лучше:\n// Использовать Promise.all() для получения карточек и информации о пользователе.\n\napi.getCurrentUserInfo().then(function (result) {\n  userInfo.setUserInfo({\n    name: result.name,\n    status: result.about,\n    id: result._id\n  });\n  userInfo.setUserPhoto(result.avatar);\n}).catch(function () {\n  console.error('can`t get userInfo');\n}); //Отрисовываем первые карточки\n\napi.getCards().then(function (result) {\n  cardsList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    items: result.reverse(),\n    renderer: function renderer(item) {\n      cardsList.addItem(createNewCard(item));\n    }\n  }, '.elements');\n  cardsList.renderItems();\n}).catch(function () {\n  console.error('can`t get cards');\n});\n\n//# sourceURL=webpack:///./src/pages/index.js?");

/***/ })

/******/ });