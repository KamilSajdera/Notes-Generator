import metronomeClick from '../metronomeClick.mp3'
import metronomeClick2 from '../metronomeClickon1.mp3'

const useMetronome = () => {
    let clicks = 0;

    function playMetronome() {
        if(clicks++ === 4) 
            clicks = 1;

        const clickSound = new Audio(metronomeClick);
        const clickSound2 = new Audio(metronomeClick2);

        if(clicks===1)
            clickSound2.play();
        else
            clickSound.play()
    }

    function playSound(frequency, duration) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const output = audioContext.destination;

        const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(output);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration - 0.1);
    }

    return { playMetronome, playSound };
};

export default useMetronome;