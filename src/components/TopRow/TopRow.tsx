import React from 'react';
import Buttonpad from './Buttonpad/Buttonpad';
import styles from './TopRow.module.scss';
import UserOptions from './UserOptions/UserOptions';

const TopRow = (props: any) => (
   <div className={styles.TopRow} data-testid="TopRow">
      <Buttonpad />
      <h1 id="page-title" className="h1 center"><a className="a_title" href="{{ route('home') }}">daw Cloud</a></h1>
      <UserOptions user={props.user} projects={props.projects} />
      <a href="{{ route('profile') }}" id="my_profile"><img className="config-icon" src="icons/config-icon.png" alt="" /></a>
      <span id="project-n" className="project-n"></span>
   </div>
);

export default TopRow;
