import React, { createContext } from 'react';
import './App.scss';
import Loading from './components/Loading/Loading';
import Mixer from './components/Mixer/Mixer';
import SecondRow from './components/SecondRow/SecondRow';
import TopRow from './components/TopRow/TopRow';
//import TrackNames from './components/Tracks/TrackNames/TrackNames';
import Tracks from './components/Tracks/Tracks';
import { MasterData } from './services/MasterData';
import spaceTime from './services/spaceTime';

export const masterData = new MasterData();

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
