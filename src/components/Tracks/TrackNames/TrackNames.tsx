import React from 'react';
import styles from './TrackNames.module.scss';

const TrackNames = () => (
   <div className={styles.TrackNames} data-testid="TrackNames">
      <div className="dummy-block"></div>
      {[...Array(8)].map((n: any, number: number) => (
         <div className="track_name" id={`track_name_${number}`} key={n} >
            <button className="select" key={n}>Track {number +1}</button>
            <button type="button" className="track_solo" id={`solo_${number}`} key={n}>S</button>
            <button type="button" className="track_mute" id={`mute_${number}`} key={n}>M</button>
            <input type="text" className="input" autoComplete="false" placeholder="Name your track" />
         </div>
      ))}
   </div>
);

export default TrackNames;
