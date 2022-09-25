import React, { Component } from 'react'
import Header from './Header'
import { withRouter } from 'react-router-dom'
import { gql } from '@apollo/client';
import { client } from '../index';
import ProductDetailed from './ProductDetailed';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    this.READ_QUERY_GQL = gql`
    {
      product(id: "${this.props.match.params.id}") {
        id
        name
        gallery
        description
        category
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes{
          id
          name
          type
          items{
            displayValue
            value
            id
          }
        }
      }
    }
    
        `;

    const watchQuery = client.watchQuery({
      query: this.READ_QUERY_GQL,
    });
    this.subobj = watchQuery.subscribe(({ data }) => {
      const product = data.product;
      this.setState({ product });
    });
  };

  componentWillUnmount() {
    this.subobj.unsubscribe();
  }

  render() {
    return (
      <>
        <Header path={this.state.product.category} />
        <ProductDetailed product={this.state.product} />
      </>
    )
  }
}

export default withRouter(Product)