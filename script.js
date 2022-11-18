const hoursInput = document.querySelector('.display__item_hours');
const minutesInput = document.querySelector('.display__item_minutes');
const secondsInput = document.querySelector('.display__item_seconds');
const fields = document.querySelectorAll('.display__item');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.btn_start');
const stopBtn = document.querySelector('.btn_stop');
const timer = document.querySelector('.timer');

let intervalID;
let remainingTime;
let totalTime;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', pauseTimer);
fields.forEach((item) => {
    item.addEventListener(
        'input',
        (e) => (item.value = e.target.value.replace(/[^\d]/g, ''))
    );
});

function startTimer() {
    totalTime = remainingTime ? remainingTime : getValues();
    if (totalTime) {
        updateTimer();
        intervalID = setInterval(updateTimer, 1000);
        startBtn.removeEventListener('click', startTimer);
        stopBtn.innerHTML = 'pause';
        stopBtn.removeEventListener('click', clearTimer);
        stopBtn.addEventListener('click', stopTimer);
        fields.forEach((item) => item.setAttribute('disabled', true));
        title.classList.add('active');
    }
}

function updateTimer() {
    hoursInput.value = numberLessTen(Math.floor(totalTime / 60 / 60));
    minutesInput.value = numberLessTen(Math.floor((totalTime / 60) % 60));
    secondsInput.value = numberLessTen(Math.floor(totalTime % 60));

    if (totalTime < 0) {
        stopTimer();
    }
    totalTime--;
}

function pauseTimer() {
    if (hoursInput.value || minutesInput.value || secondsInput.value) {
        startBtn.addEventListener('click', startTimer);
        clearInterval(intervalID);
        remainingTime = totalTime;
        title.classList.remove('active');
        stopBtn.removeEventListener('click', stopTimer);
        stopBtn.addEventListener('click', clearTimer);
        stopBtn.innerHTML = 'clear';
    }
}

function clearTimer() {
    totalTime = 0;
    remainingTime = 0;
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    stopBtn.innerHTML = 'pause';
    fields.forEach((item) => item.removeAttribute('disabled'));
}

function stopTimer() {
    clearInterval(intervalID);
    startBtn.addEventListener('click', startTimer);
    title.classList.remove('active');
    clearTimer();
}

function getValues() {
    const hours = !hoursInput.value ? 0 : parseInt(hoursInput.value) * 60 * 60;
    const mins = !minutesInput.value ? 0 : parseInt(minutesInput.value) * 60;
    const secs = !secondsInput.value ? 0 : parseInt(secondsInput.value);
    return hours + mins + secs;
}

function numberLessTen(number) {
    return number < 10 ? `0${number}` : number;
}



const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let timerId;
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = (seconds) => {
    console.log(seconds);
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds / 60) % 60);
    const sec = Math.floor(seconds % 60);
    if (seconds) {
        timerEl.innerHTML = `
    ${hours} : ${minutes} : ${sec}
    `;
    }
};

const animateTimer = (seconds) => {
  const timerid =  setInterval(createTimerAnimator, 1000);
  console.log('seconds')
  if (seconds < 1){
    clearInterval(timerid)
  }
};

const stopTimer = () => {

}

// inputEl.addEventListener('input', () => {
//   // Очистите input так, чтобы в значении
//   // оставались только числа
// });

inputEl.addEventListener(
    'input',
    (e) => (inputEl.value = e.target.value.replace(/\D/g, ''))
);

buttonEl.addEventListener('click', () => {
    console.log('click');
    // const seconds = Number(inputEl.value);
    const seconds = 5;

    animateTimer(seconds);

    inputEl.value = '';
});





