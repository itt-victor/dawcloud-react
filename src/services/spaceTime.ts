
//const snap_ratio = document.querySelector('#snap_ratio') as HTMLSelectElement;

const spaceTime: SpaceTime = {
   space: 150,

   time() {
      let time = this.space / this.zoom;
      return time;
   },
   zoom: 20,        //px por segundo
   bpm: 1,          // 120 = 1   60 = 2
   compas: 2,        //2 es 4/4 1.5 es 3/4
   snap: {
      setup() { return super.zoom * super.compas * super.bpm * super.snap; },
      toggle: false
   },
   //snap: parseFloat(snap_ratio.value),
   _startMark: 0,
   _endMark: 0,
   howMany: 8,
   isPlaying: false,
   cut: false,

   get startMark() {
      return this.startMark * this.zoom;
   },
   set startMark(input: number) {
      this.startMark = input / this.zoom;
   },

   get endMark() {
      return this.endMark * this.zoom;
   },
   set endMark(input: number) {
      this.endMark = input / this.zoom;
   }
};

export interface SpaceTime {
   space: number;
   time: () => number;
   zoom: number;
   bpm: number;
   compas: number;
   isPlaying: boolean;
   snap: {
      setup(): number;
      toggle: boolean;
   };
   cut: boolean;
   _startMark: number;
   _endMark: number;
   howMany: number;

   get startMark(): number;
   set startMark(sm: number);
   get endMark(): number;
   set endMark(em: number);    //esto se tiene que ir
}

export default spaceTime;