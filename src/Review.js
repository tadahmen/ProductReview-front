import React from 'react';
import jQuery from 'jquery';
import EditableTextField from './EditableTextField';


class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      review: {}    //?? is necessary?
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      // product: this.props.product,
      name: this.props.name,
      rating: this.props.rating,
      reviewText: this.props.reviewText,
    });
    console.log(name)                     //to check
  }

  updateRating(newRating) {
   console.log(newRating);
   this.syncState({rating: newRating});
  }

  updateName(newName) {
   console.log(newName);
   this.syncState({name: newName});
  }

  updateReviewText(newText) {
   console.log(newText);
   this.syncState({reviewText: newText});
  }

  syncState(updatedState) {
     console.log("Syncing state!");

     let component = this;

     let newState = jQuery.extend({
       id: this.state.id,
       product: this.state.product,
       name: this.state.name,
       rating: this.state.rating,
       reviewText: this.state.reviewText
     }, updatedState);2     //?? hoort die '2' hier? Zoja, waarvoor is dit? en moet er ';' achter?


     this.setState(newState);

     console.log(newState);

     jQuery.ajax({
       type: "PUT",
       url: `https://salty-reef-21530.herokuapp.com/products/${this.props.productId}/reviews/${this.props.id}.json`,
       data: JSON.stringify({
           review: newState
       }),
       contentType: "application/json",
       dataType: "json"
     })
       .done(function(data) {
         console.log(data);

         component.setState({
           id: data.review.id,
          //  product: this.review.product,
           name: data.review.name,
           rating: data.review.rating,
           reviewText: data.review.reviewText
          //  createdAt: data.review.created_at,
          //  updatedAt: data.review.updated_at
         });
       })

       .fail(function(error) {
         console.log(error);
       })

       .always(function() {
         component.props.onChange();
       });
   }


  render() {
    return(
      <div className="review">
        {/*<a href="#" className="delete task" onClick={this.deleteItem.bind(this)}>x</a>*/}
        <p>{this.state.name} rated <span className="rating">{this.state.rating}</span> stars </p>
        <p>{this.state.reviewText} </p>
      </div>
    );
  }
}

export default Review;
