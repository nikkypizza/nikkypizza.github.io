(function() {
  var overlay = document.querySelector (".modal");
  var modal = document.querySelector (".modal__wrapper");
  var modalButton = document.querySelector (".modal__submit");
  var buyButton = document.querySelectorAll (".js-addToCart");

  if (overlay) {
    for (var i = 0; i < buyButton.length; i++) buyButton[i].addEventListener ("click", function (event) {
      event.preventDefault ();
      overlay.classList.add ("overlay--on");
    });

    overlay.addEventListener ("click", function () {
      overlay.classList.remove ("overlay--on");
    });

    modal.addEventListener ("click", function (event) {
      event.stopPropagation ();
    });

    modalButton.addEventListener ("submit", function () {
      overlay.classList.remove ("overlay--on");
    });

    window.addEventListener ("keydown", function (event) {
      if (event.keyCode === 27) {
        overlay.classList.remove ("overlay--on");
      }
    });
  }

  function setFocus () {
    document.getElementByClassName (".modal__radio").focus ();
  }
})();