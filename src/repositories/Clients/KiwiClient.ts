import axios from 'axios';
import { timestampToDate } from '@/libraries/date';
import { FlightSearchRequest, FlightData } from '../../types';

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

export const searchRequestTransformator = (request: FlightSearchRequest): KiwiRequestParams => {
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

interface SearchResponseData {
  data: {
    dTime: number;
    aTime: number;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    fly_duration: string;
    price: number;
    // TODO add remaining fields
  }[];

}
export const searchResponseTransformator = ({ data }: {data: SearchResponseData}): FlightData[] => {
  const flightDatas = data.data;
  const result = flightDatas.map((flightData) => ({
    departureAirport: flightData.flyFrom,
    arivalAirport: flightData.flyTo,
    departureDate: timestampToDate(flightData.dTime),
    arivalDate: timestampToDate(flightData.aTime),
    arivalCity: flightData.cityTo,
    price: flightData.price,
    flightDuration: flightData.fly_duration,
  }));
  return result;
};
