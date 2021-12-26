import { createSlice } from "@reduxjs/toolkit";
import { webAudio } from "./webAudioSlice";

export const masterData = {

   gainNode: webAudio.audioCtx.createGain() as GainNode,
   gainValue: 1,
   faderY: 20,
};

export const masterSlice = createSlice({
   name: 'master',
   initialState: masterData,
   reducers: {}
});

//export const { } = masterSlice.actions;
export default masterSlice.reducer;