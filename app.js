let audioContext = null;
let oscillator = null;
let gainNode = null;

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const output = document.getElementById('output');

startBtn.addEventListener('click', function() {
    if (!audioContext) {
        try {
            audioContext = new AudioContext();
            console.log('AudioContext created successfully');
        } catch (error) {
            console.error(`Error creating AudioContext: ${error}`);
            return;
        }
    }

    // Resume AudioContext if it's in a suspended state
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('AudioContext resumed successfully');
            startOscillator();
        });
    } else {
        startOscillator();
    }
});

function startOscillator() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }

    oscillator = audioContext.createOscillator();
    console.log('Oscillator created');

    oscillator.type = 'sine';
    console.log('Oscillator set to sine wave');

    oscillator.frequency.value = 440;
    console.log('Frequency set to 440 Hz (The A note)');

    gainNode = audioContext.createGain();
    console.log('Gain node created');

    gainNode.gain.value = 1;
    console.log('Gain set to 1 (full volume)');

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    console.log('Node connected: oscillator -> gain -> speakers');

    oscillator.start();
    console.log('Oscillator started at 440hz (The A note)');
    output.textContent = 'Oscillator started at 440hz'
}

stopBtn.addEventListener('click', function() {
    if (oscillator) {
        oscillator.stop();
        console.log('Oscillator stopped');
        oscillator = null;
        output.innerHTML = '<span> Oscillator stopped</span>'
    } else {
        console.log('Oscillator not running - cannot stop');
    }
});
