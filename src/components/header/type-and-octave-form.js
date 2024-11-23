

export default function TypeAndOctave() {
  return (
    <>
      <div className="toolbar-row">
        <h3>Type</h3>
        <div className="toolbar-option">
          <input type="radio" name="note-type" value="sound" id="sound" />
          <label htmlFor="sound" style={{ fontSize: "20px" }}>
            Note
          </label>
        </div>
        <div className="toolbar-option">
          <input type="radio" name="note-type" value="rest" id="rest" />
          <label htmlFor="rest" style={{ fontSize: "20px" }}>
            Rest
          </label>
        </div>
      </div>
      <div className="toolbar-row">
        <h3>Octave</h3>
        <div className="toolbar-option">
          <input type="radio" name="octave" value="1" id="first_octave" />
          <label htmlFor="first_octave" style={{ fontSize: "20px" }}>
            First
          </label>
        </div>
        <div className="toolbar-option">
          <input type="radio" name="octave" value="2" id="second_octave" />
          <label htmlFor="second_octave" style={{ fontSize: "20px" }}>
            Second
          </label>
        </div>
      </div>
    </>
  );
}
