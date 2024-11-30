export default function SoundChoice({ register }) {
  const soundsArray = [
    { id: 1, name: "C", value: "C" },
    { id: 2, name: "C#", value: "Cis" },
    { id: 3, name: "D", value: "D" },
    { id: 4, name: "E<i>b</i>", value: "Es" },
    { id: 5, name: "E", value: "E" },
    { id: 6, name: "F", value: "F" },
    { id: 7, name: "F#", value: "Fis" },
    { id: 8, name: "G", value: "G" },
    { id: 9, name: "G#", value: "Gis" },
    { id: 10, name: "A", value: "A" },
    { id: 11, name: "B<i>b</i>", value: "b" },
    { id: 12, name: "B", value: "H" },
  ];

  return (
    <div className="toolbar-row" style={{ width: "100%", marginTop: "10px" }}>
      <h3>Pitch</h3>
      {soundsArray.map((sound) => (
        <div className="pitch" key={sound.id}>
          <input
            type="radio"
            name="pitch"
            className="pitch-radio"
            value={`pitch-${sound.value}`}
            id={sound.name}
            {...register("pitch", {required: "Pitch of note is required."})}
          />
          <label htmlFor={sound.name} className="pitch-label">
            <span dangerouslySetInnerHTML={{ __html: sound.name }} />
          </label>
        </div>
      ))}
    </div>
  );
}
