import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Repos extends Component {
  render () {
    return (
      <div className={this.props.className}>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.repos.map((repo, index) => (
            <li key={index}><a href={repo.link}>{repo.name}</a></li>
          ))}
        </ul>
      </div>
    )
  }
}

Repos.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  repos: PropTypes.array
}

Repos.defaultProps = {
  className: 'repos',
  title: 'Repositórios',
  repos: [
    {
      name: 'Sem Repositório',
      link: '#'
    }
  ]
}

export default Repos
