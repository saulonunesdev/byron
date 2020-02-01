import axios from 'axios'

const GetProducts = function (term) {
  return axios.get(process.env.EBAY_API + '/ebay/' + term)
}

export { GetProducts }
