import React from 'react';
import jQuery from 'jquery';
import Review from './Review';
import ReviewForm from './ReviewForm';

class ReviewList extends React.Component {
  constructor() {
    super();

    this.state = {
      reviews: []
    };
  }

  loadReviews(event) {
    let productId = this.props.productId;
    let component = this;

    jQuery.getJSON("http://localhost:5000/products/" + productId + "/reviews", function(data) {
      console.log(data);

      component.setState({
        reviews: data.reviews
      });
    });
  }

  componentDidMount() {
    this.loadReviews();
  }

  render() {
    return (
      <div>
        <ReviewForm onChange={this.loadReviews.bind(this)} projectId={this.props.projectId} />
        <ul>
          {this.state.reviews.map(function(review, i) {
            return(
              <Review key={review.id} id={review.id} name={review.name} rating={review.rating} reviewText={review.reviewText} projectId={review.project_id}  onChange={this.loadReviews.bind(this)} />
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

export default ReviewList;
