import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import UserInfo from './UserInfo'
import Actions from './Actions'
import Repos from './Repos'

class GitContainer extends Component {
  render () {
    return (
      <div className='app'>
        <Search
          isDisabled={this.props.isFetching}
          onHandleSearch={this.props.onHandleSearch}
        />
        {
          this.props.userInfo &&
            <UserInfo userInfo={this.props.userInfo} />
        }
        {this.props.isFetching && <div>Carregando...</div>}
        {!!this.props.userInfo &&
          <Actions
            onHandlerGetRepos={this.props.onHandleGetRepos}
            onHandlerGetStarred={this.props.onHandleGetStarred}
          />}
        {!!this.props.repos.length &&
          <Repos
            className='repos'
            title='Repositórios'
            repos={this.props.repos}
          />}
        {!!this.props.starred.length &&
          <Repos
            className='starred'
            title='Favoritos'
            repos={this.props.starred}
          />}
      </div>
    )
  }
}

GitContainer.propTypes = {
  userInfo: PropTypes.object,
  repos: PropTypes.array,
  starred: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  onHandleSearch: PropTypes.func.isRequired,
  onHandleGetRepos: PropTypes.func.isRequired,
  onHandleGetStarred: PropTypes.func.isRequired
}

export default GitContainer
