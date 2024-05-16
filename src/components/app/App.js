/* eslint-disable */
import React from 'react';

import FilmList from '../main/filmList';
import { api } from '../../api/api';

import './App.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import HeaderRated from '../header/headerRated';
import {GenresProvider} from '../../provaiderContext/movieAppContext';

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
    totalPages: 0,
    tab: {
      search: true,
      rated: false,
    },
  };

  changeTab = (e) => {
    if(e.target.textContent === 'Rated') {
      this.setState({
        tab: {
          search: false,
          rated: true,
        },
      });
    } else if(e.target.textContent === 'Search') {
      this.setState({
        tab: {
          search: true,
          rated: false,
        },
      });
    };
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
  async getGenres(){
    let response = await api.getGenres()
    let request = await response.json()
    this.setState({
      genres: request.genres,
    });
  };
  async getIdSession() {
    let response = await api.createGuestSession()
    let request = await response.json()
    document.cookie = `guest_session_id=${request.guest_session_id}; path=/; expires=Tue, ${new Date(request.expires_at)}`
    
  };
  componentDidMount() {
    this.getData("new kid", 1);
    this.getIdSession();
    this.getGenres()
    
  }
 
  render() {
    if(this.state.tab.search === true) {
      return (
        <>
        <GenresProvider value={this.state.genres}>
          <section className="movieApp">
          <Header 
          onChange={this.onChange}
          changeTab={this.changeTab}
          stateTab={this.state.tab}
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
        </GenresProvider>
      </>
      )
    } else if(this.state.tab.rated === true) {
      return (
        <>
        <GenresProvider value={this.state.genres}>
          <section className="movieApp">
            <HeaderRated
            changeTab={this.changeTab}
            stateTab={this.state.tab}
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
        </GenresProvider>
      </>
      )
    }
  }
}

export default App;
