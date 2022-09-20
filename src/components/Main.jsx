import React from 'react'
import { client } from '../index'
import { gql } from "@apollo/client";
import styled from 'styled-components';
import currencyContext from './context/CurrencyContext'
import { Link } from 'react-router-dom'
import emptyCart from '../assets/empty-cart.svg'

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

  mouseEnterHandler = (e) => {
    this.setState({ show: true, id: e.target.id })
  }

  mouseLeaveHandler = (e) => {
    this.setState({ show: false, id: e.target.id })
  }

  render() {
    return (
      <StyledMain>
        <StyledHeader onClick={() => (console.log(this.context.selectedCurrencyIndex))}>{this.state ? this.state.items.name : 'Nothing to show'}</StyledHeader>
        <StyledNavList>
          {this.state ? this.state.items.products.map((product) => {
            return (
              <StyledNavItem onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} id={product.id} key={product.id}>
                <DivForImage>
                  <StyledImage src={product.gallery[0]} alt={product.name} />
                  {!product.inStock ? <StyledNoItems>Out of stock</StyledNoItems> : null}
                </DivForImage>
                <StyledDescription color={product.inStock ? 'dark' : 'light'}>
                  <h3 style={{ fontWeight: 300, }}>{product.name}</h3>
                  <p style={{ fontWeight: 500, }}>{product.prices[this.context.selectedCurrencyIndex].currency.symbol}{product.prices[this.context.selectedCurrencyIndex].amount}</p>
                </StyledDescription>
                {this.state.show && this.state.id === product.id && product.inStock
                  ? <StyledLink to={`/product/${product.id}`}>
                    <img src={emptyCart} alt="empty cart" />
                  </StyledLink>
                  : null}
              </StyledNavItem>
            )
          }) : "Nothing to show"}
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
`

const StyledNavList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const StyledNavItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: white;
  transition: all .3s ease-in-out;
  position: relative;
  user-select: none;

  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }
`

const DivForImage = styled.div`
  position: relative;
  height: 330px;
  overflow: hidden;
`

const StyledImage = styled.img`
  width: 100%;
`

const StyledDescription = styled.div`
  color: ${props => props.color === 'dark' ? '#000' : '#A8ACB0'};  
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  width: 52px;
  aspect-ratio: 1;
  background: var(--clr-green);
  position: absolute;
  bottom: 72px;
  right: 32px;

  display: flex;
`

const StyledNoItems = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #8D8F9A;
`;


export default Main