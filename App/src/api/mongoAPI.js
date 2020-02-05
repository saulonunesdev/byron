import axios from 'axios'

const getSearches = function () {
  return axios.get(process.env.MONGO_API + '/searches')
}

const updateSearch = function (item) {
  return axios.put(process.env.MONGO_API + '/searches/' + item._id, item)
}

const deleteSearch = function (id) {
  return axios.delete(process.env.MONGO_API + '/searches/' + id)
}

const saveSearch = function (_term, _email, _timebox) {
  const data = {
    term: _term,
    email: _email,
    timebox: _timebox,
    lastMailTimestamp: Date.now()
  }
  return axios.post(process.env.MONGO_API + '/searches', data)
}

export { getSearches, updateSearch, deleteSearch, saveSearch }
