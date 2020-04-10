/* eslint-disable @typescript-eslint/camelcase */
import { FlightSearchRequest, FlightData } from '../types';
import Client, { searchRequestTransformator, searchResponseTransformator } from './Clients/KiwiClient';

export default {
  async search(request: FlightSearchRequest): Promise<FlightData[]> {
    const params = searchRequestTransformator(request);

    return Client.request({
      url: 'flights',
      method: 'GET',
      params,
    }).then(searchResponseTransformator);
  },
};
