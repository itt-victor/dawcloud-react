import React from 'react';
import spaceTime from '../../services/spaceTime';
import styles from './Mixer.module.scss';

const Mixer = () => {

   return (
      <div className={styles.Mixer} data-testid="Mixer" id="mixer" >
         {[...Array(spaceTime.howMany)].map((n: any, number: number) => (
            <div className="fader" id={`fader_${number}`} key={number}>
               <button className="fader-knob" />
               <div className="trcknr">{number + 1}</div>
            </div>
         ))}
         <div className="fader" id="master_fader"><button className="fader-knob" />
            <div className="trcknr mxrmstr">Master</div>
         </div>
         {[...Array(spaceTime.howMany)].map((n: any, number: number) => (
            <button className="panner btn btn-outline-info" id={`panner_${number}`} key={number}>C</button>
         ))}
      </div>
   );
}
export default Mixer;
