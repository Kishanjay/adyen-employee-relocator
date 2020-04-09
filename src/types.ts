export interface City {
  name: string;
  cityCode: string;
}
export interface FlightSearchRequest {
  fromCityCode: string;
  toCityCode: string;
  fromDateStart: Date;
  fromDateEnd: Date;
}

export interface WeatherData {
  date: Date;
  minTemperatureCelsius: number;
  maxTemperatureCelsius: number;
  avgTemperatureCelsius: number;
  rainMillimeters: number;
}
export interface WeatherForecast {
    city: string;
    weather: WeatherData[];
  }

export type PropInterface<T> = () => T;
