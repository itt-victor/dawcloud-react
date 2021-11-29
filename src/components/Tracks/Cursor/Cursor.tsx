import React, { useContext, useEffect, useRef, useState } from 'react';
import drawingServices from '../../../services/drawingServices';
import spaceTime from '../../../services/spaceTime';
import service from './Cursor.service';
import styles from './Cursor.module.scss';

const Cursor = () => {

   useEffect(() => { service.draw(); });

   return (
      <canvas id="cursor" />
   );
}
export default Cursor;
