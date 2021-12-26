import { createSlice } from '@reduxjs/toolkit';
import { spaceTime } from '../../../services/spaceTime';
import { webAudio } from '../../../services/webAudioSlice';

export const trackData = {
   masterSolo: false, list: [...Array(spaceTime.howMany)].map((e, i) => {
      return {
         trackNumber: i,
         Y: 20,
         pannerValue: 'C',
         gainValue: 1,
         name: undefined,
         mute: false,
         solo: false,
         pannerNode: webAudio.audioCtx.createStereoPanner(),
         gainNode: webAudio.audioCtx.createGain()
      }
   })
};

export const trackSlice = createSlice({
   name: 'track',
   initialState: trackData,
   reducers: {
      handleSolo(state, { payload }) {

         state.list[payload].solo = !state.list[payload].solo ? true : false;

         for (const track of state.list) {
            if (track.solo) {
               state.masterSolo = true;
               break;
            }
            else state.masterSolo = false;
         }
         for (const track of state.list) {
            if (state.masterSolo) {
               (track.solo) ?
                  track.gainNode.gain.setValueAtTime(track.gainValue, webAudio.audioCtx.currentTime) :
                  track.gainNode.gain.setValueAtTime(0, webAudio.audioCtx.currentTime);
            }
            else if (track.mute) return;
            else track.gainNode.gain.setValueAtTime(track.gainValue, webAudio.audioCtx.currentTime);
         }
      },

      handleMute(state, { payload }) {

         if (!state.list[payload].mute) {
            state.list[payload].mute = true;
            state.list[payload].gainNode.gain.setValueAtTime(0, webAudio.audioCtx.currentTime);
         } else {
            state.list[payload].mute = false;
            state.list[payload].gainNode.gain.setValueAtTime(state.list[payload].gainValue, webAudio.audioCtx.currentTime);
         }
         /*    for (const track of trackData) {
               if (track.mute) track.gainNode.gain.setValueAtTime(0, webAudio.audioCtx.currentTime);
            } */
      }
   }
});

export const { handleMute, handleSolo } = trackSlice.actions;

export default trackSlice.reducer;

