import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/hooks";
import { setValue } from "../../../services/spaceTime";
import { webAudioActions } from "../../../services/webAudioSlice";

export const buttonPadSlice = createSlice({
   name: 'layout',
   initialState: { click: false },
   reducers: {
      setClick(state, { payload }) {
         state.click = payload;
      }
   }
});

export const { setClick } = buttonPadSlice.actions;

export default buttonPadSlice.reducer;

export const handleClick = (event: React.MouseEvent): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime, layout, buttonPad } = getState();
      if (layout.click) {

         const space = (spaceTime.snap.toggle)
            ? spaceTime.snap.result * Math.round(event.nativeEvent.offsetX / spaceTime.snap.result)
            : Math.max(event.nativeEvent.offsetX, 0);
         dispatch(setValue({ field: 'space', value: space }));
         if (buttonPad.isPlaying) {
            dispatch(webAudioActions('stop'));
            dispatch(webAudioActions('playSound'));
         }
      }
      window.addEventListener('mouseup', () => dispatch(setClick(false)));
   };
};