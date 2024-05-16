/* eslint-disable */
import React from 'react';
import './filmList.css';
import { format } from 'date-fns';
import Rate from './rate/rate';
import Generes from './generes/generes';
import { GenresConsumer } from '../../provaiderContext/movieAppContext.js';

export default class ItemFilm extends React.Component {
  changeRingRate = (rate) => {
    return rate <= 3
      ? `card__rate card__rate_low`
      : rate > 3 && rate <= 5
        ? `card__rate card__rate_lowMid`
        : rate > 5 && rate < 7
          ? `card__rate card__rate_topMid`
          : rate >= 7
            ? `card__rate card__rate_top`
            : `card__rate`;
  };

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
          <div className="card__header">
            <h5 title={itemData.title}>{strCate(itemData.title, 40)}</h5>
            <div className={this.changeRingRate(itemData.vote_average)}>{itemData.vote_average.toFixed(1)}</div>
          </div>

          {itemData.release_date === '' ? (
            <span>No date</span>
          ) : (
            <span>{format(itemData.release_date, 'MMMM dd, yyyy')}</span>
          )}
          <div>
            <GenresConsumer>
              {
                (genres) => {
                  return <Generes genres={genres} itemData={itemData}/>
                }
              }
            </GenresConsumer>
          </div>
          <p>{strCate(itemData.overview, 300)}</p>
          <Rate />
        </div>
      </>
    );
  }
}
