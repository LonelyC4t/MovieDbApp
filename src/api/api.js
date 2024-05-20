import React from 'react';

class Api extends React.Component {
  static token = '97dea5f592aff1c31fc028c0d296ed1a';
  static bearer =
    'Bearer eyJhbGciOiJIUzI1NiJ9.;eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE';

  getFilm(film, page) {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${film}&page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
      },
    });
  }
  createGuestSession() {
    return fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
      },
    });
  }
  getGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
      },
    });
  }
  addRating(movieId, guestSessionId, rate) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, {
      method: 'POST',
      body: `{"value":${rate}}`,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
      },
    });
  }
  getRated(guestSessionId) {
    return fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2RlYTVmNTkyYWZmMWMzMWZjMDI4YzBkMjk2ZWQxYSIsInN1YiI6IjY2MjhjYTMxYjlhMGJkMDE3YWQ5YmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upshRVwJ1_7fucucdTqGokdCZtaG8P220sGiN6p7_oE',
        },
      }
    );
  }
}
const api = new Api();
export { api };
