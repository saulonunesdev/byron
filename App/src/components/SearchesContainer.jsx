import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/SearchesContainer.css'

class SearchesContainer extends Component {
  render () {
    return (
      <div>
        <div className='SearchesHeader'>
          <button onClick={this.props.onHandleGoBack}>Voltar</button>
          <button onClick={this.props.onHandleGetSearches}>Consultar</button>
        </div>
        <ul>
          {this.props.searches.map((item, index) => (
            <li key={index} id={item._id}>
              <input value={item.term} onChange={this.props.onHandleChangeTerm} />
              <input value={item.email} onChange={this.props.onHandleChangeEmail} />
              <input value={item.timebox} onChange={this.props.onHandleChangeTimebox} />
              <label>{item.lastMailTimestamp}</label>
              <button onClick={this.props.onHandleUpdateSearch}>Gravar</button>
              <button onClick={this.props.onHandleDeleteSearch}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

SearchesContainer.propTypes = {
  searches: PropTypes.array,
  onHandleGetSearches: PropTypes.func.isRequired,
  onHandleGoBack: PropTypes.func.isRequired,
  onHandleChangeTimebox: PropTypes.func.isRequired,
  onHandleChangeTerm: PropTypes.func.isRequired,
  onHandleChangeEmail: PropTypes.func.isRequired,
  onHandleUpdateSearch: PropTypes.func.isRequired,
  onHandleDeleteSearch: PropTypes.func.isRequired
}

export default SearchesContainer
