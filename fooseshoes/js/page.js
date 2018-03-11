(function() {
  var menuButton = document.querySelector('.header__menu-toggler');
  var menuButtonIcon = menuButton.querySelector('svg').querySelector('use');
  var navList = document.querySelector('.nav__list');

  // Закрывает меню по умолчанию, меняет img кнопки
  menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
  menuButton.setAttribute('title', 'Open');
  navList.setAttribute('style', 'display: none');
  //-------------------------

  var minWidth = window.matchMedia("(min-width: 768px)");

  menuButton.addEventListener('click', function() {
    if (menuButton.getAttribute('title') === 'Open') {
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-close');
      menuButton.setAttribute('title', 'Close');
      navList.removeAttribute('style');
    } else if (menuButton.getAttribute('title') === 'Close') {
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
      menuButton.setAttribute('title', 'Open');
      navList.setAttribute('style', 'display: none');
    };
  });
})()
