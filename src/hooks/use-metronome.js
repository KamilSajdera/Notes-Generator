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

const preloadedSounds = {
  metronomeClick: new Audio(metronomeClick),
  metronomeClick2: new Audio(metronomeClick2),
  pitchC: new Audio(pitchC),
  pitchCis: new Audio(pitchCis),
  pitchD: new Audio(pitchD),
  pitchEs: new Audio(pitchEs),
  pitchE: new Audio(pitchE),
  pitchF: new Audio(pitchF),
  pitchFis: new Audio(pitchFis),
  pitchG: new Audio(pitchG),
  pitchGis: new Audio(pitchGis),
  pitchA: new Audio(pitchA),
  pitchb: new Audio(pitchb),
  pitchH: new Audio(pitchH),
  pitchC2: new Audio(pitchC2),
  pitchCis2: new Audio(pitchCis2),
  pitchD2: new Audio(pitchD2),
  pitchEs2: new Audio(pitchEs2),
  pitchE2: new Audio(pitchE2),
  pitchF2: new Audio(pitchF2),
  pitchFis2: new Audio(pitchFis2),
  pitchG2: new Audio(pitchG2),
  pitchGis2: new Audio(pitchGis2),
  pitchA2: new Audio(pitchA2),
  pitchb2: new Audio(pitchb2),
  pitchH2: new Audio(pitchH2),
  pitchC3: new Audio(pitchC3),
  pitchCis3: new Audio(pitchCis3),
};

const accidentalMappings = {
  1: { pitchF: "pitchFis", pitchF2: "pitchFis2" },
  2: { pitchC: "pitchCis", pitchC2: "pitchCis2", pitchC3: "pitchCis3" },
  3: { pitchG: "pitchGis", pitchG2: "pitchGis2" },
  4: { pitchH: "pitchb", pitchH2: "pitchb2" },
  5: { pitchE: "pitchEs", pitchE2: "pitchEs2" },
  6: { pitchA: "pitchGis", pitchA2: "pitchGis2" }
};
accidentalMappings[2] = { ...accidentalMappings[2], ...accidentalMappings[1] };
accidentalMappings[3] = { ...accidentalMappings[3], ...accidentalMappings[2] };
accidentalMappings[5] = { ...accidentalMappings[5], ...accidentalMappings[4] };
accidentalMappings[6] = { ...accidentalMappings[6], ...accidentalMappings[5] };

const useMetronome = () => {
  const { notesKey } = useContext(NotesContext);
  let clicks = 0;

  function playMetronome() {
    if (clicks++ === 4) clicks = 1;

    const clickSound = preloadedSounds.metronomeClick;
    const clickSound2 = preloadedSounds.metronomeClick2;

    if (clicks === 1) {
      clickSound2.currentTime = 0;
      clickSound2.play();
    } else {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  }

  function playSound(notePitch) {
    const { accidental } = notesKey || {};
    const accidentalPitchMap = accidentalMappings[accidental];
    const mappedPitch = accidentalPitchMap?.[notePitch] || notePitch;
    const audioNote = preloadedSounds[mappedPitch];

    if (audioNote) {
      audioNote.currentTime = 0; 
      audioNote.play().catch((error) => console.error(error));
    }
  }

  return { playMetronome, playSound };
};

export default useMetronome;
