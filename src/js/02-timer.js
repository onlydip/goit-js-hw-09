
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import Notiflix from 'notiflix';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';


const start = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if(selectedDates[0] < Date.now()){
          Confirm.show("SORRY!!!!!!!!!",
              "Please choose a date in the future",
              "CONFIRM");
           selectedDate = null;
     }
    if (selectedDates[0] > Date.now()) {
      start.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

start.setAttribute('disabled', 'true');
start.addEventListener('click', onStart);

function onStart() {
  start.setAttribute('disabled', 'true');
  if (selectedDate > Date.now()) {
    timerId = setInterval(() => {
      const msCount = convertMs(selectedDate - Date.now());
      seconds.textContent = addLeadingZero(msCount.seconds.toString());
      minutes.textContent = addLeadingZero(msCount.minutes.toString());
      hours.textContent = addLeadingZero(msCount.hours.toString());
      days.textContent = addLeadingZero(msCount.days.toString());
      if (selectedDate - Date.now() < 1000) {
        clearInterval(timerId);
      }
    }, 1000);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}