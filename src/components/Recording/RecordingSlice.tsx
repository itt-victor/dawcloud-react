import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/types/types-external";
import React from "react";
import { AppThunk } from "../../app/hooks";
import Recording from "./Recording";

export const recordingSlice = createSlice({
   name: 'recording',
   initialState: {
      recordings: {} as { [key: string]: RecordingType }
   },
   reducers: {
      addRecording(state, { payload }) {

         const offCanvas = {} as { [index: number]: HTMLCanvasElement };
         const offSelectedCanvas = {} as { [index: number]: HTMLCanvasElement };
         for (const zoom of payload.zooms) {
            offCanvas[zoom] = draw(zoom, false, payload.audioBuffer);
            offSelectedCanvas[zoom] = draw(zoom, true, payload.audioBuffer);
         }

         const canvasRef = React.createRef<HTMLCanvasElement>();//React.createRef<HTMLCanvasElement>();

         state.recordings[payload.id] = {
            id: payload.id,
            trackNumber: payload.trackNumber,
            fileName: '',
            timeToStart: payload.timeToStart,
            audioBuffer: payload.audioBuffer,
            offset: payload.offset,
            duration: payload.duration,
            copy: payload.copy,
            isSelected: false,
            offCanvas: offCanvas as WritableDraft<{ [index: number]: HTMLCanvasElement }>,
            offSelectedCanvas: offSelectedCanvas as WritableDraft<{ [index: number]: HTMLCanvasElement }>,
            Component: Recording
         };
      },
      handleClick(state, { payload }) {
         for (const recording in state.recordings)
            state.recordings[recording].isSelected = false;
         state.recordings[payload].isSelected = true;
      },
      setSourceNode(state, { payload }) {
         state.recordings[payload.id].audioBufferSourceNode = payload.node as AudioBufferSourceNode;
      }
   }
});

export const { addRecording, handleClick, setSourceNode } = recordingSlice.actions;

export default recordingSlice.reducer;

export const createRecording = ({ id, timeToStart, audioBuffer, offset, duration, copy }: args): AppThunk => {
   return (dispatch, getState) => {

      const trackNumber = getState().tracks.selectedTrack;
      const zooms = [];

      if (!copy) {
         let zoom = 5;
         while (zoom <= 889) {
            zooms.push(zoom)
            zoom = Math.round(zoom * 1.25);
         }
      }
      dispatch(addRecording({ id, trackNumber, timeToStart, audioBuffer, offset, duration, copy, zooms }));
   }
}

/* 
                     case 'deleteRecording': {
                        masterData.tracks[this.tracknumber].trackDOMElement.removeChild(this.canvas);
                        canvas.remove();
                        setAudioBuffer(undefined);
                        setaudioBufferSourceNode(undefined);
                        break;
                     }
             */

export const printRecording = (
   recording: RecordingType,
   canvas: HTMLCanvasElement,
   width: number,
   offCanvas: HTMLCanvasElement,
   pxOffset: number,
   pxDuration: number,
   action: string
): AppThunk => {
   return (dispatch, getState) => {
      switch (action) {
         case 'print': {
            const { spaceTime } = getState();
            const height = 58; const x = (recording.timeToStart * spaceTime.zoom) + recording.offset;

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(offCanvas, pxOffset, 0, pxDuration, height, 0, 0, pxDuration, height);
            canvas.style.left = `${x}px`;
            break;
         }
      }
   }
}

/* 
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
 */



type args = {
   id: string, timeToStart: number, audioBuffer: AudioBuffer, offset: number, duration: number, copy: boolean
}

export type RecordingType = {
   id: string,
   trackNumber: number,
   fileName: string,
   timeToStart: number,
   audioBuffer: AudioBuffer,
   offset: number,
   duration: number,
   copy: boolean,
   isSelected: boolean,
   audioBufferSourceNode?: AudioBufferSourceNode,
   offCanvas: { [index: number]: HTMLCanvasElement },
   offSelectedCanvas: { [index: string]: HTMLCanvasElement },
   Component: ({ id }: any) => JSX.Element
}

const draw = (zoom: number, selected: boolean, audioBuffer: AudioBuffer) => {

   const offCanvas = document.createElement('canvas');
   let width = audioBuffer.duration * (zoom + 0.15); //Ese 0.15 corrige descompensación
   let height = 58;
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