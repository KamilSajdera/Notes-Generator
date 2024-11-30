import React, { useContext, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import "./NotesWrapper.css";
import NotesStaff from "./NotesStaff";
import NotesContext from "../store/notes-context";
import printer from "../assets/img/printer.png";

const NotesWrapper = ({ isSticky, onCurrentLatency }) => {
  const { notes } = useContext(NotesContext);
  const latencyLimit = 32;
  let currentLatency = 0;

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Print your notes",
  });

  const renderNotesStaffs = () => {
    let currentNotes = [];
    const notesStaffs = [];

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];

      if (currentLatency + note.latency > latencyLimit) {
        notesStaffs.push(<NotesStaff key={i} notes={currentNotes} />);
        currentNotes = [];
        currentLatency = 0;
      }

      currentNotes.push(note);
      currentLatency += note.latency;
    }

    if (currentNotes.length > 0) {
      notesStaffs.push(<NotesStaff key={notes.length} notes={currentNotes} />);
    }

    return notesStaffs;
  };

  useEffect(() => {
    let timerId = setTimeout(() => {
      onCurrentLatency(currentLatency);
    }, 0);

    return () => clearTimeout(timerId);
  }, [currentLatency, onCurrentLatency]);

  return (
    <React.Fragment>
      <div
        className="notes-wrapper"
        ref={componentRef}
        style={isSticky ? { marginTop: "317px" } : {}}
      >
        <header>
          <input className="notes-title" placeholder="Enter a title here" />
        </header>
        <ul className="staff-items">{renderNotesStaffs()}</ul>
      </div>
      <button className="print" onClick={handlePrint}>
        <img src={printer} alt="printer" />
        Print
      </button>
    </React.Fragment>
  );
};

export default NotesWrapper;
