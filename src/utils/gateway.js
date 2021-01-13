import axios from 'axios';

export const get = (endPoint) => {
  return axios({
    method: 'GET',
    url: endPoint,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    if (response.status < 200 || response.status > 302) {
      return Promise.reject(new Error('Bad Gateway!'))
    }
    return response;
  }).catch((error) => {
    return error;
  })
}