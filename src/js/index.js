const mainNav = document.querySelector('.main-nav');
const mainNavToggle = mainNav.querySelector('.main-nav__toggle');
const loginBtn = mainNav.querySelector('.main-nav__login');
const loginPopup = document.querySelector('.login');
const loginPopupClose = loginPopup.querySelector('.login__btn--close');

function openMainNavMenu() {
  mainNav.classList.remove('main-nav--closed');
  mainNav.classList.add('main-nav--opened');
}

function closeMainNavMenu() {
  mainNav.classList.remove('main-nav--opened');
  mainNav.classList.add('main-nav--closed');
}

function openLoginPopup(evt) {
  evt.preventDefault();
  loginPopup.classList.remove('login--closed');
  loginPopup.classList.add('login--opened');
}

function closeLoginPopup() {
  loginPopup.classList.remove('login--opened');
  loginPopup.classList.add('login--closed');
}

function onMainNavToggleClick() {
  if (mainNav.classList.contains('main-nav--closed')) {
    openMainNavMenu();
  } else {
    closeMainNavMenu();
  }
}

mainNavToggle.addEventListener('click', onMainNavToggleClick);
loginBtn.addEventListener('click', openLoginPopup);
loginPopupClose.addEventListener('click', closeLoginPopup);
