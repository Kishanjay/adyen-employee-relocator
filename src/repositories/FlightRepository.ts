/* eslint-disable @typescript-eslint/camelcase */
import { FlightSearchRequest } from '../types';
import Client, { searchRequestTransformer } from './Clients/KiwiClient';

export default {
  async search(request: FlightSearchRequest) {
    console.log('searching');
    const params = searchRequestTransformer(request);

    return Client.request({
      url: 'flights',
      method: 'GET',
      params,
    });
  },
};
