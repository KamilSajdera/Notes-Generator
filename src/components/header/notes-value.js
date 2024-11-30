import { useContext, useEffect, useRef, useState } from "react";

import NotesContext from "../../store/notes-context";

export default function NotesValue({ register }) {
  const { currentLatency } = useContext(NotesContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const valuesRef = useRef();

  const valueArray = [
    {
      id: 1,
      name: "Semibreve",
      division: "4/4",
      value: "n16",
      disabled:
        ((currentLatency >= 1 && currentLatency < 16) || currentLatency > 16) &&
        isDisabled,
    },
    {
      id: 2,
      name: "Minim",
      division: "2/4",
      value: "n8",
      disabled:
        ((currentLatency > 8 && currentLatency < 16) || currentLatency > 24) &&
        isDisabled,
    },
    {
      id: 3,
      name: "Crotchet",
      division: "1/4",
      value: "n4",
      disabled:
        ((currentLatency > 12 && currentLatency < 16) || currentLatency > 28) &&
        isDisabled,
    },
    {
      id: 4,
      name: "Quaver",
      division: "1/8",
      value: "n2",
      disabled:
        ((currentLatency > 14 && currentLatency < 16) || currentLatency > 30) &&
        isDisabled,
    },
  ];

  useEffect(() => {
    if (currentLatency === 32) setIsDisabled(false);
    else setIsDisabled(true);

    const valueItems = valuesRef.current.querySelectorAll(".value-radio");

    valueItems.forEach((item, index) => {
      if (item.checked && item.disabled) {
        let nextIndex = index + 1;
        while (
          nextIndex < valueItems.length &&
          valueItems[nextIndex].disabled
        ) {
          nextIndex++;
        }

        if (nextIndex < valueItems.length) {
          item.checked = false;
          valueItems[nextIndex].checked = true;
        }
      }
    });
  }, [currentLatency, isDisabled]);

  return (
    <div
      className="toolbar-row"
      style={{ marginTop: "10px", width: "100%", columnGap: "20px" }}
      ref={valuesRef}
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
            {...register("value", { required: "Value of note is required." })}
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
