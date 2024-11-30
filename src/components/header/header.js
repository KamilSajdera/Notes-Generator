import './header.css';
import NotesToolbar from './NotesToolbar';

export default function Header({onAddNote, onSticky}) { 
    return <header className='header'>
        <h1>Sheet Music Generator</h1>
        <NotesToolbar onAddNote={onAddNote} onSticky={onSticky}/>
    </header>
}