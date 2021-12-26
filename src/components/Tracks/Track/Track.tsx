import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleMute, handleSolo } from "./trackSlice";
import draw from "../../../services/drawingServices";
import { RecordingType } from "../../Recording/RecordingSlice";

const Track = ({ selectedTrack, trckNmber, handleSelection }: any) => {
   const allRecordings = useAppSelector(state => state.recordings.recordings);
   const [trackRecordings, setTrackRecordings] = React.useState<RecordingType[]>([]);

   const addRecording = (recording: RecordingType) => {
      const aux = [...trackRecordings];
      aux.push(recording)
      setTrackRecordings(aux);
   }
   const [setUp, isSetup] = React.useState(false);

   const dispatch = useAppDispatch();
   const trackData = useAppSelector(state => state.track.list[trckNmber]);
   const masterData = useAppSelector(state => state.masterBus);
   const { solo, mute } = useAppSelector(state => state.track.list[trckNmber]);
   const { isRecording } = useAppSelector(state => state.buttonPad);

   React.useEffect(() => {
      if (!setUp) {
         trackData.pannerNode.connect(trackData.gainNode);
         trackData.gainNode.connect(masterData.gainNode);
         isSetup(true);
      }
      if (isRecording && selectedTrack !== '') dispatch(draw('recordingTrack'));

      for (const i in allRecordings) {
         allRecordings[i].trackNumber === trckNmber && addRecording(allRecordings[i]);
      }
   }, [isRecording, mute, solo, selectedTrack, allRecordings]);

   return (
      <div className="newBox" onClick={handleSelection}>
         <div className="track_name" id={`track_name_${trckNmber}`} >
            <button className="select" >Track {trckNmber + 1}</button>
            <SoloButton solo={solo} trckNmber={trckNmber} />
            <MuteButton mute={mute} trckNmber={trckNmber} />
            <input type="text" className="input" autoComplete="false" placeholder="Name your track" />
         </div>
         <div className={"track " + selectedTrack} data-testid="Track" id={`track_${trckNmber}`} >
            {trackRecordings.map((Recording: RecordingType, i: number) =>
               <Recording.Component id={Recording.id} key={i} />
            )}
         </div>
      </div>
   );

}

const SoloButton = ({ solo, trckNmber }: any) => {
   const dispatch = useAppDispatch();
   return <button type="button" className={(solo ? 'track_solo track_solo_on' : 'track_solo')}
      id={`solo_${trckNmber}`} onClick={() => dispatch(handleSolo(trckNmber))} >S</button>;
}
const MuteButton = ({ mute, trckNmber }: any) => {
   const dispatch = useAppDispatch();
   return <button type="button" className={(mute ? 'track_mute track_mute_on' : 'track_mute')}
      id={`mute_${trckNmber}`} onClick={() => dispatch(handleMute(trckNmber))} >M</button>;
}

export default Track;