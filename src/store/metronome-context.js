import React, { useState } from "react";

const MetronomeContext = React.createContext({
    currentNote: 0,
    isPlaying: false,
    onChangeNote: () => {},
    onPlayMetronome: () => {}
})

const MetronomeProvider = (props) => {
    const [metronomeNote, setMetronomeNote] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const changeNoteHandler = (value) => {
      setMetronomeNote(value);
    };
  
    const metronomeHandler = (value) => {
      setIsPlaying(value);
    };
  
    const metronomeContextValue = {
      currentNote: metronomeNote,
      isPlaying: isPlaying,
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
