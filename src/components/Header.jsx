import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import cartImg from '../assets/cart.svg'
import { gql } from "@apollo/client";
import { client } from '../index'


class Header extends React.Component {
  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    this.READ_QUERY_GQL = gql`
        {
            currencies{
                label
                symbol
            }
        }
        `;

    const watchQuery = client.watchQuery({
      query: this.READ_QUERY_GQL,
    });

    this.subobj = watchQuery.subscribe(({ data }) => {
      this.setState({
        currencies: data.currencies
      })
    });

  };

  componentWillUnmount() {
    this.subobj.unsubscribe();
  }

  render() {
    return (
      <StyledHeader color='light'>
        <nav>
          <StyledNavList>
            {
              this.props.path === 'home'
                ? <ActiveHeaderNavItem active> <StyledLink to='/'>Women</StyledLink> </ActiveHeaderNavItem>
                : <ActiveHeaderNavItem> <StyledLink to='/'>Women</StyledLink> </ActiveHeaderNavItem>
            }
            {
              this.props.path === 'men'
                ? <ActiveHeaderNavItem active> <StyledLink to='/men'>Men</StyledLink> </ActiveHeaderNavItem>
                : <ActiveHeaderNavItem> <StyledLink to='/men'>Men</StyledLink> </ActiveHeaderNavItem>
            }
            {
              this.props.path === 'kids'
                ? <ActiveHeaderNavItem active> <StyledLink to='/kids'>Kids</StyledLink> </ActiveHeaderNavItem>
                : <ActiveHeaderNavItem> <StyledLink to='/kids'>Kids</StyledLink> </ActiveHeaderNavItem>
            }

          </StyledNavList>
        </nav>
        <img src={logo} alt="Logo" />
        <HeaderRight className='header__right'>
          <select className='currency-select' name="currency-select" id="currency-select">
            {this.state && this.state.currencies && this.state.currencies.map((currency, index) => {
              return <option key={index} value={currency.label}>{currency.symbol}</option>
            })}
          </select>
          <button className='cart-button'><img src={cartImg} alt="Cart" /></button>
        </HeaderRight>
      </StyledHeader>
    )
  }
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  background-color: ${props => props.color === 'dark' ? '#000' : '#fff'};
`;

const StyledNavList = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
`

const ActiveHeaderNavItem = styled.li`
  position: relative;
  color: ${props => props.active ? '#5ECE7B' : "black"};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: var(--clr-green);
    transition: all .3s ease-in-out;
    width: ${props => props.active ? '100%' : '0'};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  padding: 4px 16px 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  * {
    border: 0;
    background-color: transparent;
    outline: 0;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
  }
`;


export default Header;

