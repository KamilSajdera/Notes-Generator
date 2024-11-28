import { useContext } from "react";

import NotesContext from "../../store/notes-context";

export default function RemoveNote() {
  const ctx = useContext(NotesContext);

  const removeNoteHandler = () => {
    if (ctx.notes.length === 0) return;

    ctx.onRemoveNote();
  };
  return (
    <div className="toolbar-row">
      <button
        className={`remove-last-note ${
          ctx.notes.length > 0 ? "" : "not-allowed"
        }`}
        type="button"
        onClick={removeNoteHandler}
      >
        Remove last note
      </button>
    </div>
  );
}
