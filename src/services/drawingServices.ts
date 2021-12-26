import { AppThunk } from "../app/hooks";

const drawingServices = (action: string): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime } = getState();
      const { buttonPad } = getState();
      switch (action) {
         case 'layout': {
            const layout = document.querySelector('#layout') as HTMLCanvasElement;
            layout.height = 30; layout.width = 10000;
            const layoutCtx = layout.getContext('2d') as CanvasRenderingContext2D;
            layoutCtx.clearRect(0, 0, layout.width, layout.height)
            layoutCtx.strokeStyle = '#7a2332';
            layoutCtx.lineWidth = 0.7;
            let text = 1, layoutCompasDivision;
            let layoutZoomSetUp = spaceTime.zoom * buttonPad.timeSignatureValue * buttonPad.bpmValue;

            if (layoutZoomSetUp >= 35) {
               for (let i = 0; i < layout.width; i += layoutZoomSetUp) {
                  layoutCtx.beginPath();
                  layoutCtx.moveTo(i, 29);
                  layoutCtx.lineTo(i, 0);
                  layoutCtx.closePath();
                  layoutCtx.stroke();
                  layoutCtx.strokeText(text.toString(), i + 7, 28)
                  text += 1;
               }

               layoutCtx.lineWidth = 0.4;
               buttonPad.timeSignatureValue === 2 && (layoutCompasDivision = 4);
               buttonPad.timeSignatureValue === 1.5 && (layoutCompasDivision = 3);

               for (let i = 0; i < layout.width; i += (layoutZoomSetUp / (layoutCompasDivision as number))) {
                  layoutCtx.beginPath();
                  layoutCtx.moveTo(i, 7);
                  layoutCtx.lineTo(i, 0);
                  layoutCtx.closePath();
                  layoutCtx.stroke();
               }

            } else if (layoutZoomSetUp < 35) {
               for (let i = 0; i < layout.width; i += (layoutZoomSetUp * 2)) {
                  layoutCtx.beginPath();
                  layoutCtx.moveTo(i, 29);
                  layoutCtx.lineTo(i, 0);
                  layoutCtx.closePath();
                  layoutCtx.stroke();
                  layoutCtx.strokeText(text.toString(), i + 7, 28)
                  text += 2;
               }

               layoutCtx.lineWidth = 0.4;
               for (let i = 0; i < layout.width; i += (layoutZoomSetUp)) {
                  layoutCtx.beginPath();
                  layoutCtx.moveTo(i, 7);
                  layoutCtx.lineTo(i, 0);
                  layoutCtx.closePath();
                  layoutCtx.stroke();
               }
            }
            break;
         }
         case 'grid': {
            const grid = document.querySelector('#canvas-grid') as HTMLCanvasElement;
            const ctx = grid.getContext('2d') as CanvasRenderingContext2D;
            let gridZoomSetUp = spaceTime.zoom * buttonPad.timeSignatureValue * buttonPad.bpmValue;
            let gridCompasDivision;

            ctx.globalAlpha = 1;
            ctx.fillStyle = "#8accd1";
            ctx.clearRect(0, 0, grid.width, grid.height);
            ctx.fillRect(0, 0, grid.width, grid.height);
            ctx.lineWidth = 0.6;
            ctx.globalCompositeOperation = 'darken';

            buttonPad.timeSignatureValue === 2 && (gridCompasDivision = 4);
            buttonPad.timeSignatureValue === 1.5 && (gridCompasDivision = 3);

            for (let i = 0; i < grid.width; i += (gridZoomSetUp / (gridCompasDivision as number))) {

               ctx.strokeStyle = "black";
               ctx.beginPath();
               ctx.moveTo(i * (gridCompasDivision as number), 560);
               ctx.lineTo(i * (gridCompasDivision as number), 0);
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
            break;
         }
         case 'recordingTrack': {

            let width = 0; let height = 58;
            let x = spaceTime.space;
            const track = document.querySelector(`#track_${getState().tracks.selectedTrack}`) as HTMLElement;
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            track.appendChild(canvas);
            const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
            canvas.width = 10000; canvas.height = 60;
            canvasCtx.fillStyle = '#2ed9a5';
            let start = performance.now(), increase = 0;
            let progress; let fps; let interval: number;

            const step = (now: number) => {
               progress = now - start;
               fps = Math.round(1000 / (progress / ++increase) * 100) / 100;
               width += spaceTime.zoom * 1 / fps;
               canvasCtx.fillRect(x, 0, width, height);
               interval = requestAnimationFrame(step);
            }
            interval = requestAnimationFrame(step);

            (document.querySelector('#stop-button') as HTMLButtonElement).addEventListener('click', function st() {
               window.cancelAnimationFrame(interval);
               canvas.remove();
               this.removeEventListener('click', st);
            });
            document.addEventListener('keypress', e => {
               if (e.key === ' ') {
                  //if (e.target == project_name) return;
                  window.cancelAnimationFrame(interval);
                  canvas.remove();
               }
            });
            break;
         }
      }
   };
}

export default drawingServices;