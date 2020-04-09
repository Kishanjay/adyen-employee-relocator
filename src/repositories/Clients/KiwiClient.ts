import axios from 'axios';
import { FlightSearchRequest } from '../../types';

const baseURL = 'https://api.skypicker.com';

const defaultParams = {
  partner: 'picky',
};

const client = axios.create({
  baseURL,
});

// Unfortunately due to a bug in axios there is no means
// of setting default query parameters. More on this:
// https://github.com/axios/axios/issues/2190
client.interceptors.request.use((config) => {
  Object.entries(defaultParams).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    config.params[key] = value;
  });

  return config;
});

export default client;


export interface KiwiRequestParams {
  fly_from: string;
  fly_to: string;
  date_from: string;
  date_to: string;
}

export const searchRequestTransformer = (request: FlightSearchRequest): KiwiRequestParams => {
  const dateFormatter = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    fly_from: request.fromCityCode,
    // eslint-disable-next-line @typescript-eslint/camelcase
    fly_to: request.toCityCode,
    // eslint-disable-next-line @typescript-eslint/camelcase
    date_from: dateFormatter(request.fromDateStart),
    // eslint-disable-next-line @typescript-eslint/camelcase
    date_to: dateFormatter(request.fromDateEnd),
  };
};
