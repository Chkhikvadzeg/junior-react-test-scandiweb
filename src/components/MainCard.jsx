import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import emptyCart from '../assets/empty-cart.svg'
import styled from 'styled-components';

export default class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: null,
    }
  }


  mouseEnterHandler = () => {
    this.setState({ showCart: true })
  }

  mouseLeaveHandler = () => {
    this.setState({ showCart: false })
  }

  render() {
    return (
      <StyledNavItem onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler} id={this.props.product.id} key={this.props.product.id}>
        <DivForImage>
          <StyledImage src={this.props.product.gallery[0]} alt={this.props.product.name} />
          {!this.props.product.inStock ? <StyledNoItems>Out of stock</StyledNoItems> : null}
        </DivForImage>
        <StyledDescription color={this.props.product.inStock ? 'dark' : 'light'}>
          <h3 style={{ fontWeight: 300, }}>{this.props.product.name}</h3>
          <p style={{ fontWeight: 500, }}>{this.props.product.prices[this.props.currencyId].currency.symbol}{this.props.product.prices[this.props.currencyId].amount}</p>
        </StyledDescription>
        {this.state.showCart && this.props.product.inStock
          ? <StyledLink to={`/product/${this.props.product.id}`}>
            <img src={emptyCart} alt="empty cart" />
          </StyledLink>
          : null}
      </StyledNavItem>
    )
  }
}

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
  height: 100%;
  object-fit: contain;
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