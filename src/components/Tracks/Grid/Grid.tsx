import React, { useEffect } from 'react';
import drawingServices from '../../../services/drawingServices';
import spaceTime from '../../../services/spaceTime';

const Grid = () => {

   useEffect(() => {
      const canvas = document.querySelector('#canvas-grid') as HTMLCanvasElement;
      canvas.height = 60 * spaceTime.howMany;
      canvas.style.height = `${60 * spaceTime.howMany}px`;
      canvas.width = 10000;
      drawingServices.grid();
   });

   return <canvas id="canvas-grid" />;
}

export default Grid;