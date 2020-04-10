export type ChartLabels = string[];

export interface LineChartData {
  label: string;
  data: number[];
  borderColor?: string;
  fill?: boolean;
}
export type LineChartDataArr = LineChartData[];

export interface SearchResultImage {
  title: string;
  imageURL: string;
}
export interface FlightSearchRequest {
  fromCityCode: string;
  toCityCode: string;
  fromDateStart: Date;
  fromDateEnd: Date;
}
export interface FlightData {
  departureAirport: string;
  arivalAirport: string;
  departureDate: Date;
  arivalDate: Date;
  arivalCity: string;
  price: number;
  flightDuration: string;
}
export type FlightDataArr = FlightData[];

export interface City {
  name: string;
  cityCode: string;
}

export interface Weather {
  date: Date;
  minTemperatureCelsius: number;
  maxTemperatureCelsius: number;
  avgTemperatureCelsius: number;
  rainMillimeters: number;
}

export interface WeatherForecast {
  city: string;
  weather: Weather[];
}
