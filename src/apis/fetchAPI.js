import axios from 'axios';
import {API_KEY, API_BASE_URL} from './config';

export const fetchAPI = async(query) => {
  const { data } = await axios.get(API_BASE_URL, {
    params: {
      q: query,
      appid: API_KEY,
      units: 'metric'
    }
  })
  return data;
}