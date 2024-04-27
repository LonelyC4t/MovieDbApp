import React from 'react';

import ItemFilm from './itemFilm';
import './itemFilm.css';

const FilmList = ({ filmList }) => {
  let elementFilm = filmList.map((elem) => {
    return (
      <div key={elem.id} className="filmList__card card">
        <ItemFilm itemData={elem} />
      </div>
    );
  });

  return (
    <main className="filmList">
      <div className="filmList__wrapper">{elementFilm}</div>
    </main>
  );
};
export default FilmList;
