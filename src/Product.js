import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router';
import ReviewList from './ReviewList';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
  }

  getProductId(){
    return this.props.params.productId;
  }


  fetchProduct() {
    let productId = this.props.params.productId; //this.props.params.productId
    let component = this;


    jQuery.getJSON("https://salty-reef-21530.herokuapp.com/products/" + productId + ".json", function(data) {
                          //nog juiste url invoeren
      console.log(data);
      component.setState({
        product: data.product
      });
    });
  }

  componentDidMount() {
    this.fetchProduct();
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
