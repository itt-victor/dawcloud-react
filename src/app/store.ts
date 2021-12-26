import { configureStore } from '@reduxjs/toolkit'
import { enableMapSet } from '@reduxjs/toolkit/node_modules/immer';
import trackReducer from '../components/Tracks/Track/trackSlice';
import webAudioReducer from '../services/webAudioSlice';
import buttonPadReducer from '../components/TopRow/Buttonpad/buttonPadSlice';
import tracksReducer from '../components/Tracks/tracksSlice';
import spaceTimeReducer from '../services/spaceTime';
import cursorReducer from '../components/Tracks/Cursor/cursorSlice';
import layoutReducer from '../components/Tracks/Layout/layoutSlice';
import masterBusReducer from '../services/masterBus';
import recordingReducer from '../components/Recording/RecordingSlice';

enableMapSet();

const store = configureStore({
   reducer: {
      spaceTime: spaceTimeReducer,
      webAudio: webAudioReducer,
      track: trackReducer,
      tracks: tracksReducer,
      buttonPad: buttonPadReducer,
      cursor: cursorReducer,
      layout: layoutReducer,
      masterBus: masterBusReducer,
      recordings: recordingReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
   }),
});

/* export const updateSpaceTime = (): AppThunk => {
   return (dispatch, getState) => {
   };
}; */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;