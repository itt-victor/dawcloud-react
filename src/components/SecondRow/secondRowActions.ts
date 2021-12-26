import { AppThunk } from "../../app/hooks";
import { setValue } from "../../services/spaceTime";

export const zoomIn = (): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime } = getState();
      dispatch(setValue({ field: 'zoom', value: Math.round(spaceTime.zoom * 1.25) }));
      if (getState().spaceTime.zoom >= 889)
         dispatch(setValue({ field: 'zoom', value: 889 }));
   };
};

export const zoomOut = (): AppThunk => {
   return (dispatch, getState) => {
      const { spaceTime } = getState();
      dispatch(setValue({ field: 'zoom', value: Math.round(spaceTime.zoom / 1.25) }));
      if (getState().spaceTime.zoom <= 5)
         dispatch(setValue({ field: 'zoom', value: 5 }));
   };
};