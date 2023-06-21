import FormRate from './FormRate';
import './GenericSettings.css';

const GenericSettings = props => {

    const enteredKeyHandler = event => {
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

            <FormRate />
        </div>
    )
}

export default GenericSettings;