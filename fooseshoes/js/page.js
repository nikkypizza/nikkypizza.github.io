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
    } else {
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
      menuButton.setAttribute('title', 'Open');
      navList.setAttribute('style', 'display: none');
    };
  });

  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 768px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  };

  // при изменении значения вьюпорта
  function WidthChange(mq) {
    if (mq.matches) {
      // при ширине вьюпорта >= 768px
      menuButton.setAttribute('style', 'display: none');
      navList.removeAttribute('style');
    } else {
      // при ширине вьюпорта меньше 768px
      menuButton.removeAttribute('style');
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
      menuButton.setAttribute('title', 'Open');
      navList.setAttribute('style', 'display: none');
    }
  }
})()
