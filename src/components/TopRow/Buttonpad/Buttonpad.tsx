import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import spaceTime from '../../../services/spaceTime';
import styles from './Buttonpad.module.scss';
import cursor from '../../Tracks/Cursor/Cursor.service'
import { WebAudio } from '../../../services/WebAudio';
import { generateRecordingId } from '../../../services/utils';

const Buttonpad = () => {

   const [sDisabled, setSDisabled] = useState(false);
   const [pDisabled, setPDisabled] = useState(false);
   const [rDisabled, setRDisabled] = useState(false);
   const rRef = useRef<HTMLButtonElement>(null);
   const sRef = useRef<HTMLButtonElement>(null);

   const play = () => {
      !spaceTime.isPlaying && (spaceTime.isPlaying = true);
      setPDisabled(true);
      setSDisabled(false);
      cursor.play();
   }

   const stop = () => {
      spaceTime.isPlaying && (spaceTime.isPlaying = false);
      setPDisabled(false);
      setSDisabled(true);
      cursor.stop();
   }

   const record = () => {
      if (navigator.mediaDevices.getUserMedia) {
         const constraints = { audio: true };
         const onSuccess = (stream: any) => {
            const mediaRecorder = new MediaRecorder(stream);
            let chunks: any[] = [];
            let startTime: number;
            mediaRecorder.ondataavailable = (event: { data: any; }) => chunks.push(event.data);
            mediaRecorder.start(100);
            startTime = spaceTime.time();
            if (!spaceTime.isPlaying) {
               cursor.play();
               WebAudio.playSound();
               spaceTime.isPlaying = true;
            }

            (sRef.current as HTMLButtonElement).onclick = (e: MouseEvent) => {               
               mediaRecorder.stop();
               console.log(mediaRecorder.state);
               (rRef.current as HTMLButtonElement).style.background = '';
               setRDisabled(false);
               cursor.stop();
            };
            console.log(chunks);

            //ui_draw.drawTrackWhileRecording();  ///ESTO
            console.log(mediaRecorder.state);
            (rRef.current as HTMLButtonElement).style.background = 'red';
            setSDisabled(false);
            setRDisabled(true);
            setPDisabled(true);

            mediaRecorder.onstop = () => {
               const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
               chunks = [];
               blob.arrayBuffer().then(arrayBuffer =>
                   WebAudio.audioCtx.decodeAudioData(arrayBuffer, audioBuffer => {
                       const track = parseInt((document.querySelector('[data-selected]') as HTMLElement).id.charAt(6));
                       const latency = 0.01; //LATENCIA, HAY QUE MIRAR ESTO BIEN
                       const args = {
                           recordingId: generateRecordingId(),
                           timeToStart: startTime -  latency,
                           audioBuffer,
                           offset: 0,
                           duration: audioBuffer.duration,
                           copy: false
                       };
                       //tracks[track].addRecord(args);
                   })
               );
           }
         }
         const onError = (err: string) => {
            console.log('The following error occured: ' + err);
         }
         navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      } else {
         alert('getUserMedia not supported on your browser!');
      }

   }
   const alt = '';
   return (
      <div className={styles.Buttonpad} data-testid="Buttonpad" id="buttonpad">
         <div className="master_controls">
            <button id="loop-button" className="loop-button btn btn-outline-info"><img width="30px" height="30px"
               src="icons/loop-icon.png" alt={alt} /></button>
            <button id="stop-button" className="stop-button btn btn-outline-info" ref={sRef} onClick={stop} disabled={sDisabled}>
               <img width="30px" height="30px" src="icons/stop-icon.png" alt={alt} /></button>
            <button id="play-button" className="play-button btn btn-outline-info" onClick={play} disabled={pDisabled}>
               <img width="30px" height="30px" src="icons/play-icon.jpg" alt={alt} /></button>
            <button id="record-button" className="record-button btn btn-outline-info" ref={rRef} onClick={record} disabled={rDisabled}>
               <img width="30px" height="30px"src="icons/record-icon.png" alt={alt} /></button>
            <button id="metric_button" className="btn btn-outline-info btn-metric"></button>
            <button id="bpm_button" className="btn btn-outline-info btn-bpm"></button>
            <button id="metronome-button" className="metronome-button btn btn-outline-info"><img width="30px"
               height="30px" src="icons/metronome-icon-18.jpg" alt={alt} /></button>
         </div>
      </div>
   );
}
export default Buttonpad;
