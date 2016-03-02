import React from 'react';
import jQuery from 'jquery';
import EditableTextField from './EditableTextField';


class Review extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      product: this.props.product,
      name: this.props.name,
      rating: this.props.rating,
      reviewText: this.props.reviewText
    });
  }

  updateRating(newRating) {
   console.log(newRating);
   this.syncState({rating: newRating});
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
     }, updatedState);2

     this.setState(newState);

     console.log(newState);

     jQuery.ajax({
       type: "PUT",
       url: `http://localhost:5000/products/${this.props.productId}/reviews/${this.props.id}.json`,
       data: JSON.stringify({
           review: newState   //moet volgens mij idd 'review' zijn, maar misschien toch reviewText
       }),
       contentType: "application/json",
       dataType: "json"
     })
       .done(function(data) {
         console.log(data);

         component.setState({
           id: data.review.id,
           product: this.review.product,
           name: this.review.name,
           rating: this.review.rating,
           reviewText: this.review.reviewText
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

//stukje hieronder is volgens mij op de een of andere manier dubbel
  // syncState(updatedState) {
  //   console.log("Syncing state!");
  //
  //   let component = this; render() {
  //     return(
  //       <div>
  //         {/*<a href="#" className="delete task" onClick={this.deleteItem.bind(this)}>x</a>*/}
  //         <EditableTextField value={this.state.rating} onChange={this.updateRating.bind(this)} {/*isEditable={!this.state.completed} */}/>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return(
      <div>
        {/*<a href="#" className="delete task" onClick={this.deleteItem.bind(this)}>x</a>*/}
        <EditableTextField value={this.state.title} onChange={this.updateTitle.bind(this)} isEditable={!this.state.completed} />
      </div>
    );
  }
}

export default Review;
