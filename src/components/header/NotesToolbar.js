import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./NotesToolbar.css";

import ErrorMessage from "../ErrorMessage";

import KeyOptions from "./key-options";
import NotesValue from "./notes-value";
import SoundChoice from "./sound-choice";
import TypeAndOctave from "./type-and-octave-form";
import MetronomeForm from "./metronome-form";
import RemoveNote from "./remove-note";

export default function NotesToolbar() {
  const [isSticky, setIsSticky] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (noteDetails) => {};

  const errorMessages = Object.entries(errors)
    .map(([_, error]) => error.message)
    .join("\n");

  return (
    <section className={`notes-toolbar${isSticky ? " sticky" : ""}`}>
      {errorMessages && <ErrorMessage>{errorMessages}</ErrorMessage>}
      <div className="next-note-wrapper">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TypeAndOctave register={register} />
          <SoundChoice register={register} />
          <NotesValue register={register} />
          <button className="button-add-note" type="submit">
            Add note
          </button>
        </form>
      </div>
      <div className="helper-functions">
        <KeyOptions />
        <MetronomeForm />
        <RemoveNote />
      </div>
    </section>
  );
}
