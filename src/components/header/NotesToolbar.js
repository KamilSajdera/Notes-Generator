import { useEffect, useState } from "react";
import KeyOptions from "./key-options";
import NotesValue from "./notes-value";
import "./NotesToolbar.css";
import SoundChoice from "./sound-choice";
import TypeAndOctave from "./type-and-octave-form";
import MetronomeForm from "./metronome-form";

export default function NotesToolbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const shouldBeSticky = window.scrollY > 80;

      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  return (
    <section className={`notes-toolbar${isSticky ? " sticky" : ""}`}>
      <div className="next-note-wrapper">
        <form className="form">
          <TypeAndOctave />
          <SoundChoice />
          <NotesValue />
          <button className="button-add-note" type="submit">
            Add note
          </button>
        </form>
      </div>
      <div className="helper-functions">
        <KeyOptions />
        <MetronomeForm />
      </div>
    </section>
  );
}
