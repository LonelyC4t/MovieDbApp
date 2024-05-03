import React from 'react';

class Api extends React.Component {
  static token = '97dea5f592aff1c31fc028c0d296ed1a';

  getFilm(film) {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${film}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
      },
    });
  }
}
const api = new Api();
export { api };
