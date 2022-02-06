// Таймер

const deadline = '2022-02-31';

function getDate(dline){
const t = Date.parse(dline) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);
return {
  'total': t,
  'days': days,
  'hours': hours,
  'minutes': minutes,
  'seconds': seconds,
};
}

function setZero(num) {
if (num >= 0 && num < 10) {
  return `0${num}`;
} else {
  return num;
}
}

function getTimer(selector, dline) {
const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    interval = setInterval(setTimer, 1000);

setTimer();
function setTimer(){
  const t = getDate(dline);

  days.textContent = setZero(t.days);
  hours.textContent = setZero(t.hours);
  minutes.textContent = setZero(t.minutes);
  seconds.textContent = setZero(t.seconds);


  if (t.total <= 0) {
      clearInterval(interval);
  }
}
}
getTimer('.timer', deadline);
