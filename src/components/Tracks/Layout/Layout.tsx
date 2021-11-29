import React, { useEffect } from 'react';
import drawingServices from '../../../services/drawingServices';
import spaceTime from '../../../services/spaceTime';

const Layout = () => {

   useEffect(() => {
      drawingServices.layout();
   });

   return <canvas id="layout" />;
}

export default Layout;