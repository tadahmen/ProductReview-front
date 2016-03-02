import React from 'react';
import jQuery from 'jquery';

class ReviewForm extends React.Component {
  constructor() {
    super();
  }

  createReview(event) {
    event.preventDefault();

    let component = this;
    let name = this.refs.newReviewInput.name.value;  //these still have to be linked somehow to the input fields
    let rating = this.refs.newReviewInput.rating.value;
    let reviewText = this.refs.newReviewInput.reviewText.value;
    let productId = this.props.productId;

    let newReview = {
      id: null,
      name: name,
      rating: rating,
      reviewText: reviewText,
      productId: productId
    };

    jQuery.ajax({
      type: "POST",
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        component.props.onChange();
        component.refs.newReviewInput.name = "";
        component.refs.newReviewInput.rating = "";  //maybe this can't be an empty string
        component.refs.newReviewInput.reviewText = "";
        component.refs.newReviewInput.productId = ""; //maybe this can't be an empty string
      })

      .fail(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createReview.bind(this)}>
              <input type="text" ref="newReviewInput" placeholder="name" />
              <input type="text" ref="newReviewInput" placeholder="rate product (scale 1-5)" />
              <input type="text" ref="newReviewInput" placeholder="write a review" />
              <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default ReviewForm;
