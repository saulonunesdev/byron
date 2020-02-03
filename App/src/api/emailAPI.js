import axios from 'axios'

const base64Encode = (encodeData) => {
  const buff = Buffer.from(encodeData)
  return buff.toString('base64')
}

const SendEmail = function (email, term, _data) {
  const params = {
    emails: email,
    term: term,
    html: base64Encode(_data)
  }

  return axios.post(process.env.EMAIL_API + '/email', params)
}

export { SendEmail }
