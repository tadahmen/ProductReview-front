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
     <Link to={`/`}><button className="nav-home"> home </button></Link>
      <div className="component">
        <h1 className="product-title"> {this.state.product.name} </h1>
        <div className="content">
          <section className="product-info">
            <h4 className="sub-heading">Product-info</h4>
            <p>Description: {this.state.product.description} </p>
            <p>Get it here: {this.state.product.shop} </p>
          </section>
          <section className="reviews">
            <h4 className="sub-heading"> Reviews </h4>
            <ReviewList productId={this.props.params.productId} />
          </section>
        </div>
      </div>
     </div>
    );
  }
}

export default Product;
