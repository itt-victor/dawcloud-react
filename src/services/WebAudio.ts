import { masterData} from "../App";
import spaceTime from "./spaceTime";
import Track from "../components/Tracks/Track/Track";
import Recording from "../components/Recording/Recording";

export class WebAudio {

   static audioCtx = new AudioContext();

   static audioBufferSources = [] as AudioBufferSourceNode[];

   static async playSound() {
      const play = async (recording: any) => {
         const source = this.audioCtx.createBufferSource();
         source.buffer = recording.audioBuffer;
         source.connect(masterData.tracks[recording.tracknumber].pannerNode);
         const start = Math.max(
            recording.timeToStart
            - spaceTime.time()
            + recording.offset
            + this.audioCtx.currentTime, 0);
         const offset = Math.max(
            spaceTime.time()
            - recording.timeToStart
            - recording.offset, 0)
            + recording.offset;
         const duration = Math.max(recording.duration - offset, 0);
         source.start(start, offset, duration);
         this.audioBufferSources.push(source);
         recording.audioBufferSource = source;
      }
      for await (const recording of masterData.recordings) play(recording);
   }

   static stopSound() {
      for (const audioBufferSource of this.audioBufferSources)
         audioBufferSource.stop();
      this.audioBufferSources = [];
   }

   static stopSingleSound(recording: any) {
      recording.audioBufferSource?.stop();
   }

   static playWhileDragging(recording: any) {
      recording.audioBufferSource?.stop();
      const source = this.audioCtx.createBufferSource();
      source.buffer = recording.audioBuffer;
      source.connect(masterData.tracks[recording.tracknumber].pannerNode);
      const start = Math.max(
         recording.timeToStart
         - spaceTime.time()
         + recording.offset
         + this.audioCtx.currentTime, 0);
      const offset = Math.max(
         spaceTime.time()
         - recording.timeToStart
         - recording.offset, 0)
         + recording.offset;
      const duration = Math.max(recording.duration - offset, 0);
      source.start(start, offset, duration);
      recording.audioBufferSource = source;
      this.audioBufferSources.push(source);
   }

   static mute(gainNode: GainNode) {
      gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
   }

   static solo(track: any) {
      track.gainNode.gain.setValueAtTime(track.gainValue, this.audioCtx.currentTime);
   }
   /* 
     metronome() {
         let interval;
         if (metronome) {
             let increment = 1000 / ((120 / spaceTime.bpm) / 60);
             let barType = (spaceTime.compas === 2) ? 4 : 3;
             let beatNumber = 1;
   
             const measure = () => {
                 const oscillator = audioCtx.createOscillator();
                 oscillator.type = 'sine';
                 oscillator.connect(audioCtx.destination);
                 oscillator.frequency.value = (beatNumber % barType == 0) ? 1000 : 800;
                 oscillator.start(audioCtx.currentTime);
                 oscillator.stop(1);
                 beatNumber++;
             }
   
             interval = setInterval(measure, increment);
   
         } else clearInterval(interval);
     } */

}
