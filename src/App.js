import React, { useState } from "react";

import NotesWrapper from "./components/NotesWrapper";
import SettingsWrapper from './components/SettingsWrapper';
import GenericSettings from "./components/GenericSettings";
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

  const setKeyHandler = key => {
    setNoteKey(key)
  }

  const currentLatencyHandler = value => {
    setCurrentLatency(value)
  }

  const removeNoteHandler = () => {
    setArrayNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.pop();
      return updatedNotes;
    })
  }

  return (
    <div className='container'>
      <header className="header">
        <p>Notes generator</p>
      </header>
      <GenericSettings onSetKey={setKeyHandler} />
      <div className='generator-elements'>
          <NotesWrapper
          notes={arrayNotes} 
          notesKey={noteKey} 
          onCurrentLatency={currentLatencyHandler} />
          
          <SettingsWrapper 
          onAddNote={addNoteHandler} 
          onCurrentLatency={currentLatency} 
          onRemoveNote={removeNoteHandler} />
      </div>
      
    </div>
  )
}

export default App;
