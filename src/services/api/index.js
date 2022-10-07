import axios from 'axios';
import { getEnvValue } from '../../utils';

export const axiosService = axios.create({
  baseURL: getEnvValue('API_BASE_URL'),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});
