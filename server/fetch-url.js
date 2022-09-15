// api/fetch-url-content

const axios = require('axios')

exports.fetchUrl = url => {
  return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}