import React, { useState, useEffect, useContext } from 'react';

import NotesContext from '../store/notes-context';
import './NoteKeyWrapper.css';

const NoteKeyWrapper = () => {
  const [keyElements, setKeyElements] = useState([]);
  const { notesKey } = useContext(NotesContext)

  useEffect(() => {
    const handleNotesKey = () => {
      if (notesKey) {
        const elements = [];

        if(notesKey.id <= 3) {
            for (let i = 0; i < notesKey.accidental; i++) 
                elements.push(<div className="sharp" key={i}>#</div>);
        }
        else {
            for (let i = 0; i < notesKey.accidental-3; i++) 
                elements.push(<div className="bemol" key={i}>b</div>);
        }
        setKeyElements(elements);
      }
    };

    handleNotesKey();
  }, [notesKey]);

  return (
    <div className="note-key-wrapper">
        {keyElements}
    </div>
  )
};

export default NoteKeyWrapper;
