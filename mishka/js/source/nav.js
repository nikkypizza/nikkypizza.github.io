(function() {
  var navButton = document.querySelector ('.page-header__toggler');
  var navButtonSvg = navButton.querySelector ('svg');
  var navButtonSvgUse = navButtonSvg.querySelector ('use');
  var nav = document.querySelector ('.nav');
  var headerSearch = document.querySelector ('.page-header__search-wrapper');
  var headerCart = document.querySelector ('.page-header__cart-wrapper');


  navButton.addEventListener ('click', function () {
    nav.classList.toggle ('display-none');

    headerSearch.classList.toggle ('display-none');
    headerSearch.classList.toggle ('page-header__search-wrapper');

    headerCart.classList.toggle ('display-none');
    headerCart.classList.toggle ('page-header__cart-wrapper');

    navButtonSvgUse.getAttribute ('xlink:href') === '#icon-menu-close' ? navButtonSvgUse.setAttribute ('xlink:href', '#icon-menu-open') : navButtonSvgUse.setAttribute ('xlink:href', '#icon-menu-close')

  });

  function removeDisplayNoneOnWindowResize (width) {
    if (width.matches) {
      // Возвращает элементам header display:flex. Это необходимо, ибо эти элементы не являются частью nav и сложно перестраиваются на ширинах > 768px и класс хедера переписывает 'display: none' на 'display: flex'
      headerSearch.classList.remove ('display-none');
      headerSearch.classList.add ('page-header__search-wrapper');

      headerCart.classList.remove ('display-none');
      headerCart.classList.add ('page-header__cart-wrapper');

      nav.classList.remove('display-none');
    } else {
      // Приводит меню в закрытый вид после того, как ширина экрана меняется на минимальную
      headerSearch.classList.add ('display-none');
      headerSearch.classList.remove ('page-header__search-wrapper');

      headerCart.classList.add ('display-none');
      headerCart.classList.remove ('page-header__cart-wrapper');

      nav.classList.add ('display-none');
      navButtonSvgUse.setAttribute ('xlink:href', '#icon-menu-open');
    }
  }

  var minWidthMedia = window.matchMedia ("(min-width: 768px)");
  removeDisplayNoneOnWindowResize (minWidthMedia);
  minWidthMedia.addListener (removeDisplayNoneOnWindowResize);// Добавляет слушателя на изменения ширины
})();