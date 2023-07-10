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
                else delay = 0.49;

                const intervalNote = (60 / bpm) * 999 * delay;
                
                if(note.type === 'sound')
                    metronomeCallback.playSound(note.pitch.replace('-', ''))

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