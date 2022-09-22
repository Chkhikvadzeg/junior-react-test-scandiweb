import './App.css';
import { Switch, Route } from "react-router-dom";
import All from './components/All';
import React from 'react';
import Clothes from './components/Clothes';
import Tech from './components/Tech';
import styled from 'styled-components';
import { useState } from 'react';
import { UserProvider } from './components/context/CurrencyContext';
import Product from './components/Product';

const App = () => {
  const [currencies, setCurrency] = useState();
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);
  const changingCurrency = { currencies, setCurrency, selectedCurrencyIndex, setSelectedCurrencyIndex };

  return (
    <UserProvider value={changingCurrency}>
      <Container>
        <Switch>
          <Route exact path="/">
            <All />
          </Route>
          <Route path="/clothes">
            <Clothes />
          </Route>
          <Route path="/tech">
            <Tech />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
        </Switch>
      </Container>
    </UserProvider>
  );
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;

  @media (max-width: 1024px) {
    padding: 0 50px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export default App;
