import React from 'react';
import { Spin, Alert } from 'antd';

import './itemFilm.css';
import ItemFilm from './itemFilm';

const FilmList = ({ filmList, loader, error, totalResault, searchValue, sendRate }) => {
  let elementFilm = filmList.map((elem) => {
    return (
      <div key={elem.id} className="filmList__card card">
        <ItemFilm idFilm={elem.id} sendRate={sendRate} itemData={elem} />
      </div>
    );
  });

  function load() {
    if (loader) return <Spin size="large" />;

    if (error.error) return <Alert message={error.errorMessage.message} type="error" />;

    return <div className="filmList__wrapper"> {elementFilm} </div>;
  }

  return (
    <main className="filmList">
      {totalResault ? (
        load()
      ) : (
        <Alert message={`По Вашему запросу ${searchValue} нет результатов, впишите чё-нить другое`} type="info" />
      )}
    </main>
  );
};
export default FilmList;
