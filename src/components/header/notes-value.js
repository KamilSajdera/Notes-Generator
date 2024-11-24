import { useState } from "react";

export default function NotesValue() {
  const [valueArray, setValueArray] = useState([
    {
      id: 1,
      name: "Semibreve",
      division: "4/4",
      value: "n16",
      disabled: false,
    },
    {
      id: 2,
      name: "Minim",
      division: "2/4",
      value: "n8",
      disabled: false,
    },
    {
      id: 3,
      name: "Crotchet",
      division: "1/4",
      value: "n4",
      disabled: false,
    },
    {
      id: 4,
      name: "Quaver",
      division: "1/8",
      value: "n2",
      disabled: false,
    },
  ]);
  
  return (
    <div
      className="toolbar-row"
      style={{ marginTop: "10px", width: "100%", columnGap: "20px" }}
    >
      <h3>Value</h3>
      {valueArray.map((value) => (
        <div
          className={`note-value ${value.disabled ? "disabled" : ""}`}
          key={value.id}
        >
          <input
            type="radio"
            name="value"
            className="value-radio"
            value={value.value}
            id={value.name}
            disabled={value.disabled}
          />
          <label htmlFor={value.name} className="value-label">
            {value.name}{" "}
            <span className="note-division">({value.division})</span>
          </label>
        </div>
      ))}
    </div>
  );
}
