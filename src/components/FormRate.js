import React, { useRef, useEffect, useState, useContext } from 'react'
import useMetronome from '../hooks/use-metronome';

import NotesContext from '../store/notes-context';
import { MetronomeContext } from '../store/metronome-context';
import './FormRate.css';

let currentNote = 0;

const FormRate = () => {
    
    const { notes } = useContext(NotesContext);

    const metronomeContext = useContext(MetronomeContext)
    const metronomeCallback = useMetronome();

    const [bpm, setBpm] = useState();
    const enteredBpm = useRef(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const playSound2TimeoutIdRef = useRef();

    const startMetronomeHandler = event => {
        event.preventDefault();

        if (enteredBpm.current.value === '') return;

        if (!isPlaying) {
            setBpm(enteredBpm.current.value);
            setIsPlaying(true);
            metronomeContext.onPlayMetronome(true)
            currentNote = 0;
        } else {
            setIsPlaying(false);
            metronomeContext.onPlayMetronome(false)
            if (playSound2TimeoutIdRef.current) 
                clearTimeout(playSound2TimeoutIdRef.current);
        }
    };

    const playSound = () => {
        if (!isPlaying) return;
        
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

                if (note.pitch === 'pitch-C') frequency = 261;
                else if (note.pitch === 'pitch-Cis') frequency = 277;
                else if (note.pitch === 'pitch-D') frequency = 294;
                else if (note.pitch === 'pitch-Es') frequency = 311;
                else if (note.pitch === 'pitch-E') frequency = 330;
                else if (note.pitch === 'pitch-F') frequency = 350;
                else if (note.pitch === 'pitch-Fis') frequency = 370;
                else if (note.pitch === 'pitch-G') frequency = 392;
                else if (note.pitch === 'pitch-Gis') frequency = 415;
                else if (note.pitch === 'pitch-A') frequency = 440;
                else if (note.pitch === 'pitch-B') frequency = 466;
                else if (note.pitch === 'pitch-H') frequency = 494;
                else if (note.pitch === 'pitch-C2') frequency = 523;
                else if (note.pitch === 'pitch-Cis2') frequency = 554;
                else if (note.pitch === 'pitch-D2') frequency = 587;
                else if (note.pitch === 'pitch-Es2') frequency = 622;
                else if (note.pitch === 'pitch-E2') frequency = 659;
                else if (note.pitch === 'pitch-F2') frequency = 698;
                else if (note.pitch === 'pitch-Fis2') frequency = 740;
                else if (note.pitch === 'pitch-G2') frequency = 784;
                else if (note.pitch === 'pitch-Gis2') frequency = 830;
                else if (note.pitch === 'pitch-A2') frequency = 880;
                else if (note.pitch === 'pitch-B2') frequency = 932;
                else if (note.pitch === 'pitch-H2') frequency = 988;
                else if (note.pitch === 'pitch-C3') frequency = 1046;
                else if (note.pitch === 'pitch-Cis3') frequency = 1108;
                else frequency = 0;

                if(note.type === 'rest')
                    frequency = 20000; // human can hear to 20kHz

                metronomeCallback.playSound(frequency, duration)
                metronomeContext.onChangeNote(currentNote)

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
                if (currentNote < notes.length) 
                    metronomeCallback.playMetronome();
                else {
                    setIsPlaying(false);
                    metronomeContext.onPlayMetronome(false)
                    clearInterval(timerId);
                }
            }, intervalMetronome);

            timer = setTimeout(() => {
                if (isPlaying) playSound();
            }, intervalMetronome);
        }

        return () => {
            clearInterval(timerId);
            clearTimeout(timer);
            clearTimeout(playSound2TimeoutIdRef.current);
        };
    }, [bpm, isPlaying, notes]); // ignore missing dependencies
    
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

export default React.memo(FormRate);