import { createSlice } from "@reduxjs/toolkit";
//const snap_ratio = document.querySelector('#snap_ratio') as HTMLSelectElement;

export const spaceTime: SpaceTime = {

   space: 0,
   //time() { return this.space / this.zoom} ,
   time: 0,
   zoom: 20,        //px por segundo
  // bpm: 1,          // 120 = 1   60 = 2
   //compas: 2,        //2 es 4/4 1.5 es 3/4
   snap: {
      value: 0,
      toggle: false,
      result: 0
   },
   //snap: parseFloat(snap_ratio.value),
   startMark: 0,
   endMark: 0,
   howMany: 8,
   cut: false,


   /*  get startMark() {
       return this.startMark * this._zoom;
    },
    set startMark(input: number) {
       this.startMark = input / this._zoom;
    },
 
    get endMark() {
       return this.endMark * this._zoom;
    },
    set endMark(input: number) {
       this.endMark = input / this._zoom;
    }, */
};

export interface SpaceTime {

   space: number;
   time: number;
   //time: () => number;
   zoom: number;
  // bpm: number;
   //compas: number;
   snap: {
      value: number;
      toggle: boolean;
      result: number;
   };
   cut: boolean;
   startMark: number;
   endMark: number;
   howMany: number;

   /*   get startMark(): number;
     set startMark(sm: number);
     get endMark(): number;
     set endMark(em: number);    //esto se tiene que ir */
};

export const spaceTimeSlice = createSlice({
   name: 'spaceTime',
   initialState: spaceTime,
   reducers: {
      time(state) {
         state.time = state.space / state.zoom;
      },
      setSnap(state) {
         //state.snap.result = state.zoom * state.compas * state.bpm * state.snap.value;
      },
      setValue(state, {payload}) {
         (state as any)[payload.field] = payload.value;         
      }
   }
});

export const { time, setSnap, setValue } = spaceTimeSlice.actions;

export default spaceTimeSlice.reducer;