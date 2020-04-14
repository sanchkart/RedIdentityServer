import axios from 'axios';

import { MOVIES_ENDPOINT } from 'src/config/constants';


export const moviesResource = axios.create({
  baseURL: MOVIES_ENDPOINT,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    "Authorization" : "Bearer " + localStorage.getItem("access_token")
  }
});
