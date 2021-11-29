import React, { useState } from 'react';
import spaceTime from '../../../services/spaceTime';
import styles from './Buttonpad.module.scss';

const Buttonpad = () => {

   const [sDisabled, setSDisabled] = useState(false);
   const [pDisabled, setPDisabled] = useState(false);

   const play = () => {
      !spaceTime.isPlaying && (spaceTime.isPlaying = true);
      setPDisabled(true);
      setSDisabled(false);
   }

   const stop = () => {
      spaceTime.isPlaying && (spaceTime.isPlaying = false);
      setPDisabled(false);
      setSDisabled(true);
   }
   const alt = '';
   return (
      <div className={styles.Buttonpad} data-testid="Buttonpad" id="buttonpad">
         <div className="master_controls">
            <button id="loop-button" className="loop-button btn btn-outline-info"><img width="30px" height="30px"
               src="icons/loop-icon.png" alt={alt} /></button>
            <button id="stop-button" className="stop-button btn btn-outline-info" onClick={stop} disabled={sDisabled}>
               <img width="30px" height="30px" src="icons/stop-icon.png" alt={alt} /></button>
            <button id="play-button" className="play-button btn btn-outline-info" onClick={play} disabled={pDisabled}>
               <img width="30px" height="30px" src="icons/play-icon.jpg" alt={alt} /></button>
            <button id="record-button" className="record-button btn btn-outline-info"><img width="30px" height="30px"
               src="icons/record-icon.png" alt={alt} /></button>
            <button id="metric_button" className="btn btn-outline-info btn-metric"></button>
            <button id="bpm_button" className="btn btn-outline-info btn-bpm"></button>
            <button id="metronome-button" className="metronome-button btn btn-outline-info"><img width="30px"
               height="30px" src="icons/metronome-icon-18.jpg" alt={alt} /></button>
         </div>
      </div>
   );
}
export default Buttonpad;
