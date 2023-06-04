

import './GenericSettings.css';

const GenericSettings = props => {
    const enteredKeyHandler = event =>
    {
        props.onSetKey({
            id: event.target.value,
            accidental: parseInt(event.target.value)    
        })
    }

    return (
        <div className='settings'>
            <div className='settings_container'>
                Key
                <select id='key-options' onChange={enteredKeyHandler}>
                    <option value='0'>C-dur</option>
                    <option value='1'>G-dur</option>
                    <option value='2'>D-dur</option>
                    <option value='3'>A-dur</option>
                    <option value='4'>F-dur</option>
                    <option value='5'>B-dur</option>
                    <option value='6'>Es-dur</option>
                </select>
            </div>

            <form className='settings-rate'>
                <input type='number' min='80' max='160' step='1' name='bpm'></input>
                <label htmlFor='bpm'>bpm</label>
                <button type='submit' className='play-rate'>Play</button>
            </form>
        </div>
    )
}

export default GenericSettings;