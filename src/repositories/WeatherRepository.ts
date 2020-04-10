/* eslint-disable @typescript-eslint/camelcase */
import { WeatherForecast } from '@/types';
import Client, { forecastResponseTransformator } from './Clients/OpenWeatherMapClient';


export default {
  async get(city: string) {
    return Client.request({
      url: 'weather',
      method: 'GET',
      params: { q: city },
    });
  },

  async getForecast(city: string): Promise<WeatherForecast> {
    return Client.request({
      url: 'forecast',
      method: 'GET',
      params: { q: city },
    }).then(forecastResponseTransformator);
  },

};
