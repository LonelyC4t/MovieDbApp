import React from 'react';
import { Spin, Alert, Pagination } from 'antd';

import { api } from '../../../api/api';

import './itemFilm.css';
import ItemFilm from './itemFilm';

export default class FilmList extends React.Component {
  state = {
    searchValue: 'return',
    movieData: [],
    ratedMovieData: [],
    isLoading: true,
    onError: {
      error: false,
      errorMessage: '',
    },
    totalResault: 0,
    totalPages: 0,
    page: 1,
  };

  async getData(search, page) {
    if ((search ? search : '').trim().length > 0) {
      try {
        let request = await api.getFilm(search.trim(), page);
        if (request.ok) {
          let response = await request.json();
          this.setState({
            searchValue: search,
            movieData: response.results,
            isLoading: false,
            totalResault: response.total_results,
            totalPages: response.total_pages,
            onError: {
              error: false,
            },
          });
        }
      } catch (err) {
        this.setState({
          isLoading: false,
          onError: {
            error: true,
            errorMessage: err,
          },
        });
      }
    } else if ((search ? search : '').trim().length === 0) {
      this.setState((prevSate) => ({
        searchValue: prevSate.search,
        movieData: prevSate.movieData,
        isLoading: !prevSate.isLoading,
        totalResault: prevSate.totalResault,
      }));
    }
  }

  getRatedFilm = async () => {
    try {
      let request = await api.getRated(getCookie('guest_session_id'));
      if (request.ok) {
        let response = await request.json();
        this.setState((prevSate) => ({
          ratedMovieData: response.results,
          isLoading: !prevSate.isLoading,
        }));
      } else {
        throw new Error(`Что-то пошло не так, статус ошибки - ${request.status}`);
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        onError: {
          error: true,
          errorMessage: err,
        },
      });
    }

    function getCookie(name) {
      let cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    }
  };
  async sendRate(id, rate) {
    await api.addRating(id, getCookie('guest_session_id'), rate);
    function getCookie(name) {
      let cookie = document.cookie.split('; ').find((row) => row.startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    }
  }
  changePage = (page) => {
    if (typeof page === 'number') {
      this.setState(
        (prevState) => ({
          page: page,
          isLoading: !prevState.isLoading,
        }),
        () => {
          this.getData(this.state.searchValue, this.state.page);
        }
      );
    } else if (page === 'increment') {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
          isLoading: !prevState.isLoading,
        }),
        () => {
          this.getData(this.state.searchValue, this.state.page);
        }
      );
    } else if (page === 'decrement') {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
          isLoading: !prevState.isLoading,
        }),
        () => {
          this.getData(this.state.searchValue, this.state.page);
        }
      );
    }
  };
  onClick = (e) => {
    if (e.target.closest('li').classList[0] === 'ant-pagination-item') {
      this.changePage(Number(e.target.textContent));
    } else if (e.target.closest('li').classList[0] === 'ant-pagination-next') {
      this.changePage('increment');
    } else if (e.target.closest('li').classList[0] === 'ant-pagination-prev') {
      this.changePage('decrement');
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.getData(this.props.searchValue, 1);
    }
    if (prevProps.stateTab !== this.props.stateTab && this.props.stateTab.rated) {
      this.getRatedFilm();
    }
  }

  componentDidMount() {
    this.getData('return', 1);
  }

  render() {
    const { searchValue, stateTab } = this.props;

    let elementFilm = (stateTab.search ? this.state.movieData : this.state.ratedMovieData).map((elem) => {
      return (
        <div key={elem.id} className="filmList__card card">
          <ItemFilm idFilm={elem.id} sendRate={this.sendRate} itemData={elem} />
        </div>
      );
    });

    let load = () => {
      let keys = Math.random();
      if (this.state.loader) return <Spin size="large" />;
      if (this.state.onError.error) return <Alert message={this.state.onError.errorMessage.message} type="error" />;
      return (
        <div key={keys} className="filmList__wrapper">
          {elementFilm}
        </div>
      );
    };

    return (
      <>
        {this.state.totalResault ? (
          load()
        ) : (
          <Alert message={`По Вашему запросу ${searchValue} нет результатов, попробуйте другой запрос`} type="info" />
        )}
        <footer className="footer">
          <div onClick={this.onClick}>
            <Pagination
              simple={false}
              current={this.state.page}
              onChange={() => {}}
              total={this.state.totalPages * 10}
            />
          </div>
        </footer>
      </>
    );
  }
}
