import React, { useState } from "react";

const MetronomeContext = React.createContext({
  currentNote: 0,
  isPlaying: false,
  setCurrentNote: () => {}, 
  onChangeNote: () => {},
  onPlayMetronome: () => {}
})

const MetronomeProvider = (props) => {
  const [metronomeNote, setMetronomeNote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const changeNoteHandler = value => setMetronomeNote(value);
  const metronomeHandler = value => setIsPlaying(value);
  const setCurrentNoteHandler = value => setMetronomeNote(value);

  const metronomeContextValue = {
    currentNote: metronomeNote,
    isPlaying: isPlaying,
    setCurrentNote: setCurrentNoteHandler, 
    onChangeNote: changeNoteHandler,
    onPlayMetronome: metronomeHandler,
  };

  return (
    <MetronomeContext.Provider value={metronomeContextValue}>
      {props.children}
    </MetronomeContext.Provider>
  );
}

export { MetronomeContext, MetronomeProvider };
