import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import draw from '../../../services/drawingServices';

const Grid = () => {

   const spaceTime = useAppSelector(state => state.spaceTime);
   const { timeSignatureValue, bpmValue } = useAppSelector(state => state.buttonPad)
   const dispatch = useAppDispatch();
   const [setUp, isSetup] = React.useState(false);
   React.useEffect(() => {
      if (!setUp) {
         const canvas = document.querySelector('#canvas-grid') as HTMLCanvasElement;
         canvas.height = 60 * spaceTime.howMany;
         canvas.style.height = `${60 * spaceTime.howMany}px`;
         canvas.width = 10000;
         isSetup(true);
      }
      dispatch(draw('grid'));
   }, [timeSignatureValue, bpmValue, spaceTime.zoom]);

   return <canvas id="canvas-grid" />;
}

export default Grid;