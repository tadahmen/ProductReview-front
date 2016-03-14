import React from 'react';
import jQuery from 'jquery';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    let component = this;

    jQuery.getJSON("https://salty-reef-21530.herokuapp.com/", function(data){
      component.setState({
        products: data.products
      });
      console.log(this.state.products);
    });
  }

  render() {
    return (
      <div className="component">
        <ul>
        <h1 className="page-title">Soundwave</h1>
          {this.state.products.map(function(product, i) {
            return(
              <h3> <Link to={`/products/${product.id}`} className="productnames"> {product.name} </Link></h3>
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

export default ProductList;
