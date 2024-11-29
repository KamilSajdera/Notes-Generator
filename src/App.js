import React, { useCallback, useEffect, useState } from "react";

import NotesWrapper from "./components/NotesWrapper";
import SettingsWrapper from "./components/SettingsWrapper";
import GenericSettings from "./components/GenericSettings";

import NotesContext from "./store/notes-context";
import { MetronomeProvider } from "./store/metronome-context";

import "./App.css";
import Header from "./components/header/header";

function App() {
  const [arrayNotes, setArrayNotes] = useState([]);
  const [noteKey, setNoteKey] = useState();
  const [currentLatency, setCurrentLatency] = useState();
  const [isAvailable, setIsAvailable] = useState(true);

  const addNoteHandler = (enteredNote) => {
    setArrayNotes((prevNote) => {
      return [...prevNote, enteredNote];
    });
  };

  const setKeyHandler = useCallback((key) => {
    setNoteKey(key);
  }, []);
  const currentLatencyHandler = (value) => setCurrentLatency(value);

  const removeNoteHandler = () => {
    setArrayNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.pop();
      return updatedNotes;
    });
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 879) setIsAvailable(false);
      else setIsAvailable(true);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes: arrayNotes,
        notesKey: noteKey,
        currentLatency: currentLatency,
        onRemoveNote: removeNoteHandler,
      }}
    >
      <div className="container">
        {isAvailable ? (
          <MetronomeProvider>
            <Header />
            <GenericSettings onSetKey={setKeyHandler} />
            <div className="generator-elements">
              <NotesWrapper onCurrentLatency={currentLatencyHandler} />
              <SettingsWrapper onAddNote={addNoteHandler} />
            </div>
          </MetronomeProvider>
        ) : (
          <p style={{ paddingTop: 70, marginInline: "auto" }}>
            You cannot use this app in this resolution :(
          </p>
        )}
      </div>
    </NotesContext.Provider>
  );
}

export default App;
