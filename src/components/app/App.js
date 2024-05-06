/* eslint-disable */
import React from 'react';

import FilmList from '../main/filmList';
import { api } from '../../api/api';

import './App.css';
import Header from '../header/header';
import Footer from '../footer/footer';

class App extends React.Component {

  state = {
    movieData: [],
    isLoading: true,
    onError: {
      error: false,
      errorMessage: '',
    },
    page: 1,
    searchValue: '',
    totalResault: 0,
    totalPages: 0
  };

  onChange = (e) => {    
    
    this.setState((prevState) => ({
      page:1,
      isLoading: !prevState.isLoading,
      searchValue: e.target.value,
      
    }),
    () => {
      this.getData(this.state.searchValue, this.state.page);
    });
    
  };

  changePage = (page) => {
    if (typeof (page) === "number") {
      this.setState((prevState) => ({
        page: page,
        isLoading: !prevState.isLoading,
      }),
      () => {
        this.getData(this.state.searchValue, this.state.page)
        
      })
    } else if (page === "increment") {
      this.setState((prevState) => ({
        page: prevState.page + 1,
        isLoading: !prevState.isLoading,
      }),
      () => {
        this.getData(this.state.searchValue, this.state.page)
      });

    } else if(page === "decrement") {
      this.setState((prevState) => ({
        page: prevState.page - 1,
        isLoading: !prevState.isLoading,
      }),
      () => {
      this.getData(this.state.searchValue, this.state.page)
    })}
  };
  
  async getData(search, page) {
    if (search.trim().length > 0){
    try {
      let request = await api.getFilm(search.trim(), page);
      if (request.ok) {
        let response = await request.json();

      
        this.setState({
          movieData: response.results,
          isLoading: false,
          totalResault: response.total_results,
          totalPages: response.total_pages
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
    }} else if (search.trim().length === 0){
      this.setState((prevSate) => ({
        movieData: prevSate.movieData,
        isLoading: !prevSate.isLoading,
        totalResault: prevSate.totalResault
      }));
      this.getData("new kid", 1);
    };
  };

  componentDidMount() {
    this.getData("new kid", 1);
  }
 
  render() {
    return (
      <>
        <section className="movieApp">
        <Header 
        onChange={this.onChange}
        />
          <FilmList 
          filmList={this.state.movieData} 
          loader={this.state.isLoading}
          error={this.state.onError}
          totalResault={this.state.totalResault}
          searchValue={this.state.searchValue}
          />
          <Footer totalPages={this.state.totalPages} 
          changePage={this.changePage}
          page={this.state.page}
          />
        </section>
        
      </>

    );
  }
}

export default App;
