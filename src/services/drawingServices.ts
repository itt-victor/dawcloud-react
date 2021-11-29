import { useContext } from "react";
import spaceTime from "./spaceTime";

const drawingServices = {

   layout() {
      const layout = document.querySelector('#layout') as HTMLCanvasElement;
      layout.height = 30; layout.width = 10000;
      const layoutCtx = layout.getContext('2d') as CanvasRenderingContext2D;
      layoutCtx.clearRect(0, 0, layout.width, layout.height)
      layoutCtx.strokeStyle = '#7a2332';
      layoutCtx.lineWidth = 0.7;
      let text = 1, compasDivision;
      let zoomSetUp = spaceTime.zoom * spaceTime.compas * spaceTime.bpm;

      if (zoomSetUp >= 35) {
         for (let i = 0; i < layout.width; i += zoomSetUp) {
            layoutCtx.beginPath();
            layoutCtx.moveTo(i, 29);
            layoutCtx.lineTo(i, 0);
            layoutCtx.closePath();
            layoutCtx.stroke();
            layoutCtx.strokeText(text.toString(), i + 7, 28)
            text += 1;
         }

         layoutCtx.lineWidth = 0.4;
         spaceTime.compas === 2 && (compasDivision = 4);
         spaceTime.compas === 1.5 && (compasDivision = 3);

         for (let i = 0; i < layout.width; i += (zoomSetUp / (compasDivision as number))) {
            layoutCtx.beginPath();
            layoutCtx.moveTo(i, 7);
            layoutCtx.lineTo(i, 0);
            layoutCtx.closePath();
            layoutCtx.stroke();
         }

      } else if (zoomSetUp < 35) {
         for (let i = 0; i < layout.width; i += (zoomSetUp * 2)) {
            layoutCtx.beginPath();
            layoutCtx.moveTo(i, 29);
            layoutCtx.lineTo(i, 0);
            layoutCtx.closePath();
            layoutCtx.stroke();
            layoutCtx.strokeText(text.toString(), i + 7, 28)
            text += 2;
         }

         layoutCtx.lineWidth = 0.4;
         for (let i = 0; i < layout.width; i += (zoomSetUp)) {
            layoutCtx.beginPath();
            layoutCtx.moveTo(i, 7);
            layoutCtx.lineTo(i, 0);
            layoutCtx.closePath();
            layoutCtx.stroke();
         }
      }
   },

   grid() {
      const canvas = document.querySelector('#canvas-grid') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      let zoomSetUp = spaceTime.zoom * spaceTime.compas * spaceTime.bpm;
      let compasDivision;

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#8accd1";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.6;
      ctx.globalCompositeOperation = 'darken';

      spaceTime.compas === 2 && (compasDivision = 4);
      spaceTime.compas === 1.5 && (compasDivision = 3);

      for (let i = 0; i < canvas.width; i += (zoomSetUp / (compasDivision as number))) {

         ctx.strokeStyle = "black";
         ctx.beginPath();
         ctx.moveTo(i * (compasDivision as number), 560);
         ctx.lineTo(i * (compasDivision as number), 0);
         ctx.closePath();
         ctx.stroke();

         ctx.strokeStyle = "grey";
         ctx.beginPath();
         ctx.moveTo(i, 560);
         ctx.lineTo(i, 0);
         ctx.closePath();
         ctx.stroke();

         ctx.strokeStyle = "darkgray";
         ctx.beginPath();
         ctx.moveTo(i / 2, 560);
         ctx.lineTo(i / 2, 0);
         ctx.closePath();
         ctx.stroke();
      }
   },

   recordingTrack() {

      let width = 0, height = 58,
         x = spaceTime.space;
      const track = document.querySelector('[data-selected]') as HTMLElement;
      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      track.appendChild(canvas);
      const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = 10000; canvas.height = 60;
      canvasCtx.fillStyle = '#2ed9a5';
      let start = performance.now(), increase = 0;
      let progress, fps, interval: number;

      const step = (now: number) => {
         progress = now - start;
         fps = Math.round(1000 / (progress / ++increase) * 100) / 100;
         width += spaceTime.zoom * 1 / fps;
         canvasCtx.fillRect(x, 0, width, height);
         interval = requestAnimationFrame(step);
      }
      interval = requestAnimationFrame(step);
     /*  stop.addEventListener('click', () => {
         window.cancelAnimationFrame(interval);
         canvas.remove();
      }); */
      document.addEventListener('keypress', e => {
         if (e.key === ' ') {
            //if (e.target == project_name) return;
            window.cancelAnimationFrame(interval);
            canvas.remove();
         }
      });

   }
}

export default drawingServices;