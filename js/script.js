document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("char-length");
  const charLengthValue = document.getElementById("char-length-Value");
  const generateBtn = document.getElementById("generate-btn");
  const arrowRight = document.getElementById("arrow-right");

  let options = {};

  const getOptions = () => {
    document.querySelectorAll(".options__checkbox").forEach((item) => {
      if (item.checked === true) {
        options[item.id] = true;
      } else if (item.checked === false) {
        options[item.id] = false;
      }
    });
  };

  const generatePassword = (length, options) => {
    getOptions();
  };

  generateBtn.addEventListener("click", () => {
    const length = slider.value;
    const password = generatePassword(length);
    document.getElementById("password").textContent = password;
  });

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

  // Change arrow image on hover of generate button

  generateBtn.addEventListener("mouseover", () => {
    arrowRight.src = "/assets/images/icon-arrow-right-hover.svg";
  });

  generateBtn.addEventListener("mouseout", () => {
    arrowRight.src = "/assets/images/icon-arrow-right.svg";
  });

  //
});
