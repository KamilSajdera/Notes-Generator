import { useContext, useState } from 'react';

import ErrorModal from './ErrorModal';
import ValueOptions from './ValueOptions';
import NotesContext from '../store/notes-context';

import './SettingsWrapper.css';

const SettingsWrapper = props => {

    const [type, setType] = useState('');
    const [pitch, setPitch] = useState('none');
    const [value, setValue] = useState('none');
    const [latency, setLatency] = useState('');

    const [isPause, setIsPause] = useState(false);
    const [error, setError] = useState({})

    const ctx = useContext(NotesContext)

    const noteTypeHandler = event => {
        setType(event.target.value);

        if(event.target.value === 'rest')
            setIsPause(true)      
        else 
            setIsPause(false)
    }

    const pitchItemsHandler = event => setPitch(event.target.value);

    const valueOptionsHandler = note => {
        setValue(note.value);
        setLatency(note.latency);
    }
 
    const sendNoteDetails = event => {
        event.preventDefault();

        if(type.trim() === '') {
            setError({
                title: "Select the right type!",
                message: "You have to choose whether your next note should be a note or a rest."
            });

            return;
        }

        if(pitch.trim() === 'none' && !isPause) {
            setError({
                title: "Select the right pitch!",
                message: "You need to choose the right pitch."
            });

            return; 
        }

        if(value.trim() === 'none') {
            setError({
                title: "Select the right value!",
                message: "You need to choose the right value."
            });

            return; 
        }

        const noteDetails = {
            id: Math.random().toString(),
            type: type,
            pitch: "pitch-"+pitch,
            class: value,
            latency: latency
        }

        props.onAddNote(noteDetails)
    }

    const activeHandler = isActive => setError(isActive);
    
    const removeNoteHandler = () => {
        if(ctx.notes.length === 0)
            return;
    
        ctx.onRemoveNote();
    }

    return (
        <div className='settings-wrapper'>
            { error.title && error.message && <ErrorModal title={error.title} message={error.message} isActive={activeHandler}/>}
            <h2>Next note</h2>
            <form onSubmit={sendNoteDetails}>
            <fieldset>
                <legend>Select a type</legend>
                    <div className='radios'>
                        <input type="radio" name="note-type" value="sound" onChange={noteTypeHandler}/>
                        <label htmlFor="sound">Note</label>
                    </div>
                    <div className='radios'>
                        <input type="radio" name="note-type" value="rest" onChange={noteTypeHandler}/>
                        <label htmlFor="rest">Rest</label>
                    </div>
            </fieldset>

            <div className='settings-properties'>
                <div className='property-item'>
                <h3>Choose a pitch</h3>

                 
                <select id="pitch-items" onChange={pitchItemsHandler} disabled={ isPause ? true : false}>
                    <option value="none">Select</option>
                    <option value="C">C</option>
                    <option value="Cis">C#</option>
                    <option value="D">D</option>
                    <option value="Es">Es</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="Fis">F#</option>
                    <option value="G">G</option>
                    <option value="Gis">G#</option>
                    <option value="A">A</option>
                    <option value="B">b</option>
                    <option value="H">H</option>
                    <option value="C2">C2</option>
                    <option value="Cis2">C#2</option>
                    <option value="D2">D2</option>
                    <option value="Es2">Es2</option>
                    <option value="E2">E2</option>
                    <option value="F2">F2</option>
                    <option value="Fis2">F#2</option>
                    <option value="G2">G2</option>
                    <option value="Gis2">G#2</option>
                    <option value="A2">A2</option>
                    <option value="B2">b2</option>
                    <option value="H2">H2</option>
                    <option value="C3">C3</option>
                    <option value="Cis3">C#3</option>

                </select>
                </div>

                <div className='property-item'>
                <h3>Choose a value</h3>
                <ValueOptions onValueOptions={valueOptionsHandler}/>
                </div>
            </div>

            <button className='set-note'>Add Note</button>
            </form>

            <button className={`remove-note ${ ctx.notes.length > 0 ? '' : 'not-allowed'}`} onClick={removeNoteHandler}>Remove Last Note</button>
        </div>
    )
}

export default SettingsWrapper;