import React, { Component } from 'react'
import Header from './Header'
import { withRouter } from 'react-router-dom'

class Product extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  render() {
    return (
      <Header />
    )
  }
}

export default withRouter(Product)