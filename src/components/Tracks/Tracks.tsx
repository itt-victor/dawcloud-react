import React, { useContext, useEffect, useRef, useState } from 'react';
import spaceTime from '../../services/spaceTime';
import Recording from '../Recording/Recording';
import Cursor from './Cursor/Cursor';
import Grid from './Grid/Grid';
import Layout from './Layout/Layout';
import Track from './Track/Track';
import styles from './Tracks.module.scss';

const Tracks = () => {
   const [tracks, setTracks] = useState<JSX.Element[]>([]);
   const [recordings, setRecordings] = useState<JSX.Element[]>([]);
   const trackList: JSX.Element[] = [];
   const recordingList: JSX.Element[] = [];



   for (let i = 0; i < spaceTime.howMany; i++) {
      trackList.push(<Track trackNumber={i} key={i} />);      
   }

//   useEffect(() => );

   return (
      <div className={styles.Tracks} data-testid="Tracks" id="tracks">

         <canvas id="start-mark" />
         <canvas id="end-mark" />
         <canvas id="grid-selector" />
         <Cursor />
         <Layout />
         <Grid />
         {[...trackList]}
      </div>
   );
}
export default Tracks;
