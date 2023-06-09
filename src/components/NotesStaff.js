import React from 'react';

import './NotesStaff.css';
import clef from '../assets/img/key.webp';
import DrawNotes from './DrawNotes';
import NoteKeyWrapper from './NoteKeyWrapper';

const NotesStaff = (props) => {

  return (
    <React.Fragment>
      <li className='staff-item'>
        <img src={clef} className='clef' alt='clef' />
        <NoteKeyWrapper />
        <DrawNotes notes={props.notes} />

        <div className='staff-item__lines'>
          <div className='staff-item__line'></div>
          <div className='staff-item__line'></div>
          <div className='staff-item__line'></div>
          <div className='staff-item__line'></div>
          <div className='staff-item__line'></div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default NotesStaff
