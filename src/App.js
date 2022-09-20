import './App.css';
import { Routes, Route } from "react-router-dom";
import All from './components/All';
import React from 'react';
import Clothes from './components/Clothes';
import Tech from './components/Tech';
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
          <Route path="/" element={<All />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/tech" element={<Tech />} />
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
