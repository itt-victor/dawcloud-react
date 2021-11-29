import React, { useEffect, useRef, useState } from "react";
import styles from './Recording.module.scss';
import drawingServices from "../../services/drawingServices";
import { masterData } from "../../App";
import spaceTime from "../../services/spaceTime";
import editRecording from "../../actions/editRecordings";
import cutRecording from "../../actions/cutRecordings";
import copyPaste from "../../actions/copyPaste";

//if (!this.copy) this.drawwaveforms();
editRecording(this);
cutRecording(this);
copyPaste(this);
//removeRecording(this);


const Recording = (props: RecordArgs) => {

   const [id, setId] = useState(props.recordingId);
   const [trackNumber, setTrackNumber] = useState(props.trackNumber);
   const [fileName, setFileName] = useState();
   const [timeToStart, setTimeToStart] = useState(props.timeToStart);
   const [offset, setOffset] = useState(props.offset);
   const [duration, setduration] = useState(props.duration);
   const [audioBuffer, setAudioBuffer] = useState(props.audioBuffer);
   const [audioBufferSourceNode, setaudioBufferSourceNode] = useState();
   const [copy, setCopy] = useState(false);
   const [selected, setSelected] = useState(false);

   const ref = useRef<HTMLCanvasElement>(null);
   const canvas = ref.current as HTMLCanvasElement;
   const offCanvas: { [key: number]: HTMLCanvasElement } = {};
   const offSelectedCanvas: { [key: number]: HTMLCanvasElement } = {};


   const drawWaveforms = () => {

      const zoomArray = [];
      let zoom = 5;
      const pxOffset = offset * spaceTime.zoom;
      const pxDuration = duration * spaceTime.zoom;

      while (zoom <= 889) {
         zoomArray.push(zoom);
         zoom = Math.round(zoom * 1.25);
      }
      for (const zoom of zoomArray) {
         offCanvas[zoom] = drawRecording(zoom, false);
         offSelectedCanvas[zoom] = drawRecording(zoom, true);
      }
      const width = offCanvas[spaceTime.zoom].width;
      printRecording(width, offCanvas[spaceTime.zoom], pxOffset, pxDuration);
   }

   const deleteRecording = () => {
      /* masterData.tracks[this.tracknumber].trackDOMElement.removeChild(this.canvas);
      canvas.remove();
      setAudioBuffer(undefined);
      setaudioBufferSourceNode(undefined); */
   }


   const drawRecording = (zoom: number, selected: boolean) => {

      const offCanvas = document.createElement('canvas');
      let width = audioBuffer.duration * (zoom + 0.15), //Ese 0.15 corrige descompensación
         height = 58;
      offCanvas.width = audioBuffer.duration * zoom;
      offCanvas.height = height;
      const canvasCtx = offCanvas.getContext('2d') as CanvasRenderingContext2D;

      canvasCtx.fillStyle = selected ? '#20453a' : '#2ed9a5';
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, 0);
      canvasCtx.lineTo(width, 0);
      canvasCtx.lineTo(width, 58);
      canvasCtx.lineTo(0, 58);
      canvasCtx.fill();
      canvasCtx.closePath()
      canvasCtx.strokeStyle = '#380166';
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeRect(0, 0, width - 2, height);
      canvasCtx.fillStyle = selected ? '#2ed9a5' : '#20453a';

      if (audioBuffer.numberOfChannels === 2) {  //si es estereo..
         const dataL = audioBuffer.getChannelData(0);
         const stepL = Math.ceil(dataL.length / width);
         const amp = height / 4;
         for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < stepL; j++) {
               const datum = dataL[(i * stepL) + j];
               if (datum < min) min = datum;
               if (datum > max) max = datum;
            }
            canvasCtx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
         }
         const dataR = audioBuffer.getChannelData(1);
         const stepR = Math.ceil(dataR.length / width);
         for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < stepR; j++) {
               const datum = dataR[(i * stepR) + j];
               if (datum < min)
                  min = datum;
               if (datum > max)
                  max = datum;
            }
            canvasCtx.fillRect(i, (1 + min) * amp + height / 2, 1, Math.max(1, (max - min) * amp));
         }
      } else if (audioBuffer.numberOfChannels === 1) {  // si es mono..
         const data = audioBuffer.getChannelData(0);
         const step = Math.ceil(data.length / width);
         const amp = height / 2;
         for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;
            for (let j = 0; j < step; j++) {
               const datum = data[(i * step) + j];
               if (datum < min)
                  min = datum;
               if (datum > max)
                  max = datum;
            }
            canvasCtx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
         }
      }
      return offCanvas;
   }

   const printRecording = (width: number, offCanvas: HTMLCanvasElement, pxOffset: number, pxDuration: number) => {

      const height = 58, x = (timeToStart * spaceTime.zoom) + offset;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offCanvas, pxOffset, 0, pxDuration, height, 0, 0, pxDuration, height);
      canvas.style.left = `${x}px`;
   };

   const printRecordingCrop = (width: number, offCanvas: HTMLCanvasElement, pxOffset: number, pxDuration: number) => {

      const height = 58;
      canvas.width = width + 2;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offCanvas, 0, 0);
      ctx.clearRect(0, 0, offset, height);
      ctx.clearRect(duration, 0, width - duration, height);
   };

   const printCutRecording = (width: number, offCanvas: HTMLCanvasElement, pxOffset: number, pxDuration: number) => {

      const height = 58, x = (timeToStart * spaceTime.zoom);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offCanvas, offset, 0, duration, height, 0, 0, duration, height);
      canvas.style.left = `${x}px`;
   };

   useEffect(() => {

      if (copy) drawWaveforms();
      editRecording(this);
      cutRecording(this);
      copyPaste(this);
      //removeRecording(this);

   }, [])

   return (
      <canvas className={`${styles.Recording} recording`} data-testid="Recording" id={id} ref={ref} />
   );

}

export interface RecordArgs {
   recordingId: string;
   trackNumber: number;
   timeToStart: number;
   audioBuffer: AudioBuffer;
   offset: number;
   duration: number;
   copy?: boolean;
}
