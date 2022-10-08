import axios from 'axios';
import https from 'https'
// import decrypt from './decrypt'
// import { getCookie } from 'cookies-next';

const axiosDefaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': 'bcfc0973af7968f127c47ad138257e810a07b82e5546cb5e6d353a84eef09198'
}
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  headers: axiosDefaultHeader,
  baseURL: 'https://talent-workspace.kitani.co:8443'
});

axios.defaults.httpsAgent = httpsAgent

axiosInstance.interceptors.response.use((response) => response, function (error) {
  return Promise.reject(error || 'Something went wrong');
});

export default axiosInstance;