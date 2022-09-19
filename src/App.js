import './App.css';
import { Routes, Route } from "react-router-dom";
import Home  from './components/Home';
import React from 'react';
import Men from './components/Men';
import Kids from './components/Kids';
import styled from 'styled-components';
// import { useQuery } from '@apollo/client';
// import { GET_GEN_3 } from './gql/Query';
// import { GET_CURRENCIES } from './gql/Currencies';

// function Query() {
//   const { data } = useQuery(GET_GEN_3);
//   const { currencies } = useQuery(GET_CURRENCIES);
//   console.log(data, currencies);
// }


class App extends React.Component {

  render() {
    return (
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
        </Routes>
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
`;

export default App;
