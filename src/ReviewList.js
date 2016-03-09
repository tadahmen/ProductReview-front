import React from 'react';
import jQuery from 'jquery';
import Review from './Review';
import ReviewForm from './ReviewForm';

class ReviewList extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: [{id: 0, name: "", rating: "", reviewText: ""}],  //moet er al een (leeg) review-object in de array?
      counts: { review: 0}
    };
  }

  loadReviews(event) {      //dit update reviews met de nieuwste versie
    let productId = this.props.productId;
    let component = this;

    jQuery.getJSON(`http://localhost:5000/products/${productId}/reviews`, function(data) {
      console.log(data);

      component.setState({
        reviews: data.reviews //hier wordt de variabele 'reviews' gelijk gesteld aan de array met reviews uit het json dataobject.
                              //?? en omdat reviews in setState wordt geupdate,
                              //?? verandert hieronder in render this.state.reviews en worden de reviews opniew gemapt.
                              //(is dat de verklaring waarom het herladen van de reviews ook zorgt voor een opnieuw renderen?)
      });
    });
  }

  componentDidMount() {
    this.loadReviews();
  }

  render() {
    return (
      <div>
        <ReviewForm onChange={this.loadReviews.bind(this)} productId={this.props.productId} />
        <ul>
          {this.state.reviews.map(function(review, i) {     // ??  waarvoor is de i?
            return(
              <Review key={review.id} id={review.id} name={review.name} rating={review.rating} reviewText={review.reviewText} productId={review.product_id}  onChange={this.loadReviews.bind(this)} />
            );
          }, this)}   {/* ??  waartoe dient 'this'?*/}
        </ul>
      </div>
    );
  }
}

export default ReviewList;
