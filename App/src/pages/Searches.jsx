import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchesContainer from '../components/SearchesContainer'
import { getSearches, updateSearch, deleteSearch } from '../api/mongoAPI'

class Searches extends Component {
  constructor () {
    super()
    this.state = {
      isFetching: false,
      searches: [],
      message: ''
    }

    this.handleGetSearches = this.handleGetSearches.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.handleChangeTimebox = this.handleChangeTimebox.bind(this)
    this.handleChangeTerm = this.handleChangeTerm.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this)
    this.handleDeleteSearch = this.handleDeleteSearch.bind(this)
  }

  handleUpdateSearch (e) {
    console.log('update', e.currentTarget.parentNode.getAttribute('id'))
    const itemId = e.currentTarget.parentNode.getAttribute('id')
    var arrSearchs = this.state.searches
    var item = {}
    for (let i = 0; i < arrSearchs.length; i++) {
      if (itemId === arrSearchs[i]._id) {
        item = arrSearchs[i]
      }
    }
    updateSearch(item)
      .then((response) => {
        console.log('resp', response)
      })
      .catch((error) => {
        console.log('err', error)
      })
      .finally(() => {
        this.handleGetSearches()
      })
  }

  handleDeleteSearch (e) {
    console.log('delete', e.currentTarget.parentNode.getAttribute('id'))
    deleteSearch(e.currentTarget.parentNode.getAttribute('id'))
      .then((response) => {
        console.log('resp', response)
      })
      .catch((error) => {
        console.log('err', error)
      })
      .finally(() => {
        this.handleGetSearches()
      })
  }

  handleChangeEmail (e) {
    const itemId = e.currentTarget.parentNode.getAttribute('id')
    var arrSearchs = this.state.searches
    for (let i = 0; i < arrSearchs.length; i++) {
      if (itemId === arrSearchs[i]._id) {
        arrSearchs[i].email = e.target.value
      }
    }
    this.setState({ searches: arrSearchs })
  }

  handleChangeTerm (e) {
    const itemId = e.currentTarget.parentNode.getAttribute('id')
    var arrSearchs = this.state.searches
    for (let i = 0; i < arrSearchs.length; i++) {
      if (itemId === arrSearchs[i]._id) {
        arrSearchs[i].term = e.target.value
      }
    }
    this.setState({ searches: arrSearchs })
  }

  handleChangeTimebox (e) {
    const itemId = e.currentTarget.parentNode.getAttribute('id')
    var arrSearchs = this.state.searches
    for (let i = 0; i < arrSearchs.length; i++) {
      if (itemId === arrSearchs[i]._id) {
        arrSearchs[i].timebox = e.target.value
      }
    }
    this.setState({ searches: arrSearchs })
  }

  handleGoBack (e) {
    this.props.history.push('/')
  }

  handleGetSearches (e) {
    this.setState({
      isFetching: true,
      message: ''
    })

    getSearches()
      .then((response) => {
        console.log('resp', response)
        this.setState({ searches: response.data })
      })
      .catch((error) => {
        console.log('err', error)
        this.setState({ message: error.Error })
      })
      .finally(() => {
        this.setState({ isFetching: false })
        console.log(this.state.searches)
      })
  }

  render () {
    return (
      <SearchesContainer
        {...this.state}
        onHandleGoBack={this.handleGoBack}
        onHandleGetSearches={this.handleGetSearches}
        onHandleChangeTimebox={this.handleChangeTimebox}
        onHandleChangeTerm={this.handleChangeTerm}
        onHandleChangeEmail={this.handleChangeEmail}
        onHandleUpdateSearch={this.handleUpdateSearch}
        onHandleDeleteSearch={this.handleDeleteSearch}
      />
    )
  }
}

Searches.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Searches
