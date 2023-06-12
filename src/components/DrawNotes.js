import Note from './Note';

import './DrawNotes.css';

const DrawNotes = (props) => {

  const userNotes = props.notes;
  const notesValue = userNotes.reduce((sum, note) => sum + note.latency, 0);
  
  let firstPart = [];
  let secondPart = [];
  
  if (notesValue > 16) {

    let sum = 0;
    let reachedThreshold = false;

    for (let i = 0; i < userNotes.length; i++) {
      const note = userNotes[i];
      sum += note.latency;

      if (sum > 16 && !reachedThreshold) {
        reachedThreshold = true;
        secondPart.push(note);
      } else if (reachedThreshold) {
        secondPart.push(note);
      } else {
        firstPart.push(note);
      }

    }
  } else {
    firstPart = userNotes;
  }

  return (
    <div className="drawn-notes">
      <ul>
        {firstPart.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            className={note.class + ' ' + note.pitch}
            type={note.type}
            notesValue={notesValue}
          />
        ))}
      </ul>

      {notesValue > 16 && (
        <ul>
          {secondPart.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              className={note.class + ' ' + note.pitch}
              type={note.type}
              notesValue={notesValue}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrawNotes;