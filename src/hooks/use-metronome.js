import { useContext } from 'react';
import NotesContext from '../store/notes-context';

import metronomeClick from "../assets/sound/metronomeClick.mp3";
import metronomeClick2 from "../assets/sound/metronomeClickon1.mp3";

import pitchC from "../assets/sound/pitch-C.mp3";
import pitchCis from "../assets/sound/pitch-Cis.mp3";
import pitchD from "../assets/sound/pitch-D.mp3";
import pitchEs from "../assets/sound/pitch-Es.mp3";
import pitchE from "../assets/sound/pitch-E.mp3";
import pitchF from "../assets/sound/pitch-F.mp3";
import pitchFis from "../assets/sound/pitch-Fis.mp3";
import pitchG from "../assets/sound/pitch-G.mp3";
import pitchGis from "../assets/sound/pitch-Gis.mp3";
import pitchA from "../assets/sound/pitch-A.mp3";
import pitchb from "../assets/sound/pitch-B.mp3";
import pitchH from "../assets/sound/pitch-H.mp3";
import pitchC2 from "../assets/sound/pitch-C2.mp3";
import pitchCis2 from "../assets/sound/pitch-Cis2.mp3";
import pitchD2 from "../assets/sound/pitch-D2.mp3";
import pitchEs2 from "../assets/sound/pitch-Es2.mp3";
import pitchE2 from "../assets/sound/pitch-E2.mp3";
import pitchF2 from "../assets/sound/pitch-F2.mp3";
import pitchFis2 from "../assets/sound/pitch-Fis2.mp3";
import pitchG2 from "../assets/sound/pitch-G2.mp3";
import pitchGis2 from "../assets/sound/pitch-Gis2.mp3";
import pitchA2 from "../assets/sound/pitch-A2.mp3";
import pitchb2 from "../assets/sound/pitch-B2.mp3";
import pitchH2 from "../assets/sound/pitch-H2.mp3";
import pitchC3 from "../assets/sound/pitch-C3.mp3";
import pitchCis3 from "../assets/sound/pitch-Cis3.mp3";

const soundMap = {
  pitchC,
  pitchCis,
  pitchD,
  pitchEs,
  pitchE,
  pitchF,
  pitchFis,
  pitchG,
  pitchGis,
  pitchA,
  pitchb,
  pitchH,
  pitchC2,
  pitchCis2,
  pitchD2,
  pitchEs2,
  pitchE2,
  pitchF2,
  pitchFis2,
  pitchG2,
  pitchGis2,
  pitchA2,
  pitchb2,
  pitchH2,
  pitchC3,
  pitchCis3,
};

const accidentalMappings = {
  1: { pitchF: "pitchFis", pitchF2: "pitchFis2" },
  2: { pitchC: "pitchCis", pitchC2: "pitchCis2", pitchC3: "pitchCis3" },
  3: { pitchG: "pitchGis", pitchG2: "pitchGis2" },
  4: { pitchH: "pitchb", pitchH2: "pitchb2"},
  5: { pitchE: "pitchEs", pitchE2: "pitchEs2"},
  6: { pitchA: "pitchGis", pitchA2: "pitchGis2"}
};
accidentalMappings[2] = { ...accidentalMappings[2], ...accidentalMappings[1] };
accidentalMappings[3] = { ...accidentalMappings[3], ...accidentalMappings[2]};
accidentalMappings[5] = { ...accidentalMappings[5], ...accidentalMappings[4]}
accidentalMappings[6] = { ...accidentalMappings[6], ...accidentalMappings[5]}

const useMetronome = () => {
  console.log(accidentalMappings[2])
  const { notesKey } = useContext(NotesContext);
  let clicks = 0;
  let audioNote = null;

  function playMetronome() {
    if (clicks++ === 4) clicks = 1;

    const clickSound = new Audio(metronomeClick);
    const clickSound2 = new Audio(metronomeClick2);

    if (clicks === 1) clickSound2.play();
    else clickSound.play();
  }

  function playSound(notePitch) {
    if (audioNote) {
      audioNote.pause();
      audioNote.currentTime = 0;
    }

    let currentPlayPitch = soundMap[notePitch];

    if (notesKey) {
      const { accidental } = notesKey;
      const accidentalPitchMap = accidentalMappings[accidental];
      if (accidentalPitchMap && accidentalPitchMap[notePitch]) {
        currentPlayPitch = soundMap[accidentalPitchMap[notePitch]];
      }
    }

    if (currentPlayPitch) {
      audioNote = new Audio(currentPlayPitch);
      audioNote.play().catch((error) => console.error(error));
    }
  }

  return { playMetronome, playSound };
};

export default useMetronome;
