import React from 'react';
import './header.css';

export default class HeaderRated extends React.Component {
  componentDidMount() {
    this.props.getRatedFilm();
  }
  render() {
    const { changeTab, stateTab } = this.props;
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
      </header>
    );
  }
}
