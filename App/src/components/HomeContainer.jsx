import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HomeContainer extends Component {
  render () {
    return (
      <div>
        <div>
          <input type='text' disabled={this.props.isFetching} value={this.props.term} onChange={this.props.onHandleChangeTerm} />
          <button disabled={this.props.isFetching} onClick={this.props.onHandleGetProducts} />
        </div>
        {this.props.isFetching && <div>Carregando...</div>}
        <ul>
          {this.props.products.map((item, index) => (
            <li key={index}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

HomeContainer.propTypes = {
  term: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  products: PropTypes.array,
  onHandleGetProducts: PropTypes.func.isRequired,
  onHandleChangeTerm: PropTypes.func.isRequired
}

export default HomeContainer
