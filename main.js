let memory = 0;
let isOn = true;

function onScreen(value) {
    if (!isOn) return;
    let display = document.getElementById('display');
    display.value += value;
    adjustFontSize();
    playSound();
}

function clearScreen() {
    if (!isOn) return;
    document.getElementById('display').value = '';
    playSound();
}

function adjustFontSize() {
    let display = document.getElementById('display');
    if (display.value.length > 10) {
        display.style.fontSize = "1.8em";
    } else if (display.value.length > 20) {
        display.style.fontSize = "1.5em";
    } else {
        display.style.fontSize = "2.5em"; // Default size
    }
}

function calculate() {
    if (!isOn) return;
    try {
        let result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result.toPrecision(10); // Limits precision to prevent overflow
        adjustFontSize();
        playSound();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}


function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

function memoryClear() {
    memory = 0;
    playSound();
}

function memoryAdd() {
    let currentValue = parseFloat(document.getElementById('display').value) || 0;
    memory += currentValue;
    playSound();
}

function memorySubtract() {
    let currentValue = parseFloat(document.getElementById('display').value) || 0;
    memory -= currentValue;
    playSound();
}

function togglePower() {
    isOn = !isOn;
    document.getElementById('display').value = isOn ? '' : 'OFF';
    playSound();
}

function scientificFunction(func) {
    if (!isOn) return;
    try {
        let value = parseFloat(document.getElementById('display').value) || 0;
        let result = eval(`${func}(${value})`);
        document.getElementById('display').value = result;
        playSound();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function scientificFunction(func, exponent = null) {
    let display = document.getElementById("display");

    if (exponent !== null) {
        display.value = Math.pow(parseFloat(display.value), exponent);
    } else {
        display.value = eval(func + "(" + display.value + ")");
    }
}
