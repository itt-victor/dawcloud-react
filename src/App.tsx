import React from 'react';
import './App.scss';
import Loading from './components/Loading/Loading';
import Mixer from './components/Mixer/Mixer';
import SecondRow from './components/SecondRow/SecondRow';
import TopRow from './components/TopRow/TopRow';
import Tracks from './components/Tracks/Tracks';

function App() {
   const user = 'Angela';
   //const { spaceTime, masterData } = React.useContext(ctx);
   //masterData.gainNode.connect(spaceTime.audioCtx.destination);

   return (
      <div className="App antialiased">
         <Loading />
         <TopRow user={user} projects={['Test1', 'test2', 'Test3']} />
         <SecondRow />
         <Mixer />
         <section className="sound-clips">
            <Tracks />
         </section>
      </div>
   );
}

export default App;
