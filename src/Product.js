import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router';    //necessary?
import ReviewList from './ReviewList';

class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    let productId = this.props.params.productId;
    let component = this;

    jQuery.getJSON("https://salty-reef-21530.herokuapp.com/products/" + productId + ".json", function(data) {
      console.log(data);  //??'data' is niet expliciet gedefinieerd. Staat het automatisch voor de opgehaalde json?
      component.setState({
        product: data.product
      });
    });
  }

  render() {
    return (
      <div>
        <h1> {this.state.product.name} </h1>
        <p> Description: {this.state.product.description} </p>
        <p> Get it here: {this.state.product.shop} </p>
        <ReviewList productId={this.props.params.productId} />
      </div>
    );
  }
}

export default Product;
