import React, { Component } from 'react'
import styled from 'styled-components'
import { Type } from './styles/globalStyled'

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      updated: false
    }
  }

  buttonClickHandler = (e) => {
    this.setState({ id: e.target.id })
  }

  componentDidUpdate(prev) {
    if (prev.item !== this.props.item) {
      this.setState({ updated: true })
    }
  }

  render() {
    return (
      <Container>
        {this.state.updated && this.props.item.map(((items, index) => {
          return (
            <ItemsContainer key={index}>
              <Type>{items.name}</Type>
              <ItemsList key={index}>
                {items.items.map((item => {
                  return (
                    <li key={item.id}>
                      {items.id === "Color"
                        ? <ColorButton id={item.id} onClick={this.buttonClickHandler} style={{ backgroundColor: item.value }}></ColorButton>
                        : <Button id={item.id} onClick={this.buttonClickHandler}>{item.displayValue}</Button>}
                    </li>
                  )
                }))}
              </ItemsList>
            </ItemsContainer>
          )
        }))}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const ItemsList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 12px;
  margin-bottom: 24px;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Button = styled.button`
  padding: 14px 24px;
  border: 1px solid var(--clr-black);
  white-space: nowrap;  
  background: ${props => props.active ? 'var(--clr-black)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--clr-black)'};
  cursor: pointer;
  width: 100%;
  height: 100%;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: var(--clr-black);
    color: white;
  }
`;

const ColorButton = styled.button`
  cursor: pointer;
  transition: all .3s ease-in-out;
  width: 36px;
  height: 36px;
  outline: 1px solid transparent;
  outline-color: ${props => props.active ? '#5ECE7B' : 'transparent'};
  border: 0;
  outline-offset: 1px;

  &:hover {
    outline-color:#5ECE7B;
  }
`;
