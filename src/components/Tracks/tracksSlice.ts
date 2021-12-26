import { createSlice } from '@reduxjs/toolkit';
import { spaceTime } from '../../services/spaceTime';

export const tracksState = {
   oldId: 0, selectedTracks: [...(() => {
      const trackList: string[] = [];
      for (let i = 0; i < spaceTime.howMany; i++) {
         trackList[i] = '';
         if (i === 0) trackList[i] = 'data-selected';
      }
      return trackList;
   })()], selectedTrack: 0
};

export const tracksSlice = createSlice({
   name: 'tracks',
   initialState: tracksState,
   reducers: {
      handleSelection(state, { payload }) {
         state.selectedTrack = payload;
         state.selectedTracks[state.oldId] = '';
         state.selectedTracks[payload] = 'data-selected';
         state.oldId = payload;
      }
   }
});

export const { handleSelection } = tracksSlice.actions;

export default tracksSlice.reducer;

