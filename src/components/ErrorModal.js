import ReactDOM from 'react-dom';

import './ErrorModal.css';


const ErrorWrapper = props =>
{
    return (
    <div className='error-wrapper'>
            <div className='error-modal'>
                <h1>{props.title}</h1>
                <p>{props.message}</p>
                <button className='error__confirm' onClick={props.onConfirm}>Okay</button>
            </div>
    </div>
    )
}

const ErrorModal = props => {
    
    const confirmHandler = () =>
    {
        props.isActive('')
    }
    

    return ReactDOM.createPortal(<ErrorWrapper title={props.title} message={props.message} onConfirm={confirmHandler} />, document.getElementById("error-root"))
}

export default ErrorModal