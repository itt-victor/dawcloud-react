import { createSlice } from '@reduxjs/toolkit';
import { generateRecordingId } from '../../../services/utils';
import { AppThunk } from '../../../app/hooks';
import { time } from '../../../services/spaceTime';
import { webAudioActions } from '../../../services/webAudioSlice';
import { createRecording } from '../../Recording/RecordingSlice';
import { cursor } from '../../Tracks/Cursor/cursorSlice';

export const buttonPadSlice = createSlice({
   name: 'buttonPad',
   initialState: {
      disablePlay: false,
      disableStop: true,
      disableRecord: false,
      isPlaying: false,
      isRecording: false,
      recordStyle: '',
      bpmScreen: `${Math.round(120 / 1)} bpm`,   //IGUAL HAY UE CAMBIARLO CUANDO SE GUARDE Y CARGUE
      bpmValue: 1,
      timeSignatureScreen: '4/4',
      timeSignatureValue: 2,
      inputType: 'hidden'
   },
   reducers: {
      handlePlay(state) {
         !state.isPlaying && (state.isPlaying = true);
         state.disablePlay = true;
         state.disableStop = false;
      },

      handleStop(state) {
         state.isPlaying && (state.isPlaying = false);
         state.disablePlay = false;
         state.disableStop = true;
      },

      handleTimeSignature(state) {
         if (state.timeSignatureScreen === '4/4') {
            state.timeSignatureScreen = '3/4';
            state.timeSignatureValue = 1.5;
         } else {
            state.timeSignatureScreen = '4/4';
            state.timeSignatureValue = 2;
         }
      },

      recordStart(state) {
         state.isPlaying = true;
         state.isRecording = true;
         state.recordStyle = 'red';
         state.disableStop = false;
         state.disablePlay = true;
         state.disableRecord = true;
      },

      setValue(state, { payload }) {
         (state as any)[payload.field] = payload.value;
      }
   },
});

export const handleBpm = (inputRef: React.RefObject<HTMLInputElement>): AppThunk => {
   return (dispatch, getState) => {

      const state = getState().buttonPad;
      const input = inputRef.current as HTMLInputElement;
      if (state.inputType === 'hidden') {
         dispatch(setValue({ field: 'bpmScreen', value: '' }));
         dispatch(setValue({ field: 'inputType', value: 'text' }));
         input.focus();
      }

      window.addEventListener('click', function br(a) {
         for (const node of (a.target as HTMLElement).children) {
            if (node !== input as HTMLElement) {
               dispatch(setValue({ field: 'inputType', value: 'hidden' }));
               dispatch(setValue({ field: 'bpmScreen', value: `${Math.round(120 / getState().buttonPad.bpmValue)} bpm` }));
               this.removeEventListener('click', br);
            }
         }
      });
      (input as HTMLInputElement).addEventListener('keypress', function (o) {
         if (o.key === 'Enter') {
            o.preventDefault();
            dispatch(setValue({ field: 'bpmValue', value: 120 / parseInt(this.value) }));
            dispatch(setValue({ field: 'bpmScreen', value: `${Math.round(120 / getState().buttonPad.bpmValue)} bpm` }));
            dispatch(setValue({ field: 'inputType', value: 'hidden' }));
         }
      });
   };
};

export const handleAudio = (action: string): AppThunk => {
   return (dispatch, getState) => {
      switch (action) {
         case 'play': {
            dispatch(handlePlay());
            dispatch(time());
            dispatch(cursor('play'));
            dispatch(webAudioActions('playSound'));
            break;
         }

         case 'stop': {
            dispatch(handleStop());
            dispatch(time());
            dispatch(cursor('stop'));
            dispatch(webAudioActions('stop'));
            break;
         }
         case 'record': {
            dispatch(time());
            const { spaceTime, webAudio, buttonPad } = getState();
            
            if (navigator.mediaDevices.getUserMedia) {
               const useSuccess = (stream: MediaStream) => {
                  let startingTime = spaceTime.time;
                  let chunks: any[] = [];
                  const mediaRecorder = new MediaRecorder(stream);
                  mediaRecorder.ondataavailable = (event: { data: any; }) => chunks.push(event.data);
                  mediaRecorder.start(100);

                     if (!buttonPad.isPlaying) {
                        dispatch(cursor('play'));
                        dispatch(webAudioActions('playSound'));
                        dispatch(setValue({ field: 'isPlaying', value: true }));
                     }

                  console.log(mediaRecorder.state);
                  dispatch(recordStart());

                  (document.querySelector('#stop-button') as HTMLButtonElement).onclick = () => {
                     if (getState().buttonPad.isRecording) {
                        mediaRecorder.stop();
                        console.log(mediaRecorder.state);
                        dispatch(setValue({ field: 'recordStyle', value: '' }));
                        dispatch(setValue({ field: 'disableRecord', value: false }));
                     }
                  }

                  mediaRecorder.onstop = () => {
                     dispatch(setValue({ field: 'isRecording', value: false }));
                     const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                     chunks = [];
                     blob.arrayBuffer().then(arrayBuffer =>
                        webAudio.audioCtx.decodeAudioData(arrayBuffer, (audioBuffer: AudioBuffer) => {
                           const latency = 0.01; //LATENCIA, HAY QUE MIRAR ESTO BIEN

                           const args = {
                              id: generateRecordingId(),
                              timeToStart: startingTime - latency,
                              audioBuffer,
                              offset: 0,
                              duration: audioBuffer.duration,
                              copy: false
                           };
                           dispatch(createRecording(args));
                        })
                     );
                  }
               }
               const error = () => console.log('The following error occured: ' + error);;
               navigator.mediaDevices.getUserMedia({ audio: true }).then(useSuccess, error);
            } else alert('getUserMedia not supported on your browser!');
            break;
         }
      }
   };
};

export const { handlePlay, handleStop, handleTimeSignature, setValue, recordStart } = buttonPadSlice.actions;

export default buttonPadSlice.reducer;

