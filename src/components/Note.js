import { useContext, useEffect } from 'react';
import NotesContext from '../store/notes-context';
import { MetronomeContext } from '../store/metronome-context';
import './Note.css';

const Note = props => {
  const { notes } = useContext(NotesContext)
  const { currentNote, isPlaying } = useContext(MetronomeContext);
  const notesElement = document.querySelectorAll(".note");

  useEffect(() => {
    if (notesElement[currentNote] === undefined || !isPlaying) 
        return;

    notesElement[currentNote].classList.add('active-note');

    if (currentNote > 0) notesElement[currentNote - 1].classList.remove('active-note');
    
    if (currentNote === notes.length - 1) {
      setTimeout(() => {
        notesElement[notes.length - 1].classList.remove('active-note');
      }, 700);
    }
  }, [currentNote]);

  if (props.type === 'rest')
    return <li className={'note rest r' + props.className.substring(0, 3).trim()}>{props.children}</li>;
  else
    return <li className={'note ' + props.className}>{props.children}</li>;
}

export default Note;
