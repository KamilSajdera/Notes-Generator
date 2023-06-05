
import './Note.css';

const Note = props => 
{

    if(props.type === 'rest')
        return <li className={'rest r' + props.className.substring(0, 3).trim()}>{props.children}</li>
  
    else 
        return <li className={'note ' + props.className}>{props.children}</li>
      
}
        

export default Note;