import axios from 'axios';

export default req => {
  if (req) {
    // inject cookies
  }

  return axios.create({
    baseURL: process.env.WEBPACK_ENV !== 'client' ? `http://${process.env.API_HOST}:${process.env.API_PORT}/` : '/'
  });
}