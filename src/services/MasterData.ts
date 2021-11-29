import spaceTime from "./spaceTime";
import Track from "../components/Tracks/Track/Track";
import {WebAudio} from "./WebAudio";

export class MasterData {


   _gainValue: number;
   get gainValue() {
      return this._gainValue;
   }
   set gainValue(value) {
      this._gainValue = value;
   }

   _faderY: number;
   get faderY() {
      return this._faderY;
   }
   set faderY(value) {
      this._faderY = value;
   }

   gainNode: GainNode;
   tracks: any = [];
   recordings: Array<any> = [];
   solo: boolean;

   /* quita esto */ canvas = document.createElement('canvas');

   constructor() {
      this.gainNode = WebAudio.audioCtx.createGain();
      this.gainNode.connect(WebAudio.audioCtx.destination);

      //default la 1a pista
      //(document.querySelector('.track') as HTMLInputElement).setAttribute('data-selected', '');
      this._gainValue = 1;
      this._faderY = 20;
      this.solo = false;
/* 
      for (let i = 0; i < spaceTime.howMany; i++) {
         const track = new TrackData(i);
         track.gainNode.connect(this.gainNode);
         this.tracks.push(track);
      }  */
     // setTimeout(()=> console.log(this.tracks), 5000);
      
   }

}