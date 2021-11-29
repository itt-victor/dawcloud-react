import spaceTime from "../../../services/spaceTime";

const cursorService = {

    interval: 0,

    draw () {
        const canvas = document.querySelector('#cursor') as HTMLCanvasElement;
        canvas.width = 5;
        canvas.height = 60 * spaceTime.howMany + 30;
        canvas.style.left = '150px';
        canvas.style.zIndex = '10';
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = 'black';
        ctx.globalCompositeOperation = 'destination-over';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(0, 0, 5, canvas.height);
    },

    play() {  
        const canvas = document.querySelector('#cursor') as HTMLCanvasElement;
        let start = performance.now(),
           increase = 0, progress, fps;
  
        const step = (now: number) => {
           progress = now - start;
           fps = Math.round(1000 / (progress / ++increase) * 100) / 100;
           spaceTime.space += spaceTime.zoom * 1 / fps;
           canvas.style.left = `${spaceTime.space}px`;
           this.interval = requestAnimationFrame(step);
        }
        this.interval = requestAnimationFrame(step);
  
     },
  
     stop () {
        window.cancelAnimationFrame(this.interval);
     },
  
     moveAtZoom (oldZoom: number) {
        const canvas = document.querySelector('#cursor') as HTMLCanvasElement;
        spaceTime.space *= (spaceTime.zoom / oldZoom);
        canvas.style.left = `${spaceTime.space}px`;
     },
  
     moveAtClick () {
        const canvas = document.querySelector('#cursor') as HTMLCanvasElement;
        canvas.style.left = `${spaceTime.space}px`;
     }
}

export default cursorService;