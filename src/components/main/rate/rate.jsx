import React from 'react';
import './rate.css';
export default class Rate extends React.Component {
  state = {
    rate: 0,
  };

  clickStar = (e) => {
    this.setState({
      rate: e.target.dataset,
    });
    this.props.sendRate(this.props.idFilm, e.target.dataset.rate);
  };

  render() {
    return (
      <div className="card__starsRate">
        <span data-rate={1} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={2} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={3} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={4} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={5} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={6} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={7} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={8} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={9} onClick={this.clickStar} className="star">
          &#9733;
        </span>
        <span data-rate={10} onClick={this.clickStar} className="star">
          &#9733;
        </span>
      </div>
    );
  }
}
