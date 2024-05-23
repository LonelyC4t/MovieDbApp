import React from 'react';

import FilmList from '../main/itemMain/filmList';
import { api } from '../../api/api';
import './App.css';
import Header from '../header/header';
import { GenresProvider } from '../../provaiderContext/movieAppContext';

class App extends React.Component {
  state = {
    ratedMovieData: [],
    searchValue: 'return',
    tab: {
      search: true,
      rated: false,
    },
  };

  changeTab = (e) => {
    if (e.target.textContent === 'Rated') {
      this.setState({
        tab: {
          search: false,
          rated: true,
        },
      });
    } else if (e.target.textContent === 'Search') {
      this.setState({
        tab: {
          search: true,
          rated: false,
        },
      });
    }
  };

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  async getGenres() {
    let response = await api.getGenres();
    let request = await response.json();
    this.setState({
      genres: request.genres,
    });
  }
  async getIdSession() {
    let response = await api.createGuestSession();
    let request = await response.json();
    document.cookie = `guest_session_id=${request.guest_session_id}; path=/; expires=Tue, ${new Date(request.expires_at)}`;
  }

  componentDidMount() {
    this.getIdSession();
    this.getGenres();
  }

  render() {
    return (
      <>
        <GenresProvider value={this.state.genres}>
          <section className="movieApp">
            <Header onChange={this.onChange} changeTab={this.changeTab} stateTab={this.state.tab} />
            <FilmList searchValue={this.state.searchValue} stateTab={this.state.tab} />
          </section>
        </GenresProvider>
      </>
    );
  }
}

export default App;
