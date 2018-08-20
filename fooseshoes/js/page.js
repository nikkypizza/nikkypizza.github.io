(function() {
  var menuButton = document.querySelector('.header__menu-toggler');
  var menuButtonIcon = menuButton.querySelector('svg use');
  var navList = document.querySelector('.nav__list');

  // Закрывает меню по умолчанию, меняет img кнопки
  menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
  menuButton.title = 'Open';
  navList.style.display = 'none';
  //-------------------------

  var minWidth = window.matchMedia("(min-width: 768px)");

  menuButton.addEventListener('click', function() {
    if (menuButton.title === 'Open') {
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-close');
      menuButton.title = 'Close';
      navList.style = '';
    } else {
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
      navList.style.display = 'none';
      menuButton.title = 'Open';
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
      navList.style = '';
      menuButton.style.display = 'none';
    } else {
      // при ширине вьюпорта меньше 768px
      menuButton.style = '';
      menuButton.title = 'Open';
      navList.style.display = 'none';
      menuButtonIcon.setAttribute('xlink:href', '#icon-menu-open');
    }
  }
})()
