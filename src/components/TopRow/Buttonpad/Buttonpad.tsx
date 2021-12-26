import React from 'react';
import styles from './Buttonpad.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { handleBpm, handleTimeSignature, handleAudio } from './buttonPadSlice';

const Buttonpad = () => {

   const dispatch = useAppDispatch();
   const {
      bpmScreen,
      disablePlay,
      disableRecord,
      disableStop,
      inputType,
      timeSignatureScreen,
      recordStyle,
   } = useAppSelector(state => state.buttonPad);


   const rRef = React.useRef<HTMLButtonElement>(null);
   const sRef = React.useRef<HTMLButtonElement>(null);
   const inputRef = React.useRef<HTMLInputElement>(null);
   const alt = '';

   return (
      <div className={styles.Buttonpad + " master_controls"} data-testid="Buttonpad" id="buttonpad">
         <button id="loop-button" className="loop-button btn btn-outline-info"><img width="30px" height="30px"
            src="icons/loop-icon.png" alt={alt} /></button>
         <button id="stop-button" className="stop-button btn btn-outline-info" ref={sRef}
            onClick={() => dispatch(handleAudio('stop'))} disabled={disableStop}>
            <img width="30px" height="30px" src="icons/stop-icon.png" alt={alt} /></button>
         <button id="play-button" className="play-button btn btn-outline-info"
            onClick={() => { dispatch(handleAudio('play')) }} disabled={disablePlay}>
            <img width="30px" height="30px" src="icons/play-icon.jpg" alt={alt} /></button>
         <button id="record-button" className="record-button btn btn-outline-info" ref={rRef} style={{ backgroundColor: recordStyle }}
            onClick={() => dispatch(handleAudio('record'))} disabled={disableRecord}>
            <img width="30px" height="30px" src="icons/record-icon.png" alt={alt} /></button>
         <button id="metric_button" className="btn btn-outline-info btn-metric"
            onClick={() => dispatch(handleTimeSignature())}>{timeSignatureScreen}</button>
         <button id="bpm_button" className="btn btn-outline-info btn-bpm" onClick={() => dispatch(handleBpm(inputRef))}>
            <input type={inputType} ref={inputRef} id="bpm_value" placeholder="set tempo" autoFocus />{bpmScreen && bpmScreen}</button>
         <button id="metronome-button" className="metronome-button btn btn-outline-info"><img width="30px"
            height="30px" src="icons/metronome-icon-18.jpg" alt={alt} /></button>
      </div>
   );
}
export default Buttonpad;
