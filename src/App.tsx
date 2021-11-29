import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import './App.scss';
import Loading from './components/Loading/Loading';
import Mixer from './components/Mixer/Mixer';
import Recording, { RecordArgs } from './components/Recording/Recording';
import SecondRow from './components/SecondRow/SecondRow';
import TopRow from './components/TopRow/TopRow';
//import TrackNames from './components/Tracks/TrackNames/TrackNames';
import Tracks from './components/Tracks/Tracks';
import { MasterData } from './services/MasterData';
import spaceTime from './services/spaceTime';
import { WebAudio } from './services/WebAudio';

export const masterData = new MasterData();

const addRecording = (
   recordings: JSX.Element[],
   setRecording: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
   recordingId: string = '',
   trackNumber: number = 0,
   timeToStart: number = 0,
   audioBuffer: AudioBuffer = WebAudio.audioCtx.createBuffer(1, 1, 3000),
   offset: number = 0,
   duration: number = 0
) => {
   setRecording([...recordings, <Recording
      recordingId={recordingId}
      trackNumber={trackNumber}
      timeToStart={timeToStart}
      audioBuffer={audioBuffer}
      offset={offset}
      duration={duration} />]);
   return recordings;
};

export const recordingCtx = React.createContext(addRecording);


function App() {
   const user = 'Angela';
   return (
      <div className="App antialiased">
         <Loading />
         <TopRow user={user} projects={['Test1', 'test2', 'Test3']} />
         <SecondRow />
         <Mixer />
         <section className="sound-clips">
            {/*<TrackNames />*/}
            <Tracks />
         </section>
      </div>
   );
}

export default App;
