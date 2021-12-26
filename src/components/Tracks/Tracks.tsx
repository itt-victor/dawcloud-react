import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Cursor from './Cursor/Cursor';
import Grid from './Grid/Grid';
import Layout from './Layout/Layout';
import Track from './Track/Track';
import styles from './Tracks.module.scss';
import { handleSelection } from './tracksSlice';

const Tracks = () => {

   const spaceTime = useAppSelector(state => state.spaceTime);
   const selectedTracks = useAppSelector(state => state.tracks.selectedTracks);
   const dispatch = useAppDispatch();

   return (
      <div className={styles.Tracks} data-testid="Tracks" id="tracks">

         <canvas id="start-mark" />
         <canvas id="end-mark" />
         <canvas id="grid-selector" />
         <Cursor />
         <Layout />
         <Grid /> 
         {[...Array(spaceTime.howMany)].map((a, i) =>
            <Track trckNmber={i} selectedTrack={selectedTracks[i]}
               handleSelection={() => dispatch(handleSelection(i))} key={i} />
         )}
      </div>
   );
}
export default Tracks;
