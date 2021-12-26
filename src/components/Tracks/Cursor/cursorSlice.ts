import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '../../../app/hooks';
import { setValue } from '../../../services/spaceTime';

export const cursorSlice = createSlice({
   name: 'cursor',
   initialState: { interval: 0, drawn: false },
   reducers: {
      setInterval(state, { payload }) {
         state.interval = payload;
      },
      isDrawn(state) {
         state.drawn = true;
      }
   }
});

export const { setInterval, isDrawn } = cursorSlice.actions;

export default cursorSlice.reducer;

export const cursor = (action: string): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime } = getState();
      const canvas = document.querySelector('#cursor') as HTMLCanvasElement;

      switch (action) {
         case 'draw': {
            canvas.width = 5;
            canvas.height = 60 * spaceTime.howMany + 30;
            canvas.style.left = '150px';
            canvas.style.zIndex = '10';
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.fillStyle = 'black';
            ctx.globalCompositeOperation = 'destination-over';
            ctx.globalAlpha = 0.8;
            ctx.fillRect(0, 0, 5, canvas.height);
            break;
         }
         case 'play': {
            let start = performance.now(),
               increase = 0, progress, fps;

            const step = (now: number) => {
               progress = now - start;
               fps = Math.round(1000 / (progress / ++increase) * 100) / 100;
               const action = { field: 'space', value: getState().spaceTime.space };
               action.value += spaceTime.zoom * 1 / fps;
               dispatch(setValue(action));

               canvas.style.left = `${getState().spaceTime.space + 150}px`;
               dispatch(setInterval(requestAnimationFrame(step)));
            }
            dispatch(setInterval(requestAnimationFrame(step)));
            break;
         }
         case 'stop': {            
            window.cancelAnimationFrame(getState().cursor.interval);
            break;
         }
         case 'move': {
            canvas.style.left = `${getState().spaceTime.space + 150}px`;
            break;
         }
      }
   };
};
