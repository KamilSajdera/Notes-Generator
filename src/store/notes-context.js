import React from "react";

const NotesContext = React.createContext({
    notes: [],
    notesKey: '',
    currentLatency: 0,
    onRemoveNote: () => {},
    onSetKey: () => {}
})

export default NotesContext
