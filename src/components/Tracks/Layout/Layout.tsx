import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import draw from '../../../services/drawingServices';
import { cursor } from '../Cursor/cursorSlice';
import { handleClick, setClick } from './layoutSlice';

const Layout = () => {
   const { timeSignatureValue, bpmValue } = useAppSelector(state => state.buttonPad);
   const { zoom } = useAppSelector(state => state.spaceTime);

   const dispatch = useAppDispatch();
   React.useEffect(() => {
      dispatch(draw('layout'));
   }, [timeSignatureValue, bpmValue, zoom]);

   return <canvas id="layout"
      onMouseDown={e => { dispatch(handleClick(e)); dispatch(setClick(true)); }}
      onMouseMove={e => { dispatch(handleClick(e)); dispatch(cursor('move')); }}
      onMouseUp={e => { dispatch(handleClick(e)); dispatch(setClick(false)); }} />;
}

export default Layout;