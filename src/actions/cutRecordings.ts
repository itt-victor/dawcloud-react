//import { masterData } from '../components/generalmasterData';
import editRecording from './editRecordings';
import copyPaste from './copyPaste';
import { generateRecordingId } from '../services/utils';
//import { removeRecording } from './actions';
import { onMousePos } from '../services/utils';
import RecordingData from '../components/Recording/Recording';
import drawingServices from '../services/drawingServices';
import Recording from '../components/Recording/Recording';

const cutRecording = (recording: any) => {
/* 
   recording.canvas.addEventListener("click", function (evt) {

      const mousePos = onMousePos(this, evt);
      let offCanvas = (recording.selected)
         ? recording.offSelectedCanvas[spaceTime.zoom]
         : recording.offCanvas[spaceTime.zoom];

      if (spaceTime.cut) {
         //Se modifica el recording existente (izquierda)
         let offset = recording.offset * spaceTime.zoom,
            duration = mousePos.x,
            width = Math.ceil(duration - offset);
         recording.duration = duration / spaceTime.zoom;
         const args = { width, recording, offCanvas, offset, duration };
         drawingServices.printRecording(args);

         //Se genera info para el nuevo recording y se crea
         let timeToStart = (parseFloat(this.style.left) + mousePos.x) / spaceTime.zoom; //esto es raro
         const props = {}; //esto fuera
         let newRecording = new Recording(
            props,
            generateRecordingId(),
            timeToStart,
            recording.audioBuffer,
            recording.tracknumber,
            recording.duration, //aquí es el offset
            recording.audioBuffer.duration
         );
         newRecording.offCanvas = recording.offCanvas;
         newRecording.offSelectedCanvas = recording.offSelectedCanvas;
         offCanvas = newRecording.offSelectedCanvas[spaceTime.zoom];
         offset = newRecording.offset * spaceTime.zoom;
         duration = newRecording.duration * spaceTime.zoom;
         width = Math.ceil(duration - offset);
         masterData.recordings.push(newRecording);
         masterData.tracks[newRecording.tracknumber].trackDOMElement.appendChild(newRecording.canvas);
         newRecording.canvas.classList.add("recording");
         newRecording.canvas.id = newRecording.id;
         const cutArgs = { width, recording: newRecording, offCanvas, offset, duration };
         drawingServices.printCutRecording(cutArgs);
         //newRecording.canvas.style.left = (newRecording.timeToStart * spaceTime.zoom) + 'px'; y esto?
         editRecording(newRecording);
         cutRecording(newRecording);
         copyPaste(newRecording);
         //removeRecording(newRecording);
      }

      const cutButton = document.querySelector('#cut_function') as HTMLButtonElement,
         normalButton = document.querySelector('#normal_function') as HTMLButtonElement;

      cutButton.addEventListener('click', function () {
         spaceTime.cut = true;
         this.style.background = "red";
         this.disabled = true;
         normalButton.style.background = "";
         normalButton.disabled = false;
      });
      normalButton.addEventListener('click', function () {
         spaceTime.cut = false;
         this.style.background = "red";
         this.disabled = true;
         cutButton.style.background = "";
         cutButton.disabled = false;
      });

   }); */
}



export default cutRecording;