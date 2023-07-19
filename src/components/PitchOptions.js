import React, { useEffect, useRef, useState } from "react";
import "./SettingsWrapper.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCaretDown);

const PitchOptions = ({ onPitchOptions }) => {
  const listOfItemsClickRef = useRef(null);
  const listOfItemsRef = useRef(null);
  const [pitch, setPitch] = useState("none");

  useEffect(() => {
    const listOfItemsClick = listOfItemsClickRef.current;
    const listOfItems = listOfItemsRef.current;

    const showListOfItems = () => {
      listOfItems.classList.add("show_list");
    };

    const selectOptionHandler = (e) => {
      listOfItems.classList.remove("show_list");
      listOfItemsClick.innerHTML = e.target.innerText;
      setPitch(`pitch-${e.target.innerText}`);
    };

    listOfItemsClick.addEventListener("click", showListOfItems);

    const listItemElements = listOfItems.querySelectorAll(
      ".option-container__listItem"
    );

    listItemElements.forEach((item) => {
      item.addEventListener("click", selectOptionHandler);
    });

    listOfItems.addEventListener("mouseleave", () => {
      listOfItems.classList.remove("show_list");
    });

    return () => {
      listOfItemsClick.removeEventListener("click", showListOfItems);
      listItemElements.forEach((item) => {
        item.removeEventListener("click", selectOptionHandler);
      });
    };
  }, []); /// ignore missing dependencies

  useEffect(() => {
    onPitchOptions(pitch);
  }, [pitch]);

  return (
    <div className="property-item">
      <h3>Choose a pitch</h3>

      <div className="option-container">
        <div
          className="option-container__enteredOption"
          ref={listOfItemsClickRef}
        >
          Select
        </div>
        <div className="option-container__arrow">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <ul className="option-container__list" ref={listOfItemsRef}>
          <li className="option-container__listItem">C</li>
          <li className="option-container__listItem">Cis</li>
          <li className="option-container__listItem">D</li>
          <li className="option-container__listItem">Es</li>
          <li className="option-container__listItem">E</li>
          <li className="option-container__listItem">F</li>
          <li className="option-container__listItem">Fis</li>
          <li className="option-container__listItem">G</li>
          <li className="option-container__listItem">Gis</li>
          <li className="option-container__listItem">A</li>
          <li className="option-container__listItem">b</li>
          <li className="option-container__listItem">H</li>
          <li className="option-container__listItem">C2</li>
          <li className="option-container__listItem">Cis2</li>
          <li className="option-container__listItem">D2</li>
          <li className="option-container__listItem">Es2</li>
          <li className="option-container__listItem">E2</li>
          <li className="option-container__listItem">F2</li>
          <li className="option-container__listItem">Fis2</li>
          <li className="option-container__listItem">G2</li>
          <li className="option-container__listItem">Gis2</li>
          <li className="option-container__listItem">A2</li>
          <li className="option-container__listItem">b2</li>
          <li className="option-container__listItem">H2</li>
          <li className="option-container__listItem">C3</li>
        </ul>
      </div>
    </div>
  );
};

export default PitchOptions;
