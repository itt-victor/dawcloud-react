import React from 'react';
import spaceTime from '../../../services/spaceTime';
import { generateRecordingId } from '../../../services/utils';
import { masterData} from "../../../App";
import { WebAudio } from '../../../services/WebAudio';
import styles from './UserOptions.module.scss';

const UserOptions = (props: any) => {

   const loadSound = (a: Event) => {

      //loading(); eStop();
      const reader = new FileReader();
      reader.onload = e => {
         const trcknr = parseInt((document.querySelector('[data-selected]') as HTMLElement).id.charAt(6));
         WebAudio.audioCtx.decodeAudioData((e.target as FileReader).result as ArrayBuffer).then(audioBuffer => {
            const args: any/*RecordArgs*/ = {
               recordingId: generateRecordingId(),
               timeToStart: spaceTime.time(),
               audioBuffer,
               offset: 0,
               duration: audioBuffer.duration,
               copy: false
            };
            //masterData.tracks[trcknr].addRecord(args);
         });
      }
      if (((a.target as HTMLInputElement & EventTarget).files as FileList).length > 0)
         reader.readAsArrayBuffer(((
            (a.target as HTMLInputElement & EventTarget).files as FileList)
         [((a.target as HTMLInputElement & EventTarget).files as FileList).length - 1])
         );
   }

   const LoadDialogue = (props: any) => {
      if (props.projects.lentgh !== 0) return (
         <div id="load_dialogue">
            <p className="dummy-space2"><span className="x-button2" id="projects-close">&#10006;</span></p>
            {props.projects.map((project: any, key: number) => (
               <button className="projects btn" id={project} key={key}>{project}
                  <span className="x-button3">&#10006;</span>
               </button>
            ))}
            <div className="delete_confirmation">
               <p>Are you sure you want to delete this project?</p>
               <button id="delete_confirm">Ok</button><button id="delete_cancel">Cancel</button>
            </div>
         </div>
      );
      else return (
         <div id="load_dialogue">
            <p>No projects yet!! <span className="x-button2" id="projects-close">&#10006;</span></p>
         </div>
      );
   }

   if (props.user)
      return (
         <div className={styles.UserOptions} data-testid="UserOptions" id="user_options">
            <div className="img-container"><img className="avatar" src="storage/users/avatars/{{ Auth::user()->avatar }}" alt="" />
            </div>
            <button id="user_welcome" type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">Hello {props.user}</button>
            <div className="dropdown-menu" aria-labelledby="user_welcome">
               <button id="load_project" className="btn btn-outline-info dropdown-item">My projects</button>
               <button id="save_project" className="btn btn-outline-info dropdown-item">Save</button>
               <button id="save_project_as" className="btn btn-outline-info dropdown-item">Save as</button>
               <label id="load_sound" htmlFor="load_sound_hidden"
                  className="btn btn-outline-info dropdown-item">Import</label>
               <input type="file" id="load_sound_hidden" className="btn btn-outline-info dropdown-item"
                  accept="audio/wav, audio/mp3" />
               <button id="export_sound" className="btn btn-outline-info dropdown-item">Export</button>
               <button id="log_out" className="btn btn-outline-info dropdown-item"><a
                  href="{{ route('logout') }}">Log out</a></button>
            </div>
            <LoadDialogue projects={props.projects} />
            <div id="save_dialogue">
               <p className="padding-to-text">Enter the name of your new or existing project:</p>
               <span className="x-button4" id="save-close">&#10006;</span>
               <input id="project_name" type="text" />
            </div>

         </div>
      ); else return (
         <div className={styles.UserOptions} data-testid="UserOptions" id="user_options">
            <p id="signup_now">Sign up now, and start managing your projects</p>
            <form id="signup_reminder" method="POST" action="{{ route('signup') }}">
               <p className="signup_reminder_text">Create account. It's free <span className="x-button">&#10006;</span></p>
               <label htmlFor="signup_email">Email</label>
               <input type="email" className="" name="email" autoComplete="off" />
               <label htmlFor="signup_username">User Name</label>
               <input type="text" className="" name="user_name" autoComplete="off" />
               <label htmlFor="signup_password">Password</label>
               <input type="password" className="" name="password" autoComplete="off" />
               <button id="register2" type="submit" className="btn btn-outline-info">Sign Up!</button>
            </form>
         </div>
      );
}
export default UserOptions;
