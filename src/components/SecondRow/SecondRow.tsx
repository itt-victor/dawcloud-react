import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import styles from './SecondRow.module.scss';
import { zoomIn, zoomOut } from './secondRowActions';

const SecondRow = () => {
   const dispatch = useAppDispatch();

   return (
      <div className={styles.SecondRow} data-testid="SecondRow">
         <div id="toolbox">
            <button id="normal_function" className="btn btn-outline-info"><img width="20px" height="20px"
               src="icons/normal_cursor.png" alt="" /></button>
            <button id="cut_function" className="btn btn-outline-info"><img width="20px" height="20px"
               src="icons/cut_icon.svg" alt="" /></button>
         </div>
         <div className="snap-to-grid">
            <button id="snap-button" className="btn btn-outline-info">
               <img width="20px" height="20px" src="icons/grid-icon.png" alt="" /></button>
            <select id="snap_ratio" className="form-select">
               <option value="1">1/1</option>
               <option value="0.5">1/2</option>
               <option value="0.25">1/4</option>
               <option value="0.125">1/8</option>
               <option value="0.0625">1/16</option>
            </select>
         </div>
         <div className="zoom-btn">
            <button id="zoomin" type="button" className="btn btn-outline-info" onClick={() => dispatch(zoomIn())} >+</button>
            <button id="zoomout" type="button" className="btn btn-outline-info" onClick={() => dispatch(zoomOut())} >-</button>
         </div>
      </div>
   );
}

export default SecondRow;
