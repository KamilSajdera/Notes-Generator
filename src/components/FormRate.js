import { useRef, useEffect, useState, useContext } from 'react'

import NotesContext from '../store/notes-context';
import { MetronomeContext } from '../store/metronome-context';
import './FormRate.css';

let clicks = 4;
let currentNote = 0;

const playSound = notes => {
    
    if(currentNote > notes.length)
        return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';

    if(clicks===4) {
        oscillator.frequency.setValueAtTime(480, audioContext.currentTime);
        clicks=0;
    }    
    else
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); 

    const output = audioContext.destination;
    oscillator.connect(output);
  
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);

    clicks++;
};

const FormRate = () => {
    const { notes } = useContext(NotesContext);
    const metronomeContext = useContext(MetronomeContext)

    const [bpm, setBpm] = useState();
    const enteredBpm = useRef(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const playSound2TimeoutIdRef = useRef();

    const startMetronomeHandler = event => {
        event.preventDefault();
        clicks = 4;

        if (enteredBpm.current.value === '') return;

        if (!isPlaying) {
            setBpm(enteredBpm.current.value);
            setIsPlaying(true);
            metronomeContext.onPlayMetronome(true)
            currentNote = 0;
        } else {
            setIsPlaying(false);
            metronomeContext.onPlayMetronome(false)
            if (playSound2TimeoutIdRef.current) {
                clearTimeout(playSound2TimeoutIdRef.current);
            }
        }
    };

    const playSound2 = () => {
        if (!isPlaying) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const output = audioContext.destination;

        const playNote = (frequency, duration) => {
            const oscillator = audioContext.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(output);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration - 0.1);

            metronomeContext.onChangeNote(currentNote)
        };

        const playNextNote = () => {
            if (currentNote < notes.length) {
                const note = notes[currentNote];
                let delay;

                if (note.latency === 16) delay = 4;
                else if (note.latency === 8) delay = 2;
                else if (note.latency === 4) delay = 1;
                else delay = 0.5;

                const intervalNote = (60 / bpm) * 1000 * delay;
                const duration = intervalNote / 1000;
                let frequency = 0;

                if (notes[currentNote].pitch === 'pitch-C') frequency = 261;
                else if (notes[currentNote].pitch === 'pitch-Cis') frequency = 277;
                else if (notes[currentNote].pitch === 'pitch-D') frequency = 294;
                else if (notes[currentNote].pitch === 'pitch-Es') frequency = 311;
                else if (notes[currentNote].pitch === 'pitch-E') frequency = 330;
                else if (notes[currentNote].pitch === 'pitch-F') frequency = 350;
                else if (notes[currentNote].pitch === 'pitch-Fis') frequency = 370;
                else if (notes[currentNote].pitch === 'pitch-G') frequency = 392;
                else if (notes[currentNote].pitch === 'pitch-Gis') frequency = 415;
                else if (notes[currentNote].pitch === 'pitch-A') frequency = 440;
                else if (notes[currentNote].pitch === 'pitch-B') frequency = 466;
                else if (notes[currentNote].pitch === 'pitch-H') frequency = 494;
                else if (notes[currentNote].pitch === 'pitch-C2') frequency = 523;
                else if (notes[currentNote].pitch === 'pitch-Cis2') frequency = 554;
                else if (notes[currentNote].pitch === 'pitch-D2') frequency = 587;
                else if (notes[currentNote].pitch === 'pitch-Es2') frequency = 622;
                else if (notes[currentNote].pitch === 'pitch-E2') frequency = 659;
                else if (notes[currentNote].pitch === 'pitch-F2') frequency = 698;
                else if (notes[currentNote].pitch === 'pitch-Fis2') frequency = 740;
                else if (notes[currentNote].pitch === 'pitch-G2') frequency = 784;
                else if (notes[currentNote].pitch === 'pitch-Gis2') frequency = 830;
                else if (notes[currentNote].pitch === 'pitch-A2') frequency = 880;
                else if (notes[currentNote].pitch === 'pitch-B2') frequency = 932;
                else if (notes[currentNote].pitch === 'pitch-H2') frequency = 988;
                else if (notes[currentNote].pitch === 'pitch-C3') frequency = 1046;
                else if (notes[currentNote].pitch === 'pitch-Cis3') frequency = 1108;
                else frequency = 0;

                if(notes[currentNote].type === 'rest')
                    frequency = 20000; // human can hear to 20kHz

                playNote(frequency, duration);

                currentNote++;
                playSound2TimeoutIdRef.current = setTimeout(playNextNote, intervalNote);
            }
        };

        playNextNote();
    };

    useEffect(() => {
        let timerId;
        let timer;

        if (isPlaying) {
            const intervalMetronome = (60 / bpm) * 1000;

            timerId = setInterval(() => {
                if (currentNote < notes.length) playSound(notes);
                else {
                    setIsPlaying(false);
                    metronomeContext.onPlayMetronome(false)
                    clearInterval(timerId);
                }
            }, intervalMetronome);

            timer = setTimeout(() => {
                if (isPlaying) playSound2();
            }, intervalMetronome);
        }

        return () => {
            clearInterval(timerId);
            clearTimeout(timer);
            clearTimeout(playSound2TimeoutIdRef.current);
        };
    }, [bpm, isPlaying, notes]);

    
    return (
        <form className='settings-rate' onSubmit={startMetronomeHandler}>
            <input type='number' min='60' max='160' step='1' name='bpm' ref={enteredBpm} />
            <label htmlFor='bpm'>bpm</label>
            <button type='submit' className={isPlaying ? 'play-rate red' : 'play-rate'}>
                {!isPlaying ? 'Play' : 'Stop'}
            </button>
        </form>
    );
};

export default FormRate;