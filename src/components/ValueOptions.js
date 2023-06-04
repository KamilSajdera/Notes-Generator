import { useEffect, useState } from 'react';
import './SettingsWrapper.css';

const ValueOptions = props =>
{
    const currentLatency = props.onCurrentLatency;

    const [isDisabled, setIsDisabled] = useState(true)

    const valueItemsHandler = event => {
         props.onValueOptions({
            value: event.target.value,
            latency: parseInt(event.target.value.substring(1))
        })
    }

    useEffect(() => {
        if(currentLatency===32)
            setIsDisabled(false)
        else
            setIsDisabled(true)
    }, [currentLatency])

    return (
        <select id="value-items" onChange={valueItemsHandler}>
            <option value="none">Select</option>
            <option value="n16" 
                disabled={((currentLatency >= 1 && currentLatency < 16) || currentLatency > 16) && isDisabled}>
                Semibreve [4/4]
            </option>
            <option value="n8" 
                disabled={((currentLatency > 8 && currentLatency < 16) || currentLatency > 24) && isDisabled}>
                    Minim [2/4]
            </option>
            <option value="n4" 
                disabled={((currentLatency > 12 && currentLatency < 16) || currentLatency > 28) && isDisabled}>
                Crotchet [1/4]
            </option>
            <option value="n2" 
                disabled={((currentLatency > 14 && currentLatency < 16) || currentLatency > 30) && isDisabled}>
                Quaver [1/8]
            </option>
        </select>
    )   
}

export default ValueOptions;