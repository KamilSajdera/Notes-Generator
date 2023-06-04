import React, { useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import './NotesWrapper.css'
import NotesStaff from './NotesStaff';
import printer from  '../img/printer.png'
 
const NotesWrapper = props => {
  const arrayNotes = props.notes || [];
  const latencyLimit = 32;

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print your notes"
  });

  const renderNotesStaffs = () => {
    let currentLatency = 0;
    let currentNotes = [];
    const notesStaffs = [];

    for (let i = 0; i < arrayNotes.length; i++) {
      const note = arrayNotes[i];

      if (currentLatency + note.latency > latencyLimit) {
        notesStaffs.push(
          <NotesStaff key={i} notes={currentNotes} notesKey={props.notesKey}/>
        );
        currentNotes = [];
        currentLatency = 0;
      }

      currentNotes.push(note);
      currentLatency += note.latency
      props.onCurrentLatency(currentLatency);
    }

  
    // Dodaj ostatni NotesStaff, jeśli istnieją nuty
    if (currentNotes.length > 0) {
      notesStaffs.push(
        <NotesStaff key={arrayNotes.length} notes={currentNotes} notesKey={props.notesKey}/>
      );
    }

    return notesStaffs;
  };

  return (
    <React.Fragment>
    <div className='notes-wrapper' ref={componentRef}>
      <header>
        <input className='notes-title' placeholder='Enter a title here' />
      </header>
      <ul className='staff-items'>
        {renderNotesStaffs()}
      </ul>
    </div>

  <button className='print' onClick={handlePrint}>
    <img src={printer} alt='printer' />
    Drukuj
  </button>
  </React.Fragment>
  );
};

export default NotesWrapper;