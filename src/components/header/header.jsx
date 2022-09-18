import './header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import cartImg from '../../assets/cart.svg'
import { gql } from "@apollo/client";
import { client } from '../../index'


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
            <header className='header'>
                <nav className='header__nav'>
                    <ul className='header__nav-list'>
                        <li className={`header__nav-item ${this.props.path === 'home' ? 'active' : ''}`}>
                            <Link to='/'>Women</Link>
                        </li>
                        <li className={`header__nav-item ${this.props.path === 'men' ? 'active' : ''}`}>
                            <Link to='/men'>Men</Link>
                        </li>
                        <li className={`header__nav-item ${this.props.path === 'kids' ? 'active' : ''}`}>
                            <Link to='/kids'>Kids</Link>
                        </li>
                    </ul>
                </nav>
                <img src={logo} alt="Logo" />
                <div className='header__right'>
                    <select className='currency-select' name="currency-select" id="currency-select">
                        {this.state && this.state.currencies && this.state.currencies.map((currency, index) => {
                            return <option key={index} value={currency.label}>{currency.symbol}</option>
                        })}
                    </select>
                    <button className='cart-button'><img src={cartImg} alt="Cart" /></button>
                </div>
            </header>
        )
    }
}


export default Header;