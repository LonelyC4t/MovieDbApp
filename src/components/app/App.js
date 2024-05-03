/* eslint-disable */
import React from 'react';

import FilmList from '../main/filmList';
import { api } from '../../api/api';

import './App.css';
import Header from '../header/header';

class App extends React.Component {

  state = {
    movieData: [],
    isLoading: true,
    onError: {
      error: false,
      errorMessage: '',
    },
    searchValue: '',
    totalResault: 0,
  };

  onChange = (e) => {    
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
      searchValue: e.target.value,
    }),
    () => {
      this.getData(this.state.searchValue);
    });
  };
  
  async getData(search) {
    try {
      let request = await api.getFilm(search);
      if (request.ok) {
        let response = await request.json();
      
        this.setState({
          movieData: response.results,
          isLoading: false,
          totalResault: response.total_results
        });
      };
    } catch(err) {
      
      this.setState({
        isLoading: false,
        onError: {
          error: true,
          errorMessage: err,
        },
      });
    }
  };

  componentDidMount() {
    this.getData("new kid");
  }
 
  render() {
    
    return (
      <>
        <Header 
        onChange={this.onChange}
        />
        <section className="movieApp">
          <FilmList 
          filmList={this.state.movieData} 
          loader={this.state.isLoading}
          error={this.state.onError}
          />
        </section>
      </>

    );
  }
}

export default App;
