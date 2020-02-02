import React, { Component } from 'react'
import { GetProducts } from '../api/ebayAPI'
import HomeContainer from '../components/HomeContainer'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      isFetching: false,
      term: '',
      products: []
    }

    this.handleGetProducts = this.handleGetProducts.bind(this)
    this.handleChangeTerm = this.handleChangeTerm.bind(this)
  }

  handleChangeTerm (e) {
    this.setState({
      term: e.target.value
    })
  }

  handleGetProducts (e) {
    e.preventDefault()
    this.setState({
      isFetching: true,
      products: []
    })

    GetProducts(this.state.term)
      .then((response) => {
        const arr = []
        for (let i = 0; i < response.data.itemSummaries.length; i++) {
          arr.push(response.data.itemSummaries[i])
        }

        console.log(response.data.itemSummaries[0])
        this.setState({
          products: arr
        })
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ isFetching: false })
      })
  }

  render () {
    return (
      <HomeContainer
        {...this.state}
        onHandleGetProducts={this.handleGetProducts}
        onHandleChangeTerm={this.handleChangeTerm}
      />
    )
  }
}

export default Home
