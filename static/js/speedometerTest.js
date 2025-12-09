const ticks = document.querySelectorAll('.tick');
const details = document.querySelector('.details');
const progress = document.querySelector('.progress');

const outerRingRadius = 164;

// Функция для преобразования градусов в радианы
function deg2rad(angle) {
    return angle * (Math.PI / 180);
}

// Функция для преобразования радианов в градусы
function rad2deg(angle) {
    return angle * (180 / Math.PI);
}

// Обработка тиков
ticks.forEach(function(tick, i) {
    const angle = 210 - i * 5;
    const theta = deg2rad(angle);
    const radius = outerRingRadius + (i % 6 ? 0 : 4);
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * -radius;
    const transform = [
        `translate(${x}px, ${y}px)`,
        `rotate(${-angle}deg)`
    ].join(' ');
    
    tick.style.transform = transform;
    tick.style.webkitTransform = transform;
    tick.style.mozTransform = transform;
});

// Обработчик кнопки перезапуска
const retryButton = document.querySelector('.retry-button');
if (retryButton) {
    retryButton.addEventListener('click', function() {
        statValueCurrent = 0;
        updateDetails();
    });
} 

// Переменные анимации
const frameCount = 100;
const frameInterval = 0.3;
const digitValueMax = 1000;
let currentStatValueMax = 0;
let pastStatValueMax = 0;
let statValueCurrent = 0;
let statValueInterval = currentStatValueMax / frameCount;

// Функция установки значения статистики
function setStatValue(value) {
    const angle = -120 + 240 * (value / digitValueMax);
    
    if (progress && statValueCurrent <= 970 && statValueCurrent >= 30) {
        progress.style.transform = `rotate(${angle}deg)`;
        progress.style.webkitTransform = `rotate(${angle}deg)`;
        progress.style.mozTransform = `rotate(${angle}deg)`;
    }
    
    if (details) {
        const speedElement = details.querySelector('.speed');
        if (speedElement) {
            speedElement.textContent = value;
        }
    }
}


function stopAnimation(){
    pastStatValueMax = currentStatValueMax;
    setStatValue(currentStatValueMax)
}

// Функция обновления деталей
function updateDetails() {
    if (currentStatValueMax > pastStatValueMax){
        if (statValueCurrent.toFixed(1) > currentStatValueMax) {
            stopAnimation();
            return;
        }
    }else{
        if (statValueCurrent.toFixed(1) < currentStatValueMax) {
            stopAnimation();
            return;
        }
    }

    
    setStatValue(statValueCurrent.toFixed(1));
    statValueCurrent += statValueInterval;
    setTimeout(updateDetails, frameInterval);
}



function getRandomArbitrary(a, b) {
  return parseFloat((Math.random() * (b - a) + a).toFixed(1));
}


setInterval(function(){
    currentStatValueMax = getRandomArbitrary(40, 1000);
    statValueInterval = parseFloat(((currentStatValueMax - pastStatValueMax) / frameCount).toFixed(3));
    updateDetails();
    console.log(statValueInterval, pastStatValueMax, currentStatValueMax);
    
}, 2000);


// setTimeout(function () {
//     currentStatValueMax = 100;
//     statValueInterval = parseFloat(((currentStatValueMax - pastStatValueMax) / frameCount).toFixed(3));
//     updateDetails();
//     console.log(statValueInterval, pastStatValueMax, currentStatValueMax);
// }, 2000)


// setTimeout(function () {
//     currentStatValueMax = 990;
//     statValueInterval = parseFloat(((currentStatValueMax - pastStatValueMax) / frameCount).toFixed(3));
//     updateDetails();
//     console.log(statValueInterval, pastStatValueMax, currentStatValueMax);
// }, 4000);


// setTimeout(function () {
//     currentStatValueMax = 10;
//     statValueInterval = parseFloat(((currentStatValueMax - pastStatValueMax) / frameCount).toFixed(3));
//     updateDetails();
//     console.log(statValueInterval, pastStatValueMax, currentStatValueMax);
// }, 6000);


// setTimeout(function () {
//     currentStatValueMax = 340.2;
//     statValueInterval = parseFloat(((currentStatValueMax - pastStatValueMax) / frameCount).toFixed(3));
//     updateDetails();
//     console.log(statValueInterval, pastStatValueMax, currentStatValueMax);
// }, 8000);
