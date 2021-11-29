import React, { useContext } from 'react';
import spaceTime from '../../services/spaceTime';
import Cursor from './Cursor/Cursor';
import Grid from './Grid/Grid';
import Layout from './Layout/Layout';
import Track from './Track/Track';
import styles from './Tracks.module.scss';

const Tracks = () => {
   return (
      <div className={styles.Tracks} data-testid="Tracks" id="tracks">

         <canvas id="start-mark"></canvas>
         <canvas id="end-mark"></canvas>
         <canvas id="grid-selector"></canvas>
         <Cursor />
         <Layout />
         <Grid />

         {[...Array(spaceTime.howMany)].map((n: any, number: number) => (
            <Track trackNumber={number} key={number} />
         ))}
      </div>
   );
}
export default Tracks;
