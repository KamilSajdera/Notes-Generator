import { useState } from "react";

import "./metronome-form.css";

export default function MetronomeForm() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="toolbar-row" style={{ marginTop: "10px" }}>
      <h3>Metronome</h3>
      <form className="metronome-form">
        <input type="number" min="60" max="160" step="1" name="bpm" required />
        <label htmlFor="bpm">bpm</label>
        <button type="submit" className={isPlaying ? "playing" : ""}>
          {isPlaying ? "Stop" : "Play"}
        </button>
      </form>
    </div>
  );
}
