import { useContext, useEffect, useRef, useState } from "react";

import useMetronome from "../../hooks/use-metronome";
import NotesContext from "../../store/notes-context";
import { MetronomeContext } from "../../store/metronome-context";

import "./metronome-form.css";

let currentNote = 0;

export default function MetronomeForm() {
  const { notes } = useContext(NotesContext);

  const metronomeContext = useContext(MetronomeContext);
  const metronomeCallback = useMetronome();

  const [bpm, setBpm] = useState();
  const enteredBpm = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const playSound2TimeoutIdRef = useRef();

  const startMetronomeHandler = (event) => {
    event.preventDefault();

    if (enteredBpm.current.value === "") return;

    if (!isPlaying) {
      setBpm(enteredBpm.current.value);
      setIsPlaying(true);
      metronomeContext.onPlayMetronome(true);
      currentNote = 0;
    } else {
      setIsPlaying(false);
      metronomeContext.onPlayMetronome(false);
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

        if (note.latency === 16) delay = 3.96;
        else if (note.latency === 8) delay = 1.98;
        else if (note.latency === 4) delay = 0.98;
        else delay = 0.49;

        const intervalNote = (60 / bpm) * 999 * delay;

        if (note.type === "sound")
          metronomeCallback.playSound(note.pitch.replace("-", ""));

        metronomeContext.onChangeNote(currentNote);
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
        if (currentNote < notes.length) metronomeCallback.playMetronome();
        else {
          setIsPlaying(false);
          metronomeContext.onPlayMetronome(false);
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
    }; // eslint-disable-next-line
  }, [bpm, isPlaying, notes]);

  return (
    <div className="toolbar-row" style={{ marginTop: "10px" }}>
      <h3>Metronome</h3>
      <form className="metronome-form" onSubmit={startMetronomeHandler}>
        <input
          type="number"
          min="60"
          max="160"
          step="1"
          name="bpm"
          required
          ref={enteredBpm}
        />
        <label htmlFor="bpm">bpm</label>
        <button type="submit" className={isPlaying ? "playing" : ""}>
          {isPlaying ? "Stop" : "Play"}
        </button>
      </form>
    </div>
  );
}
