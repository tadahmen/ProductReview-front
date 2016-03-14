import React from 'react';
import jQuery from 'jquery';
import Review from './Review';
import ReviewForm from './ReviewForm';

class ReviewList extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: [{/*id: 0, name: "", rating: "", reviewText: ""*/}],  //moet er al een (leeg) review-object in de array?
      counts: 0,   //{ review: 0}
      ratingSum: 0
    };
  }

  loadReviews(event) {      //dit update reviews met de nieuwste versie
    let productId = this.props.productId;
    let component = this;

    jQuery.getJSON(`https://salty-reef-21530.herokuapp.com/products/${productId}/reviews`, function(data) {
      console.log(data);
      component.setState({
        reviews: data.reviews, //hier wordt de variabele 'reviews' gelijk gesteld aan de array met reviews uit het json dataobject.
                              //?? en omdat reviews in setState wordt geupdate,
                              //?? verandert hieronder in render this.state.reviews en worden de reviews opniew gemapt.
                              //(is dat de verklaring waarom het herladen van de reviews ook zorgt voor een opnieuw renderen?)
        counts: data.meta.count
      });
    });
  }

  componentDidMount() {
    this.loadReviews();
  }

  render() {
    return (
      <div>
      {console.log(this.state.reviews) /* to check*/}
          { this.state.ratingSum = 0,
            this.state.reviews.map(function(review, i) {
              !isNaN(review.rating) ? this.state.ratingSum += review.rating : true
          }, this)}
        <div className="reviews-and-form">
          <section className="reviews-incl-average">
            <h4 className="average-rating">{this.state.counts == 0 ? "Be the first who rates this product" : "average rating: " + this.state.ratingSum/this.state.counts}</h4>
            <div className="reviews">
              {this.state.reviews.map(function(review, i) {     /* ??  waarvoor is de i?*/
                i += 1
                return(
                  <Review key={review.id} id={review.id} name={review.name} rating={review.rating} reviewText={review.reviewText} productId={review.product_id} number={i} onChange={this.loadReviews.bind(this)} />
                );
              }, this)}   {/* ??  waartoe dient 'this'?*/}
            </div>
          </section>
          <section className="review-form">
            <h4 className="form-header"> write a review </h4>
            <ReviewForm onChange={this.loadReviews.bind(this)} productId={this.props.productId} />
          </section>
        </div>
      </div>
    );
  }
}

export default ReviewList;
