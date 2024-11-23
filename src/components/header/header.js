import './header.css';
import NotesToolbar from './NotesToolbar';

export default function Header() { 
    return <header className='header'>
        <h1>Sheet Music Generator</h1>
        <NotesToolbar />
    </header>
}