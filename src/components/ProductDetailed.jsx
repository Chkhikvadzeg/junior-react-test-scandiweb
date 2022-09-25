import React, { Component } from 'react'
import styled from 'styled-components'
import Items from './Items';
import { Type } from './styles/globalStyled';
import currencyContext from './context/CurrencyContext'


export default class ProductDetailed extends Component {
  static contextType = currencyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      BigImage: '',
      attributes: [],
      items: [],
      updated: false
    }
  }

  componentDidUpdate(prev) {
    if (prev.product !== this.props.product) {
      this.setState({
        product: this.props.product,
        BigImage: this.props.product.gallery[0],
        attributes: this.props.product.attributes,
        items: this.state.attributes.items,
        updated: true
      })
    }
  }

  changeBigImage = (e) => {
    this.setState({ BigImage: e.target.src })
  }

  render() {
    return (
      <Container>
        <Gallery>
          {this.props.product.gallery?.map((image) => {
            return (
              <GalleryItem key={image}>
                <Image onClick={this.changeBigImage} src={image} />
              </GalleryItem>
            )
          })}
        </Gallery>
        <DetailsContainer>
          <div>
            <BigImage src={this.state.BigImage} />
          </div>
          <div>
            <Name>{this.props.product.name}</Name>
            <SubName>{this.props.product.brand}</SubName>
            <Items item={this.state.attributes}></Items>
            <Price>
              <Type>Price:</Type>

              {
                this.state.updated
                && this.props.product.prices[this.context.selectedCurrencyIndex].amount
                + this.props.product.prices[this.context.selectedCurrencyIndex].currency.symbol
              }

            </Price>
            <AddToCartButton>Add to cart</AddToCartButton>
            <Description dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
          </div>
        </DetailsContainer>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin: 80px 0;
`;

const Gallery = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 40px;
  list-style: none;
`;

const GalleryItem = styled.li`
  width: 80px;
  height: 80px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Image = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: white;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  justify-content: space-between;
  gap: 100px;
  width: 100%;
`;

const BigImage = styled.img`
  max-width: 610px;
  width: 100%;
`;

const Name = styled.h1`
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 16px;
`;

const SubName = styled.h2`
  font-size: 30px;
  line-height: 1;
  font-weight: 400;
  margin-bottom: 40px;
`;

const Price = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  height: 52px;
  background-color: var(--clr-green);
  color: white;
  border: 0;
  outline: 0;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .3s ease-in-out;
  margin-top: 75px;

  &:hover {
    opacity: 0.8;
  }
`;

const Description = styled.p`
  color: #1D1F22;
  margin-top: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
  }
`;