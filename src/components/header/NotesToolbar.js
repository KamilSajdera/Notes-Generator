import "./NotesToolbar.css";
import SoundChoice from "./sound-choice";
import TypeAndOctave from "./type-and-octave-form";

export default function NotesToolbar() {
  return (
    <section className="notes-toolbar">
      <div className="next-note-wrapper">
        <form className="form">
          <TypeAndOctave />
          <SoundChoice />
        </form>
      </div>
      <div className="helper-functions"></div>
    </section>
  );
}
