import React, { useContext, useEffect, useRef, useState } from 'react';
import drawingServices from '../../../services/drawingServices';
import spaceTime from '../../../services/spaceTime';
import styles from './Cursor.module.scss';

const Cursor = () => {

   useEffect(() => { drawingServices.cursor(); play(); });

   const ref = useRef(document.createElement('canvas'));
   const canvas = ref.current;
   let interval: number;

   const play = () => {

      /*if (spaceTime.isPlaying)*/

      let start = performance.now(),
         increase = 0, progress, fps;

      const step = (now: number) => {
         progress = now - start;
         fps = Math.round(1000 / (progress / ++increase) * 100) / 100;
         spaceTime.space += spaceTime.zoom * 1 / fps;
         canvas.style.left = `${spaceTime.space}px`;
         interval = requestAnimationFrame(step);
      }
      interval = requestAnimationFrame(step);

   }

   const stop = () => {
      window.cancelAnimationFrame(interval);
   }

   const moveAtZoom = (oldZoom: number) => {
      spaceTime.space *= (spaceTime.zoom / oldZoom);
      canvas.style.left = `${spaceTime.space}px`;
   }

   const moveAtClick = () => {
      canvas.style.left = `${spaceTime.space}px`;
   }

   return (
      <canvas id="cursor" ref={ref} />
   );
}
export default Cursor;
