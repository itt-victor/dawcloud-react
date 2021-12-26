import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cursor, isDrawn } from './cursorSlice';

const Cursor = () => {
   const { zoom } = useAppSelector(state => state.spaceTime);
   const dispatch = useAppDispatch();
   const [drawn, setDrawn] = useState(false);
   React.useEffect(() => {
      if (!drawn) {
         dispatch(cursor('draw'));
         setDrawn(true);
      }
      dispatch(cursor('move'));
   }, [zoom]);

   return (
      <canvas id="cursor" />
   );
}
export default Cursor;
