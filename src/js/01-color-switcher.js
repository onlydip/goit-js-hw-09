const startBTN = document.querySelector('[data-start]');
const stopBTN = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timeId = null;

startBTN.addEventListener('click', startColorChange);
stopBTN.addEventListener('click', stopColorChange);

function startColorChange() {
  if (timeId === null) {
    startBTN.disabled = true;
    timeId = setInterval(changeBackgroundColor, 1000);
  }
}

function stopColorChange() {
  if (timeId !== null) {
    startBTN.disabled = false;
    clearInterval(timeId);
    timeId = null;
  }
}

function changeBackgroundColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}