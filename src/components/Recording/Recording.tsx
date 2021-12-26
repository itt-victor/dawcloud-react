import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleClick, printRecording } from "./RecordingSlice";

const Recording = ({ id }: any) => {

   const dispatch = useAppDispatch();
   const spaceTime = useAppSelector(state => state.spaceTime);
   const recording = useAppSelector(state => state.recordings.recordings[id]);
   const { isSelected } = useAppSelector(state => state.recordings.recordings[id]);
   const canvasRef = useRef<HTMLCanvasElement>(null);

   React.useEffect(() => {

      !isSelected ?
         dispatch(printRecording(
            recording,
            canvasRef.current as HTMLCanvasElement,
            recording.offCanvas[spaceTime.zoom].width,
            recording.offCanvas[spaceTime.zoom],
            recording.offset * spaceTime.zoom,
            recording.duration * spaceTime.zoom,
            'print'
         ))
         :
         dispatch(printRecording(
            recording,
            canvasRef.current as HTMLCanvasElement,
            recording.offSelectedCanvas[spaceTime.zoom].width,
            recording.offSelectedCanvas[spaceTime.zoom],
            recording.offset * spaceTime.zoom,
            recording.duration * spaceTime.zoom,
            'print'
         ));

      // if (!copy) drawWaveforms();
      /* editRecording(this);
      cutRecording(this);
      copyPaste(this); */
      //removeRecording(this);

   }, [isSelected, spaceTime.zoom])

   return (
      <canvas className={`recording`} data-testid="Recording" id={id} ref={canvasRef} onClick={() => dispatch(handleClick(id))} />
   );
};

export default Recording;
