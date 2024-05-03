/* eslint-disable */
import React from 'react';

import ItemFilm from './itemFilm';
import { Spin } from "antd";
import { Alert } from "antd";
import './itemFilm.css';

const FilmList = ({ filmList, loader, error }) => {
  
  let elementFilm = filmList.map((elem) => {
    return (
      <div key={elem.id} className="filmList__card card">
        <ItemFilm itemData={elem} />
      </div>
    );
  });

 
  function load() {

    if (loader) return <Spin size='large'/>

    if (error.error)  return <Alert message={error.errorMessage.message} type="error"/>

    return <div className="filmList__wrapper"> {elementFilm} </div>;
  }
  
  return (
    <main className="filmList">
      {load()}
    </main>
  );
};
export default FilmList;
