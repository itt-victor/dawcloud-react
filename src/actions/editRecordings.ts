import drawingServices from "../services/drawingServices";
import { masterData} from "../App";
import RecordingData from "../components/Recording/Recording";
import spaceTime from "../services/spaceTime";
import { onMousePos } from "../services/utils";
import { WebAudio } from "../services/WebAudio";

const editRecording = (recording: RecordingData) => {
/* 
   //arrastrar grabaciones

   let drag = false,
      crop_left = false,
      crop_right = false;
   const delta = { x: 0, y: 0 };
   let X = recording.timeToStart * spaceTime.zoom,
      Y = 0,
      offset = recording.offset * spaceTime.zoom,
      duration = recording.duration * spaceTime.zoom,
      bar: number,
      sizes,
      offCanvas: HTMLCanvasElement,
      width;

   recording.canvas.addEventListener('mousedown', evt => {
      X = (recording.timeToStart + recording.offset) * spaceTime.zoom;
      sizes = selectTrackHeight(recording.tracknumber);
      const mousePos = onMousePos(masterData.canvas, evt);
      if (mousePos.y < sizes.maxHeight &&
         mousePos.y > sizes.minHeight) {
         drag = true;
         delta.x = X - mousePos.x;
         delta.y = Y - mousePos.y;
      }
      if (spaceTime.snap.toggle) {
         //snap.setup = spaceTime.zoom * spaceTime.compas * spaceTime.bpm * spaceTime.snap;
         bar = Math.ceil(X / spaceTime.snap.setup());
      }
   }, false);

   window.addEventListener('mousemove', evt => {
      X = (recording.timeToStart + recording.offset) * spaceTime.zoom;

      const mousePos = onMousePos(masterData.canvas, evt);
      sizes = selectTrackHeight(recording.tracknumber);
      if (drag) {
         X = mousePos.x + delta.x, Y = mousePos.y + delta.y;
         X < 0 && (X = 0);

         //snap al masterData
         if (spaceTime.snap.toggle) {
            let barCount = Math.ceil(X / spaceTime.snap.setup());
            recording.canvas.style.left = `${barCount * spaceTime.snap.setup()}px`;
            recording.timeToStart = ((barCount * spaceTime.snap.setup()) / spaceTime.zoom) - recording.offset;
            if (barCount > bar) bar++;
            if (barCount < bar) bar--;
         } else {
            recording.canvas.style.left = `${X}px`;
            recording.timeToStart = (X / spaceTime.zoom) - recording.offset;
         }

         if (spaceTime.isPlaying) WebAudio.playWhileDragging(recording);

         //Cambiar de pista
         if (mousePos.y > sizes.maxHeight || mousePos.y < sizes.minHeight) {
            let newTrack;
            masterData.tracks.forEach(track => {
               sizes = selectTrackHeight(track.trackNumber)
               if (mousePos.y > sizes.minHeight && mousePos.y < sizes.maxHeight) {
                  newTrack = track;
                  newTrack.trackDOMElement.appendChild(recording.canvas);
                  recording.tracknumber = newTrack.trackNumber;
               }
            });
         }
      }
   }, false);

   //Recortar bordes de grabaciones

   recording.canvas.addEventListener('mousedown', function (evt) {

      const mousePos = onMousePos(evt.target as HTMLCanvasElement, evt);
      offset = recording.offset * spaceTime.zoom;
      duration = recording.duration * spaceTime.zoom;

      offCanvas = (recording.selected)
         ? recording.offSelectedCanvas[spaceTime.zoom]
         : recording.offCanvas[spaceTime.zoom];

      width = offCanvas.width;
      const args = { width, recording, offCanvas, offset, duration };

      if (mousePos.x < 0 + 3 && mousePos.x > 0 - 2) {

         drawingServices.printRecordingCrop(args);
         recording.canvas.style.left = `${recording.timeToStart * spaceTime.zoom}px`;
         crop_left = true;
         drag = false;

      } else if (mousePos.x < this.width + 3 && mousePos.x > this.width - 3) {

         drawingServices.printRecordingCrop(args);
         recording.canvas.style.left = `${recording.timeToStart * spaceTime.zoom}px`;
         crop_right = true;
         drag = false;
      }
   });

   recording.canvas.addEventListener("mousemove", function (evt) {

      const mousePos = onMousePos(this, evt);
      offset = recording.offset * spaceTime.zoom;
      duration = recording.duration * spaceTime.zoom;

      offCanvas = (recording.selected)
         ? recording.offSelectedCanvas[spaceTime.zoom]
         : recording.offCanvas[spaceTime.zoom];

      this.style.cursor = (spaceTime.cut) ? 'col-resize'
         : (mousePos.x < 0 + 3 && mousePos.x > 0 - 2) ? 'w-resize'
            : (mousePos.x < this.width + 3 && mousePos.x > this.width - 3) ? 'w-resize'
               : 'default';

      /* if (crop_left) {
         offset = (spaceTime.snap.toggle) ?
            spaceTime.snap.setup() * Math.round(mousePos.x / spaceTime.snap.setup()) :
            Math.max(mousePos.x, 0);
         width = offCanvas.width;
         const args = { width, recording, offCanvas, offset, duration };
         drawingServices.printRecordingCrop(args);
         this.style.cursor = 'w-resize';
         recording.offset = offset / spaceTime.zoom;

         if (spaceTime.isPlaying && parseFloat(cursor.canvas.style.left) < offset + parseFloat(this.style.left))
            WebAudio.playWhileDragging(recording);
      }
      if (crop_right) {
         duration = (spaceTime.snap.toggle) ?
         spaceTime.snap.setup() * Math.round(mousePos.x / spaceTime.snap.setup()) :
            Math.max(mousePos.x, 0);
         width = offCanvas.width;
         const args = { width, recording, offCanvas, offset, duration };
         drawingServices.printRecordingCrop(args);
         this.style.cursor = 'w-resize';
         recording.duration = duration / spaceTime.zoom;

         if (spaceTime.isPlaying && parseFloat(cursor.canvas.style.left) < duration + parseFloat(this.style.left))
            WebAudio.playWhileDragging(recording);
      } 
   });

   window.addEventListener("mouseup", () => {

      drag = false;
      if (crop_left || crop_right) {

         recording.offset = offset / spaceTime.zoom;
         recording.duration = duration / spaceTime.zoom;
         width = Math.ceil(duration - offset);
         if (width > offCanvas.width) width = offCanvas.width;
         const args = { width, recording, offCanvas, offset, duration };
         drawingServices.printRecording(args);
         crop_left = crop_right = false;
      }
   }, false);
 */
}

function selectTrackHeight(tracknumber: number) {
   let Yincrement = 60 * tracknumber;
   const heights = {
      minHeight: Yincrement,
      maxHeight: Yincrement + 60
   }
   return heights;
}

export default editRecording;