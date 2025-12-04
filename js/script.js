document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  const slider = document.getElementById("char-length");
  const charLengthValue = document.getElementById("char-length-Value");
  const generateBtn = document.getElementById("generate-btn");
  const arrowRight = document.getElementById("arrow-right");
  const strengthLevel = document.getElementById("strength-lvl");

  let options = {
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  const getOptions = () => {
    document.querySelectorAll(".options__checkbox").forEach((item) => {
      if (item.checked === true) {
        options[item.id] = true;
      } else if (item.checked === false) {
        options[item.id] = false;
      }
    });
  };

  const generatePassword = (length) => {
    getOptions();
    const sets = [];
    let allChars = "";

    if (options.lowercase) {
      const lower = "abcdefghijklmnopqrstuvwxyz";
      sets.push(lower);
      allChars += lower;
    }
    if (options.uppercase) {
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      sets.push(upper);
      allChars += upper;
    }
    if (options.numbers) {
      const nums = "0123456789";
      sets.push(nums);
      allChars += nums;
    }
    if (options.symbols) {
      const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      sets.push(syms);
      allChars += syms;
    }

    if (sets.length === 0) return "";

    let password = [];

    // Add one character from each enabled set
    const guaranteed = Math.min(sets.length, length);
    for (let i = 0; i < guaranteed; i++) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      password.push(sets[i][array[0] % sets[i].length]);
    }

    // Fill the rest with random characters from all sets
    for (let i = sets.length; i < length; i++) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      password.push(allChars[array[0] % allChars.length]);
    }

    for (let i = password.length - 1; i > 0; i--) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const j = array[0] % (i + 1);
      [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join("");
  };

  const getPasswordStrength = (length, options) => {
    let score = 0;

    // Length scoring
    if (length === 0) return "";

    if (length >= 16) score += 3;
    else if (length >= 12) score += 2;
    else if (length >= 8) score += 1;
    else if (length >= 3) score = 0;

    if (score === 0) return "TOO WEAK!";

    // Complexity scoring
    if (options.uppercase) score += 1;
    if (options.lowercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 2;

    // Determine strength
    if (score <= 3) return "TOO WEAK!";
    if (score <= 5) return "WEAK";
    if (score <= 7) return "MEDIUM";
    return "STRONG";
  };

  const setStrengthLevelColor = (level) => {
    const strengthBars = document.querySelectorAll(".strength__bar");

    const bars = [
      { filled: false, color: "" },
      { filled: false, color: "" },
      { filled: false, color: "" },
      { filled: false, color: "" },
    ];

    const lvlcolor = {
      "TOO WEAK!": "bg-red-500",
      WEAK: "bg-orange-400",
      MEDIUM: "bg-yellow-300",
      STRONG: "bg-green-200",
    };

    if (level === "TOO WEAK!") {
      bars[0] = { filled: true, color: lvlcolor[level] };
    } else if (level === "WEAK") {
      bars[0] = { filled: true, color: lvlcolor[level] };
      bars[1] = { filled: true, color: lvlcolor[level] };
    } else if (level === "MEDIUM") {
      bars[0] = { filled: true, color: lvlcolor[level] };
      bars[1] = { filled: true, color: lvlcolor[level] };
      bars[2] = { filled: true, color: lvlcolor[level] };
    } else if (level === "STRONG") {
      bars[0] = { filled: true, color: lvlcolor[level] };
      bars[1] = { filled: true, color: lvlcolor[level] };
      bars[2] = { filled: true, color: lvlcolor[level] };
      bars[3] = { filled: true, color: lvlcolor[level] };
    }

    console.log(bars);

    strengthBars.forEach((bar, index) => {
      if (bars[index].filled) {
        bar.classList.remove("bg-*");
        bar.classList.add(bars[index].color);
      } else {
        bar.classList.remove("bg-*");
      }
    });
  };

  generateBtn.addEventListener("click", () => {
    const length = slider.value;
    const password = generatePassword(length);
    console.log(password);
    passwordField.value = password;
    strengthLevel.textContent = getPasswordStrength(length, options);
    setStrengthLevelColor(strengthLevel.textContent);
  });

  // copy button
  const copyBtn = document.getElementById("copy-btn");
  copyBtn.addEventListener("click", () => {
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(passwordField.value);
    document.getElementById("copy-feedback").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("copy-feedback").classList.add("hidden");
    }, 2000);
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
