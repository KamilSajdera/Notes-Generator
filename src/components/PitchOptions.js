import React from "react";
import './SettingsWrapper.css';

const PitchOptions = props => {

    const pitchItemsHandler = event => props.onPitchOptions(`pitch-${event.target.value}`)

    return (
        <div className='property-item'>
                <h3>Choose a pitch</h3>
                 
                <select id="pitch-items" onChange={pitchItemsHandler} disabled={ props.disabled ? true : false}>
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
    )
}

export default PitchOptions;