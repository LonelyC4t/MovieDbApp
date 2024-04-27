import React from 'react';

import FilmList from '../main/filmList';
import { api } from '../../api/api';

import './App.css';

class App extends React.Component {
  state = {
    movieData: [],
  };

  async getData() {
    let request = await api.getFilm('new kid');
    let response = await request.json();

    this.setState({
      movieData: response.results,
    });

    return response;
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <section className="movieApp">
        <FilmList filmList={this.state.movieData} />
      </section>
    );
  }
}

export default App;
