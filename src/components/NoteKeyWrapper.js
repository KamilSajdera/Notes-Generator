import React, { useState, useEffect } from 'react';
import './NoteKeyWrapper.css';

const NoteKeyWrapper = (props) => {
  const [keyElements, setKeyElements] = useState([]);
  const note = props.notesKey;

  useEffect(() => {
    const handleNotesKey = () => {
      if (note) {
        const elements = [];

        if(note.id <= 3) {
            for (let i = 0; i < note.accidental; i++) 
                elements.push(<div className="sharp" key={i}>#</div>);
        }
        else {
            for (let i = 0; i < note.accidental-3; i++) 
                elements.push(<div className="bemol" key={i}>b</div>);
        }
        setKeyElements(elements);
      }
    };

    handleNotesKey();
  }, [note]);

  return (
    <div className="note-key-wrapper">
        {keyElements}
    </div>
  )
};

export default NoteKeyWrapper;
