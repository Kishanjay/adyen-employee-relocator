import axios from 'axios';
import { WeatherForecast, WeatherData } from '@/types';
import { timestampToDate } from '@/libraries/date';

const API_KEY = 'baf916ac500f6a848b26659626e0ccba';
const baseDomain = 'http://api.openweathermap.org';

const defaultParams = {
  APPID: API_KEY,
  units: 'metric',
};

const baseURL = `${baseDomain}/data/2.5`;

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


type WeatherForecastResponseList = {
  dt: number;
  main: { temp: number; feels_like: number };
  rain?: { '3h': number };
  // TODO add remaining fields
}[]

interface WeatherForecastResponse {
  list: WeatherForecastResponseList;
  city: { name: string; country: string };
  // TODO add remaining fields
}

const statsByWeatherDataResponseList = (list: WeatherForecastResponseList) => {
  const minTemperature = list
    .reduce((prev, cur) => {
      if (cur.main.temp < prev) {
        return cur.main.temp;
      }
      return prev;
    }, Number.POSITIVE_INFINITY);
  const maxTemperature = list
    .reduce((prev, cur) => {
      if (cur.main.temp > prev) {
        return cur.main.temp;
      }
      return prev;
    }, Number.NEGATIVE_INFINITY);
  const avgTemperature = list
    .reduce((prev, cur) => prev + cur.main.temp / list.length, 0);

  const totalRain = list
    .reduce((prev, cur) => {
      if (!cur.rain) {
        return prev;
      }
      return prev + cur.rain['3h'];
    }, 0);
  return {
    minTemperature, maxTemperature, avgTemperature, totalRain, dataPoints: list.length,
  };
};

/**
 * This function will convert the response data structure
 * that is returned by openWeatherMap to the more generic
 * WeatherForecastData
 */
export const forecastResponseTransformator = ({ data }: {data: WeatherForecastResponse}):
WeatherForecast => {
  const result: WeatherForecast = { city: '', weather: [] };
  result.city = data.city.name;

  // Will convert the list of 3 hour interval weather measures
  // into weatherData containing the date and average weather
  // of that day
  const weatherDataByForecastResponseList = (list: WeatherForecastResponseList):
  WeatherData[] => {
    // Step 1. Group weather by day
    const weatherByDay: {[key: string]: WeatherForecastResponseList} = {};
    list.forEach((listEntry) => {
      const day = timestampToDate(listEntry.dt).toDateString();
      if (!(day in weatherByDay)) {
        weatherByDay[day] = [];
      }
      weatherByDay[day].push(listEntry);
    });

    // Step 2. Calculate stats by day (min, max, avg, total)
    const weatherDataResult: WeatherData[] = [];
    Object.entries(weatherByDay).forEach(([dateString, responseList]) => {
      const date = new Date(dateString);

      const {
        minTemperature, maxTemperature, avgTemperature, totalRain,
        dataPoints,
      } = statsByWeatherDataResponseList(responseList);

      const weatherData: WeatherData = {
        date,
        minTemperatureCelsius: minTemperature,
        maxTemperatureCelsius: maxTemperature,
        avgTemperatureCelsius: avgTemperature,
        rainMillimeters: totalRain,
      };

      // If any day does not have almost all (8) datapoints
      // remove it from the equation. computing min,max,avg
      // does not make sense for incomplete days
      if (dataPoints < 6) {
        return;
      }
      weatherDataResult.push(weatherData);
    });

    return weatherDataResult;
  };

  result.weather = weatherDataByForecastResponseList(data.list);
  return result;
};
