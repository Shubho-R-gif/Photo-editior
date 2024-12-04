const imageLoader = document.getElementById("imageLoader");
const imgEditBtn = document.getElementById("imgEditBtn");
const tools = document.querySelector(".tools");
const brightnessBar = document.getElementById("brightnessBar");
const contrastBar = document.getElementById("contrastBar");
const saturationBar = document.getElementById("saturationBar");
const exposureBar = document.getElementById("exposureBar");
const blurBar = document.getElementById("blurBar");
const number = document.getElementById("number");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let img = new Image();
let count = 0;
let previousValue = 0;
imageLoader.addEventListener("change", (e) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image on the canvas at position (0, 0)
      ctx.drawImage(img, 0, 0);
    };
    // Set the image source to the loaded data URL
    img.src = event.target.result;
  };

  // Read the file as a data URL
  reader.readAsDataURL(e.target.files[0]);
  
});

function saveImage() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = "Edited-Img.jpeg";
  link.click();
}

function editButton() {
  if (imgEditBtn.click) {
    imgEditBtn.style.display = "none";
    tools.classList.add("display");
  }
}

function updateFilters() {
  // Get current values of all filters
  let currentBrightnessValue = parseInt(brightnessBar.value);
  let currentContrastValue = parseInt(contrastBar.value);
  let currentSaturationValue = parseInt(saturationBar.value);
  let currentExposureValue = parseInt(exposureBar.value);
  let currentBlurValue = parseInt(blurBar.value);
  // Combine all filters into one filter string
  const filters = `
    brightness(${currentBrightnessValue}%)
    contrast(${currentContrastValue}%)
    saturate(${currentSaturationValue})
    sepia(${currentExposureValue}%)
    blur(${currentBlurValue}px)
    `;

  // Apply combined filters to the canvas
  ctx.filter = filters;
  ctx.drawImage(img, 0, 0);
}

function showBrightness() {
  // Hide other filter bars
  blurBar.style.display = "none";
  exposureBar.style.display = "none";
  saturationBar.style.display = "none";
  contrastBar.style.display = "none";

  // Show the brightness bar and number
  brightnessBar.style.display = "block";
  number.style.display = "block";

  let currentBrightnessValue = parseInt(brightnessBar.value);
  let displayedBrightnessValue = ((currentBrightnessValue - 100) / 40) * 100;
  number.textContent = displayedBrightnessValue.toFixed();
  console.log(number.textContent);
  updateFilters();
}

function showContrast() {
  // Always show contrastBar and hide brightnessBar
  blurBar.style.display = "none";
  exposureBar.style.display = "none";
  saturationBar.style.display = "none";
  brightnessBar.style.display = "none";
  // Show the brightness bar and number
  contrastBar.style.display = "block";
  number.style.display = "block";

  let currentContrastValue = parseInt(contrastBar.value);
  let displayedContrastValue = ((currentContrastValue - 100) / 40) * 100;
  number.textContent = displayedContrastValue.toFixed();
  console.log(number.textContent);

  updateFilters();
}

function showSaturation() {
  blurBar.style.display = "none";
  exposureBar.style.display = "none";
  contrastBar.style.display = "none";
  brightnessBar.style.display = "none";
  // Show the brightness bar and number
  saturationBar.style.display = "block";
  number.style.display = "block";

  let currentSaturationValue = parseInt(saturationBar.value);
  let displayedSaturationValue = ((currentSaturationValue - 1) / 40) * 445;
  number.textContent = displayedSaturationValue.toFixed();
  console.log(number.textContent);
  updateFilters();
}

function showExposure() {
  blurBar.style.display = "none";
  saturationBar.style.display = "none";
  contrastBar.style.display = "none";
  brightnessBar.style.display = "none";

  // Show the brightness bar and number
  exposureBar.style.display = "block";
  number.style.display = "block";
  let currentExposureValue = parseInt(exposureBar.value);

  let displayedExposureValue = currentExposureValue;
  number.textContent = displayedExposureValue;
  console.log(number.textContent);
  updateFilters();
}

function showBlur() {
  exposureBar.style.display = "none";
  saturationBar.style.display = "none";
  contrastBar.style.display = "none";
  brightnessBar.style.display = "none";

  // Show the brightness bar and number
  blurBar.style.display = "block";
  number.style.display = "block";

  let currentBlurValue = parseInt(blurBar.value);

  let displayedBlurValue = currentBlurValue;
  number.textContent = displayedBlurValue;
  console.log(number.textContent);
  updateFilters();
}

brightnessBar.addEventListener("input", showBrightness);
contrastBar.addEventListener("input", showContrast);
saturationBar.addEventListener("input", showSaturation);
exposureBar.addEventListener("input", showExposure);
blurBar.addEventListener("input", showBlur);


