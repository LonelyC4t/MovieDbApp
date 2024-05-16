/* eslint-disable */

import React from 'react';
import './header.css';
import { api } from '../../api/api';

export default class HeaderRated extends React.Component {
    
  debounce = (cb) => {
    let time;
    return function (args) {
      clearTimeout(time);
      time = setTimeout(() => {
        cb(args);
      }, 1000);
    };
  };
  
  render() {
    const { changeTab, stateTab } = this.props;

    return (
      <header className="header">
        <div>
          <button className={stateTab.search ? `active` : ''} onClick={changeTab}>Search</button>
          <button className={stateTab.rated ? `active` : ''} onClick={changeTab}>Rated</button>
        </div>
      </header>
    );
  }
};
