import { useContext, useRef, useEffect, useCallback } from "react";

import "./key-options.css";
import NotesContext from "../../store/notes-context";

export default function KeyOptions() {
  const ctx = useContext(NotesContext);

  const customSelectRef = useRef();
  const selectButtonRef = useRef();
  const selectedValueRef = useRef();
  const optionListRef = useRef();

  const handleOptionClick = useCallback((e) => {
    const option = e.target.closest("li");
    if (!option) return;

    selectedValueRef.current.textContent =
      option.querySelector("label").textContent;
    customSelectRef.current.classList.remove("active");
    selectButtonRef.current.setAttribute("aria-expanded", "false");

    const value = option.querySelector("input").value;
    ctx.onSetKey({
      id: value,
      accidental: parseInt(value),
    });
  }, [ctx]);

  const handleSelectClick = () => {
    const customSelect = customSelectRef.current;
    const selectButton = selectButtonRef.current;

    customSelect.classList.toggle("active");
    selectButton.setAttribute(
      "aria-expanded",
      selectButton.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  };

  useEffect(() => {
    const selectButton = selectButtonRef.current;
    const optionList = optionListRef.current;

    selectButton.addEventListener("click", handleSelectClick);
    optionList.addEventListener("click", handleOptionClick);

    return () => {
      selectButton.removeEventListener("click", handleSelectClick);
      optionList.removeEventListener("click", handleOptionClick);
    };
  }, [handleOptionClick]);

  return (
    <div className="custom-select" ref={customSelectRef}>
      <h3>Key</h3>
      <button
        type="button"
        className="select-button"
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="select-dropdown"
        ref={selectButtonRef}
      >
        <span className="selected-value" ref={selectedValueRef}>
          <span style={{ color: "#717171" }}>None selected</span>
        </span>
        <span className="arrow"></span>
      </button>
      <ul
        className="select-dropdown"
        role="listbox"
        id="select-dropdown"
        ref={optionListRef}
      >
        <li role="option" aria-selected>
          <input type="radio" id="cdur" name="key_option" value="0" />
          <label htmlFor="cdur">C-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="gdur" name="key_option" value="1" />
          <label htmlFor="gdur">G-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="ddur" name="key_option" value="2" />
          <label htmlFor="ddur">D-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="adur" name="key_option" value="3" />
          <label htmlFor="adur">A-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="fdur" name="key_option" value="4" />
          <label htmlFor="fdur">F-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="bdur" name="key_option" value="5" />
          <label htmlFor="bdur">B-dur</label>
        </li>
        <li role="option" aria-selected>
          <input type="radio" id="esdur" name="key_option" value="6" />
          <label htmlFor="esdur">Es-dur</label>
        </li>
      </ul>
    </div>
  );
}
