import React from 'react'
import { client } from '../index'
import { gql } from "@apollo/client";
import styled from 'styled-components';
import currencyContext from './context/CurrencyContext'
import MainCard from './MainCard';

export class Main extends React.Component {



  static contextType = currencyContext;

  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    this.READ_QUERY_GQL = gql`
    {
      category(input: { title: "${this.props.category}" }) {
        name
        products {
          id
              name
              gallery
              inStock
              prices{
                currency{
                  label
                  symbol
                }
                amount
              }
        }
      }
    }
    `;

    const watchQuery = client.watchQuery({
      query: this.READ_QUERY_GQL,
    });

    this.subobj = watchQuery.subscribe(({ data }) => {
      this.setState({ items: data.category });
    });

  };

  componentWillUnmount() {
    this.subobj.unsubscribe();
  }


  render() {
    return (
      <StyledMain>
        <StyledHeader>{this.state ? this.state.items.name : 'Nothing to show'}</StyledHeader>
        <StyledNavList>
          {this.state && this.state.items.products.map((product) => {
            return (
              <MainCard
                showCart={this.state.showCart}
                id={this.state.id}
                key={product.id}
                currencyId={this.context.selectedCurrencyIndex}
                product={product}
              />
            )
          })}
        </StyledNavList>
      </StyledMain>
    )
  }
}

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin: 80px 0 120px;
  line-height: 1.6;
`;

const StyledHeader = styled.header`
  font-size: 42px;
  font-weight: 500;
  text-transform: capitalize;
`

const StyledNavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    max-width: 400px;
    margin: 0 auto;
  }
`;

export default Main