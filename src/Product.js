import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router';

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

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct() {
    let productId = this.props.params.productId;
    let component = this;


    jQuery.getJSON(" https://.........herokuapp.com/products/" + productId + ".json", function(data) {
                          //nog juiste url invoeren
      console.log(data);
      component.setState({
        product: data.product
      });
    });
  }

  render() {
    return (
      <div>
        <h1> {this.state.name} /> </h1>
        <p> Description: {this.state.description} </p>
        <p> Get is here: {this.state.shop} </p>
      </div>
    );
  }
}

export default Product;
