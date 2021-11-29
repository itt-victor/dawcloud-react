import React, { createRef } from "react";
import { masterData} from "../../../App";
import { WebAudio } from "../../../services/WebAudio";

interface props {
   trackNumber: number;
}
interface states {
   muteOn: boolean;
   soloOn: boolean;
   soloCLass: string;
   muteClass: string;
}

export default class Track extends React.Component<props, states> {

   private _trackNumber: number;
   public get trackNumber(): number { return this._trackNumber; }
   public set trackNumber(number: number) { this._trackNumber = number }

   public parent: this;
   fader: HTMLElement;
   Y: number;

   private _pannerValue: string;
   public get pannerValue(): string {
      return this._pannerValue;
   }
   public set pannerValue(value: string) {
      this._pannerValue = value;
   }

   private _gainValue: number;
   public get gainValue(): number {
      return this._gainValue;
   }
   public set gainValue(value: number) {
      this._gainValue = value;
   }

   private _name!: string;
   get name(): string {
      return this._name;
   }
   set name(value: string) {
      this._name = value;
   }
   pannerNode = WebAudio.audioCtx.createStereoPanner();
   gainNode = WebAudio.audioCtx.createGain();
   ref = createRef<HTMLElement>();
   trackDOMElement: HTMLElement = this.ref.current as HTMLElement;

   constructor(props: any) {

      super(props);
      this.state = {
         muteOn: false,
         soloOn: false,
         soloCLass: 'track_solo',
         muteClass: 'track_mute'
      };

      this._trackNumber = this.props.trackNumber;
      this._pannerValue = 'C';
      this._gainValue = 1;
      this.parent = this;
      this.fader = document.getElementById(`fader_${this.props.trackNumber}`) as HTMLInputElement;
      this.Y = 20;

      this.pannerNode.connect(this.gainNode);
      this.gainNode.connect(masterData.gainNode);
      masterData.tracks.push(this);
   }

   SoloButton = () => {

      const handleSolo = () => {

         (!this.state.soloOn) ? 
         this.setState({soloOn: true, soloCLass: 'track_solo track_solo_on'}) :
         this.setState({soloOn: false, soloCLass: 'track_solo'});

         for (const track of masterData.tracks) {
            
            if (track.state.soloOn) {
               masterData.solo = true;
               break;
            }
            else masterData.solo = false;
         }
         for (const track of masterData.tracks) {
            if (masterData.solo) {
               (track.state.soloOn) ?
                  WebAudio.solo(track) :
                  WebAudio.mute(track.gainNode);
            }
            else if (track.state.muteOn) return;
            else WebAudio.solo(track);
         }
      }

      return <button type="button" className={this.state.soloCLass} id={`solo_${this.props.trackNumber}`}
         onClick={handleSolo} >S</button>;
   }

   MuteButton = () => {
      const handleMute = () => {

         if (!this.state.muteOn) {
            WebAudio.mute(this.gainNode);
            this.setState({ muteOn: true });
            this.setState({ muteClass: `track_mute track_mute_on` });
         } else if (this.state.muteOn) {
            WebAudio.solo(this);
            this.setState({ muteOn: false });
            this.setState({ muteClass: `track_mute` });
         }
         for (const track of masterData.tracks) {
            if (track.state.muteOn) WebAudio.mute(track.gainNode);
         }
      }

      return (<button type="button" className={this.state.muteClass} id={`mute_${this.props.trackNumber}`}
         onClick={handleMute} >M</button>);
   }

   render() {
      return (
         <div className="newBox" >
            <div className="track_name" id={`track_name_${this.props.trackNumber}`} >
               <button className="select" >Track {this.props.trackNumber + 1}</button>
               <this.SoloButton />
               <this.MuteButton />
               <input type="text" className="input" autoComplete="false" placeholder="Name your track" />
            </div>
            <div className="track" data-testid="Track" id={`track_${this.props.trackNumber}`} >
            </div>
         </div>
      );
   }
}