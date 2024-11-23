import "./NotesToolbar.css";
import TypeAndOctave from "./type-and-octave-form";

export default function NotesToolbar() {
  return (
    <section className="notes-toolbar">
      <div className="next-note-wrapper">
        <form className="form">
          <TypeAndOctave />
        </form>
      </div>
      <div className="helper-functions"></div>
    </section>
  );
}
