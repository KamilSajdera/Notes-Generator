import React, { useState } from "react";

import NotesWrapper from "./components/NotesWrapper";
import SettingsWrapper from './components/SettingsWrapper';
import GenericSettings from "./components/GenericSettings";

import NotesContext from "./store/notes-context";
import { MetronomeProvider } from "./store/metronome-context";

import './App.css';

function App() {

  const [arrayNotes, setArrayNotes] = useState([]);
  const [noteKey, setNoteKey] = useState();
  const [currentLatency, setCurrentLatency] = useState();

  const addNoteHandler = enteredNote => {
    setArrayNotes((prevNote) => {
      return [...prevNote, enteredNote]
     })
  }

  const setKeyHandler = key => setNoteKey(key);
  const currentLatencyHandler = value => setCurrentLatency(value);

  const removeNoteHandler = () => {
    setArrayNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.pop();
      return updatedNotes;
    })
  }

  return (
    <NotesContext.Provider value={{
      notes: arrayNotes, 
      notesKey: noteKey, 
      currentLatency: currentLatency,
      onRemoveNote: removeNoteHandler
      }}>
      <div className='container'>
          <header className="header">
            <p>Notes generator</p>
          </header>
          <MetronomeProvider>
            <GenericSettings onSetKey={setKeyHandler}/>
            <div className='generator-elements'>
              <NotesWrapper onCurrentLatency={currentLatencyHandler} />
              <SettingsWrapper onAddNote={addNoteHandler} />     
            </div>  
          </MetronomeProvider>
      </div>
    </NotesContext.Provider>
  )
}

export default App;
