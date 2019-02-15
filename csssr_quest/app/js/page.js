(function () {
  const JS_SKILL_VALUES = [0, 20, 50, 100];
  const jsSkillButtons = document.querySelectorAll(".ProgSkillsList-ItemButton");
  // Слайдер (написал сам)
  const scaleNode = document.querySelector(".ProgSkillScale");
  const inputNode = scaleNode.querySelector(".ProgSkillScale-Input");
  const thumbNode = scaleNode.querySelector(".ProgSkillScale-Thumb");

  const thumbWidth = thumbNode.offsetWidth;
  const scaleWidth = scaleNode.clientWidth;
  const onePercent = (scaleWidth - thumbWidth / 2) / 100;

  thumbNode.style.left = `${inputNode.value * onePercent}px`;

  thumbNode.addEventListener("mousedown", (evt) => {
    evt.preventDefault();
    let xStartCoords = evt.clientX;

    let onMouseMove = (moveEvt) => {
      let shift = xStartCoords - moveEvt.clientX;
      xStartCoords = moveEvt.clientX;
      moveEvt.preventDefault();

      thumbNode.style.left = `${thumbNode.offsetLeft- shift}px`;
      inputNode.setAttribute("value", Math.abs((((thumbNode.offsetLeft - shift + thumbWidth / 2) / scaleWidth) * 100).toFixed(0)));

      if (thumbNode.offsetLeft < -(thumbWidth / 2)) {
        thumbNode.style.left = `${-(thumbWidth / 2)}px`;
      }
      if (thumbNode.offsetLeft >= scaleWidth - thumbWidth / 1.5) {
        thumbNode.style.left = `${scaleWidth - thumbWidth /1.5}px`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  inputNode.addEventListener("input", () => {
    thumbNode.style.left = `${inputNode.value  * onePercent}px`;
  });


  // Скейлер для textarea (взял отсюда https://clck.ru/F9tF7)
  const textareaNode = document.querySelector(".Fieldset-Textarea");

  const autoExpand = (field) => {
    field.style.height = "inherit";
    let computed = window.getComputedStyle(field);
    let height = parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      field.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    field.style.height = height + "px";
  };

  autoExpand(textareaNode);

  textareaNode.addEventListener("input", function (event) {
    autoExpand(event.target);
  });

  // Интерактивность кнопок под шкалой .ProgSkillScale
  jsSkillButtons.forEach((it, i) => {
    it.addEventListener('click', () => {
      inputNode.setAttribute("value", JS_SKILL_VALUES[i]);
      thumbNode.style.left = `${inputNode.value  * onePercent- thumbWidth/2}px`;
    });
  })
})();