import drawingServices from "../services/drawingServices";
import { generateRecordingId } from "../services/utils";

const copyPaste = (recording: any) => {

   interface KeysPressed {
      [k: string]: boolean;
   }
   const keysPressed: KeysPressed = {};

   recording.canvas.addEventListener('click', () => {
      if (!recording.copy) {
         /* document.addEventListener('keydown', event => {
            if (event.ctrlKey) keysPressed[event.key] = true;
            if (event.key === 'c' || event.key === 'C') keysPressed[event.key] = true;
            if (event.key === 'v' || event.key === 'V') keysPressed[event.key] = true;
            if (keysPressed.Control && keysPressed.c) {
               for (const recording of masterData.recordings) recording.copy = false;
               recording.copy = true;
            }
            if (recording.copy) {
               if (keysPressed.Control && keysPressed.v) {
                  const trck = document.querySelector('[data-selected]') as HTMLElement;
                  const nr = parseInt(trck.id.charAt(6));
                  const recordArgs: any = {
                     recordingId: generateRecordingId(),
                     timeToStart: spaceTime.time(),
                     audioBuffer: recording.audioBuffer,
                     offset: recording.offset,
                     duration: recording.duration,
                     copy: true
                  };
                  const newRecording = masterData.tracks[nr].addRecord(recordArgs);
                  newRecording.filename = recording.filename;
                  newRecording.offCanvas = recording.offCanvas;
                  newRecording.offSelectedCanvas = recording.offSelectedCanvas;
                  const printArgs = {
                     width: newRecording.offCanvas[spaceTime.zoom].width,
                     recording: newRecording,
                     offCanvas: newRecording.offCanvas[spaceTime.zoom],
                     offset: newRecording.offset * spaceTime.zoom,
                     duration: newRecording.duration * spaceTime.zoom
                  };
                  drawingServices.printRecording(printArgs);

                  delete keysPressed.Ctrl; delete keysPressed.c; delete keysPressed.v;
                  recording.copy = false;
               }
            } 
         });*/
         document.addEventListener('keyup', event => {
            delete keysPressed.Ctrl; delete keysPressed.c; delete keysPressed.v;
         });
      }
   });
}

export default copyPaste;
