import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import React from 'react';
import Men from './components/Men';
import Kids from './components/Kids';
import styled from 'styled-components';
import { useState } from 'react';
import { UserProvider } from './components/context/CurrencyContext';

const App = () => {
  const [currencies, setCurrency] = useState();
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);
  const changingCurrency = { currencies, setCurrency, selectedCurrencyIndex, setSelectedCurrencyIndex };

  return (
    <UserProvider value={changingCurrency}>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
        </Routes>
      </Container>
    </UserProvider>
  );
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
`;

export default App;
