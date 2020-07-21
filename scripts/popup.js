
// Универсальное открытие формы
export function openPopup(popup) {
  // Показываем popup
  popup.classList.add('popup_opened');

  // Добавляем слушатель закрытия popup по Escape
  document.addEventListener('keydown', closePopupByEsc);
}

// Универсальное закрытие формы
export function closePopup() {
  const activePopup = document.querySelector('.popup_opened');
  activePopup.classList.remove('popup_opened');

  // Закрытие popup по Escape
  document.removeEventListener('keydown', closePopupByEsc)
}

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

//// Закрытие форм
// Закрытие popup по крестику
document.querySelectorAll('.popup__close').forEach(function (btnPopupClose) {
  btnPopupClose.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

// Закрытие popup по клику в Overlay
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target.closest('.popup'));
    }
  });
});
