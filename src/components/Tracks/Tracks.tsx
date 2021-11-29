import React, { useContext, useEffect, useRef, useState } from 'react';
import spaceTime from '../../services/spaceTime';
import Cursor from './Cursor/Cursor';
import Grid from './Grid/Grid';
import Layout from './Layout/Layout';
import Track from './Track/Track';
import styles from './Tracks.module.scss';

const Tracks = () => {
   //const [tracks, setTracks] = useState<JSX.Element[]>([]);
   const tracks: JSX.Element[] = [];

   for (let i = 0; i < spaceTime.howMany; i++) {
      tracks.push(<Track trackNumber={i} key={i} />);      
   }
   //setTracks(list);

//   useEffect(() => );

   return (
      <div className={styles.Tracks} data-testid="Tracks" id="tracks">

         <canvas id="start-mark" />
         <canvas id="end-mark" />
         <canvas id="grid-selector" />
         <Cursor />
         <Layout />
         <Grid />
         {[...tracks]}
      </div>
   );
}
export default Tracks;
