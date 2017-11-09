var link = document.querySelector(".find-hotel-button");
var popup = document.querySelector(".modal-search");


link = link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.toggle("modal-search--visible");
});
