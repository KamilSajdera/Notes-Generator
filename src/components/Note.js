
import './Note.css';

const Note = props => 
{

    const noteDetailsHandler = () => {
        console.log(props.notes)
        console.log(props.id)

         // Znajdź obiekt w tablicy props.notes o pasującym props.id
         const note = props.notes.find((note) => note.id === props.id);

         if (note) {
             console.log('Id: ', note.id)
             console.log('Value:', note.value);
             console.log('Latency:', note.latency);
             console.log('Pitch:', note.pitch);
         }
    }

    if(props.type === 'sound')
        return <li className={'note ' + props.className} onClick={noteDetailsHandler}>{props.children}</li>
  
    else 
        return <li className={'rest r' + props.className}>{props.children}</li>
      
}
        

export default Note;