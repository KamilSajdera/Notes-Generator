export default function NotesValue() {
  return (
    <div className="toolbar-row" style={{ marginTop: "10px", width: "100%", columnGap: "20px" }} >
      <h3>Value</h3>
      <div className="note-value">
        Semibreve <span className="note-division">(4/4)</span>
      </div>
      <div className="note-value">
        Minim <span className="note-division">(2/4)</span>
      </div>
      <div className="note-value">
        Crotchet <span className="note-division">(1/4)</span>
      </div>
      <div className="note-value">
        Quaver <span className="note-division">(1/8)</span>
      </div>
    </div>
  );
}
