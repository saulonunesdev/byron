import axios from 'axios'

const CreateGithUrl = function (username, type) {
  return process.env.GIT_API + '/users/' + username + (type ? `/${type}` : '')
}

const GetGit = function (username, type) {
  return axios.get(CreateGithUrl(username, type))
}

export { GetGit }
