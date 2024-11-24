

export default function TypeAndOctave() {
  return (
    <>
      <div className="toolbar-row">
        <h3>Type</h3>
        <div className="toolbar-option">
          <input type="radio" name="note-type" value="sound" id="sound" />
          <label htmlFor="sound" className="label-for-radio">
            Note
          </label>
        </div>
        <div className="toolbar-option">
          <input type="radio" name="note-type" value="rest" id="rest" />
          <label htmlFor="rest" className="label-for-radio"> 
            Rest
          </label>
        </div>
      </div>
      <div className="toolbar-row">
        <h3>Octave</h3>
        <div className="toolbar-option">
          <input type="radio" name="octave" value="1" id="first_octave" />
          <label htmlFor="first_octave" className="label-for-radio">
            First
          </label>
        </div>
        <div className="toolbar-option">
          <input type="radio" name="octave" value="2" id="second_octave" />
          <label htmlFor="second_octave" className="label-for-radio">
            Second
          </label>
        </div>
      </div>
    </>
  );
}
