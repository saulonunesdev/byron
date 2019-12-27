import React, { Component } from 'react'
import GitContainer from '../components/GitContainer'
import { GetGit } from '../api/githubAPI'

class Git extends Component {
  constructor () {
    super()
    this.state = {
      userInfo: null,
      repos: [],
      starred: [],
      isFetching: false
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch (e) {
    const keyCode = e.which || e.keyCode
    if (keyCode === 13) {
      this.setState({
        userInfo: null,
        repos: [],
        starred: [],
        isFetching: true
      })
      GetGit(e.target.value)
        .then((response) => {
          this.setState({
            userInfo: {
              userName: response.data.name,
              userPhotoUrl: response.data.avatar_url,
              userLogin: response.data.login,
              userRepos: response.data.public_repos,
              userFollowers: response.data.followers,
              userFollowing: response.data.following
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.setState({ isFetching: false })
        })
    }
  }

  GetRepos (type) {
    return (e) => {
      GetGit(this.state.userInfo.userLogin, type)
        .then((response) => {
          this.setState({
            // ES6 -> [type]: [] === repos: [] || [starred]: []
            [type]: response.data.map((repo) => ({
              name: repo.name,
              link: repo.html_url
            }))
          })
        })
        .catch((error) => {
          console.log(error)
          this.setState({ [type]: [] })
        })
    }
  }

  render () {
    return (
      <React.StrictMode>
        <GitContainer
          {...this.state}
          // Spread Object is the same as follows
          // userInfo={this.state.userInfo}
          // repos={this.state.repos}
          // starred={this.state.starred}
          // isFetching={this.state.isFetching}
          onHandleSearch={this.handleSearch}
          onHandleGetRepos={this.GetRepos('repos')}
          onHandleGetStarred={this.GetRepos('starred')}
        />
      </React.StrictMode>
    )
  }
}

export default Git
