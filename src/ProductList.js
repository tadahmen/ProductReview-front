import React from 'react';
import jQuery from 'jquery';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    let component = this;
    jQuery.getJSON("https://........herokuapp.com/products.json", function(data){
                          //nog juiste url invoeren
      component.setState({
        products: data.products
      });
      console.log(data.products);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.products.map(function(product, i) {
            return(
              <h3><Link to={`/products/${this.state.product.id}`}> {this.state.product.name} </Link></h3>
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

export default ProductList;
