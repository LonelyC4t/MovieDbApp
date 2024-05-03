/* eslint-disable */
import React from 'react';
import './filmList.css';
import { format } from 'date-fns';

export default class ItemFilm extends React.Component {
  render() {
    const { itemData } = this.props;
    const strCate = (str, maxLength) => {
      return str.length > maxLength ? str.slice(0, maxLength - 1) + '…' : str;
    };
    ItemFilm.defaultProps = {
      itemData: {},
    };
    return (
      <>
        {itemData.backdrop_path ? (
          <img src={`https://image.tmdb.org/t/p/w500/${itemData.backdrop_path}`} alt={itemData.title} />
        ) : (
          <p>Цыгане украли постер вместе с конём :с</p>
        )}
        <div className="card__description">
          <h5 title={itemData.title}>{strCate(itemData.title, 40)}</h5>
          {itemData.release_date === '' ? (
            <span>No date</span>
          ) : (
            <span>{format(itemData.release_date, 'MMMM dd, yyyy')}</span>
          )}
          <div>
            <span>Action</span>
            <span>Action</span>
          </div>
          <p>{strCate(itemData.overview, 300)}</p>
        </div>
      </>
    );
  }
}
