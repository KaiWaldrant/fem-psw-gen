document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("char-length");
  const charLengthValue = document.getElementById("char-length-Value");

  // Calculate slider value in percentage to create background of slider
  const calcValue = () => {
    let valuePct = (slider.value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #A4FFAF ${valuePct}%, #18171F ${valuePct}%)`;
  };

  // Update the value of the slider
  slider.addEventListener("input", function () {
    calcValue();
    charLengthValue.textContent = slider.value;
  });
  // To make the background of the slider visible on page reload
  calcValue();
});
