import { useContext, useState } from 'react';

import ValueOptions from './ValueOptions';
import PitchOptions from './PitchOptions';
import ErrorModal from './ErrorModal';
import NotesContext from '../store/notes-context';

import './SettingsWrapper.css';

const SettingsWrapper = props => {

    const [enteredNoteProps, setEnteredNoteProps] = useState({
        type: '',
        pitch: 'pitch-none',
        class: 'none',
        latency: ''
    }) 

    const [isPause, setIsPause] = useState(false);
    const [error, setError] = useState({})

    const ctx = useContext(NotesContext)

    const noteTypeHandler = event => {
        setEnteredNoteProps((prev) => {
            return {...prev, 
                type: event.target.value}
        })

        if(event.target.value === 'rest')
            setIsPause(true)      
        else 
            setIsPause(false)
    }

    const pitchOptions = value => {
        setEnteredNoteProps((prev) => {
            return {...prev, 
                pitch: value}
        })
    }

    const valueOptions = note => {
        setEnteredNoteProps((prev) => {
            return {...prev, 
                class: note.value,
                latency: note.latency
            }
        })
    }
 
    const sendNoteDetails = event => {
        event.preventDefault();

        if(enteredNoteProps.type.trim() === '') {
            setError({
                title: "Select the right type!",
                message: "You have to choose whether your next note should be a note or a rest."
            });

            return;
        }

        if(enteredNoteProps.pitch.trim() === 'pitch-none' && !isPause) {
            setError({
                title: "Select the right pitch!",
                message: "You have to choose the right pitch."
            });

            return; 
        }

        if(enteredNoteProps.class.trim() === 'none') {
            setError({
                title: "Select the right value!",
                message: "You have to choose the right value."
            });

            return; 
        }

        const noteDetails = {
            id: Math.random().toString(),
            ...enteredNoteProps
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
                <PitchOptions onPitchOptions={pitchOptions} disabled={isPause}/>                
                <ValueOptions onValueOptions={valueOptions} />    
            </div>

            <button className='set-note'>Add Note</button>
            </form>

            <button className={`remove-note ${ ctx.notes.length > 0 ? '' : 'not-allowed'}`} onClick={removeNoteHandler}>Remove Last Note</button>
        </div>
    )
}

export default SettingsWrapper;