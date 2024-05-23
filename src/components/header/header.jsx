import React from 'react';
import './header.css';

export default class Header extends React.Component {
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
    const { onChange, changeTab, stateTab } = this.props;

    return (
      <header className="header">
        <div>
          <button className={stateTab.search ? 'active' : ''} onClick={changeTab}>
            Search
          </button>
          <button className={stateTab.rated ? 'active' : ''} onClick={changeTab}>
            Rated
          </button>
        </div>
        {stateTab.search && <input placeholder="Type to search" onChange={this.debounce(onChange)} />}
      </header>
    );
  }
}
