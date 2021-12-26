import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../app/hooks';
import { setSourceNode } from '../components/Recording/RecordingSlice';
import { time } from './spaceTime';


export const webAudio = {
   audioCtx: new AudioContext(),
   audioBufferSources: [] as AudioBufferSourceNode[],
};

export const webAudioSlice = createSlice({
   name: 'webAudio',
   initialState: webAudio,
   reducers: {
      setAudioBufferSource(state, { payload }) {
         state.audioBufferSources.push(payload);
      },
      clearAudioBufferSources(state) {
         state.audioBufferSources = [];
      }
   }
});

export const { clearAudioBufferSources, setAudioBufferSource } = webAudioSlice.actions;

export default webAudioSlice.reducer;

export const webAudioActions = (action: string, recording: any = undefined): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime, webAudio, track, recordings, masterBus } = getState();
      switch (action) {
         case 'playSound': {
            for (const [, recording] of Object.entries(recordings.recordings)) {
               const source = webAudio.audioCtx.createBufferSource();
               source.buffer = recording.audioBuffer;
               source.connect(track.list[recording.trackNumber].pannerNode);

               const start = Math.max(
                  recording.timeToStart
                  - spaceTime.time
                  + recording.offset
                  + webAudio.audioCtx.currentTime, 0);
               const offset = Math.max(
                  spaceTime.time
                  - recording.timeToStart
                  - recording.offset, 0)
                  + recording.offset;
               const duration = Math.max(recording.duration - offset, 0);
               masterBus.gainNode.connect(webAudio.audioCtx.destination);
               source.start(start, offset, duration);

               dispatch(setAudioBufferSource(source));
               dispatch(setSourceNode({ id: recording.id, node: source }));
            }
            break;
         }

         case 'stop': {
            dispatch(time());
            for (const audioBufferSource of webAudio.audioBufferSources)
               audioBufferSource.stop();
            dispatch(clearAudioBufferSources());
            break;
         }
         case 'stopSingleSound': {
            recording.audioBufferSource.stop();
            break;
         }
         case 'playWhileDragging': {
            recording.audioBufferSource?.stop();
            const source = webAudio.audioCtx.createBufferSource();
            source.buffer = recording.audioBuffer;
            source.connect(track.list[recording.tracknumber].pannerNode);
            const start = Math.max(
               recording.timeToStart
               - spaceTime.time
               + recording.offset
               + webAudio.audioCtx.currentTime, 0);
            const offset = Math.max(
               spaceTime.time
               - recording.timeToStart
               - recording.offset, 0)
               + recording.offset;
            const duration = Math.max(recording.duration - offset, 0);
            source.start(start, offset, duration);
            recording.audioBufferSource = source;
            webAudio.audioBufferSources.push(source);
            break;
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
           }*/
      }
   };
};