export interface WeatherData {
  date: Date;
  minTemperatureCelsius: number;
  maxTemperatureCelsius: number;
  avgTemperatureCelsius: number;
  rainPercentage: number;
}
export interface WeatherForecast {
    city: string;
    weather: WeatherData[];
  }

export type PropInterface<T> = () => T;
