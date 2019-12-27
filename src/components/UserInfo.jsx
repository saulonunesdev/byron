import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserInfo extends Component {
  render () {
    return (
      <div className='user-info'>
        <img className='user-photo' src={this.props.userInfo.userPhotoUrl} />
        <h1 className='username'>
          <a href={`https://github.com/${this.props.userInfo.userLogin}`}>
            {this.props.userInfo.userName}
          </a>
        </h1>

        <ul className='repos-info'>
          <li>Repositórios: {this.props.userInfo.userRepos}</li>
          <li>Seguidores: {this.props.userInfo.userFollowers}</li>
          <li>Seguindo: {this.props.userInfo.userFollowing}</li>
        </ul>
      </div>
    )
  }
}

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    userLogin: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
    userRepos: PropTypes.number.isRequired,
    userFollowers: PropTypes.number.isRequired,
    userFollowing: PropTypes.number.isRequired
  })
}

export default UserInfo
