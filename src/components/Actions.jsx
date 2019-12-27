import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Actions extends Component {
  render () {
    return (
      <div className='actions'>
        <button onClick={this.props.onHandlerGetRepos}>Ver Repositórios</button>
        <button onClick={this.props.onHandlerGetStarred}>Ver Favoritos</button>
      </div>
    )
  }
}

Actions.propTypes = {
  onHandlerGetRepos: PropTypes.func.isRequired,
  onHandlerGetStarred: PropTypes.func.isRequired
}

export default Actions
