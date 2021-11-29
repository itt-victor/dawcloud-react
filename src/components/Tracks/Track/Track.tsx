import React, { useRef, useState } from "react";
import { masterData } from "../../../App";
import { WebAudio } from "../../../services/WebAudio";

const Track = (props: any) => {

   const [trackNumber, setTrackNumber] = useState(props.trackNumber);

   //public parent: this;
   //fader: HTMLElement;
   const [Y, setY] = useState(20);
   const [pannerValue, setPannerValue] = useState('C');
   const [gainValue, setGainValue] = useState(1);
   const [name, setName] = useState();
   const [mute, setMute] = useState(false);
   const [solo, setSolo] = useState(false);
   const [recordings, setRecording] = useState([]);

   const pannerNode = WebAudio.audioCtx.createStereoPanner();
   const gainNode = WebAudio.audioCtx.createGain();
   pannerNode.connect(gainNode);
   gainNode.connect(masterData.gainNode);
   const ref = useRef<HTMLElement>(null);

   const [soloClass, setSoloClass] = useState('track_solo');
   const [muteClass, setMuteClass] = useState('track_mute');

//      this.fader = document.getElementById(`fader_${this.props.trackNumber}`) as HTMLInputElement;
   //   masterData.tracks.push(this);

   const SoloButton = () => {
      const handleSolo = () => {
         
         if (!solo){
            setSoloClass('track_solo track_solo_on');
            setSolo(true);
         } else {
            setSoloClass('track_solo');
            setSolo(false);
         }

         for (const track of masterData.tracks) {
            
            if (track.state.soloOn) {
               masterData.solo = true;
               break;
            }
            else masterData.solo = false;
         }
         for (const track of masterData.tracks) {
            if (masterData.solo) {
               (track.state.soloOn) ?
                  WebAudio.solo(track) :
                  WebAudio.mute(track.gainNode);
            }
            else if (track.state.muteOn) return;
            else WebAudio.solo(track);
         }
      } 

      return <button type="button" className={soloClass} id={`solo_${trackNumber}`}
         onClick={handleSolo} >S</button>;
   }

   const MuteButton = () => {
      const handleMute = () => {
         if (!mute) {            
            gainNode.gain.setValueAtTime(0, WebAudio.audioCtx.currentTime);
            setMuteClass('track_mute track_mute_on');
            setMute(true);
            console.log(muteClass);
            
         } else {
            gainNode.gain.setValueAtTime(gainValue, WebAudio.audioCtx.currentTime);
            setMuteClass('track_mute');
            setMute(false);
            console.log(muteClass);

         }
         /* for (const track of masterData.tracks) {
            if (track.state.muteOn) track.gainNode.gain.setValueAtTime(0, WebAudio.audioCtx.currentTime);
         } */
      }

      return (<button type="button" className={muteClass} id={`mute_${trackNumber}`}
         onClick={handleMute} >M</button>);
   }

   return (
      <div className="newBox" >
         <div className="track_name" id={`track_name_${trackNumber}`} >
            <button className="select" >Track {trackNumber + 1}</button>
            <SoloButton />
            <MuteButton />
            <input type="text" className="input" autoComplete="false" placeholder="Name your track" />
         </div>
         <div className="track" data-testid="Track" id={`track_${trackNumber}`} >
         </div>
      </div>
   );

}

export default Track;