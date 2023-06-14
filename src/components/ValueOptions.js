import { useEffect, useState, useMemo, useContext } from 'react';
import NotesContext from '../store/notes-context';
import './SettingsWrapper.css';

const ValueOptions = (props) => {

    const currentLatency = useContext(NotesContext).currentLatency

    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedOption, setSelectedOption] = useState('none');

     
    const options = useMemo(
        () => [
            { value: 'none', label: 'Select' },
            { value: 'n16',
              label: 'Semibreve [4/4]',
              disabled: ((currentLatency >= 1 && currentLatency < 16) || currentLatency > 16) && isDisabled,
            },
            { value: 'n8',
              label: 'Minim [2/4]',
              disabled: ((currentLatency > 8 && currentLatency < 16) || currentLatency > 24) && isDisabled,
            },
            { value: 'n4',
              label: 'Crotchet [1/4]',
              disabled: ((currentLatency > 12 && currentLatency < 16) || currentLatency > 28) && isDisabled,
            },
            { value: 'n2',
              label: 'Quaver [1/8]',
              disabled: ((currentLatency > 14 && currentLatency < 16) || currentLatency > 30) && isDisabled,
            },
        ],
        [currentLatency, isDisabled]
    );


    // if latency of selected note is bigger (option is disabled) than needed,
    // find next possible option (value of note)
    useEffect(() => {
        const selectedOptionIndex = options.findIndex((option) => option.value === selectedOption);

        if (selectedOptionIndex !== -1 && options[selectedOptionIndex].disabled) {
            const nextAvailableOption = options.find(
                (option, index) => index > selectedOptionIndex && !option.disabled
            );

            if (nextAvailableOption) {
                setSelectedOption(nextAvailableOption.value);
                
                props.onValueOptions({
                    value: nextAvailableOption.value,
                    latency: parseInt(nextAvailableOption.value.substring(1))
                });
            }
        }
    }, [options, selectedOption, props]);


    const valueItemsHandler = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        const selectedOption = options.find((option) => option.value === selectedValue);
        const selectedLatency = parseInt(selectedOption.value.substring(1));

        props.onValueOptions({
            value: selectedValue,
            latency: selectedLatency,
        });
    };


    useEffect(() => {
        if(currentLatency === 32)
            setIsDisabled(false)
        else 
            setIsDisabled(true)
    }, [currentLatency])

    return (
        <div className='property-item'>
        <h3>Choose a value</h3>
            <select id="value-items" onChange={valueItemsHandler} value={selectedOption}>
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ValueOptions;
