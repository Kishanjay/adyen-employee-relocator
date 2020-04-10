<template>
  <app-layout>
    <v-container>
      <v-alert
        color="info"
        text
      >
        <div class="d-flex flex-column font-weight-bold">
          <span>
            Origin: {{ appSettings.currentLocation.name }}
          </span>
          <span>
            Destinations: [{{ appSettings.officeLocations.map(l => l.name).join(', ') }}]
          </span>
        </div>
      </v-alert>

      <div class="d-flex">
        <v-switch
          v-model="showWeatherForecast"
          class="mr-4"
          label="Weather forecast"
        />

        <v-switch
          v-model="showFlightPrices"
          class="mr-4"
          label="Flight prices"
        />

        <v-switch
          v-model="showCityImages"
          label="City images"
        />
      </div>

      <v-row>
        <v-col
          v-for="(data, index) in weatherForecastPerCity"
          :key="index"
        >
          <weather-forecast-component
            :data="data"
          />
        </v-col>
      </v-row>


      <v-card class="pa-4">
        <v-card-title>Cheapest flights per day</v-card-title>
        <line-chart
          v-if="flightDataValues.length"
          :x-axis-labels="flightDataDateStrings"
          :values="flightDataValues"
        />
        <v-skeleton-loader
          v-else
          type="card"
        />
      </v-card>
    </v-container>
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import WeatherForecastComponent from '@/components/WeatherForecast.vue';
import LineChart from '@/components/LineChart.vue';

import WeatherRepository from '@/repositories/WeatherRepository';
import FlightRepository from '@/repositories/FlightRepository';

import {
  City, WeatherForecast, FlightData, FlightDataArr, LineChartData, LineChartDataArr,
} from '@/types';
import {
  sameDay, dateRange, futureDate, dateToDateString,
} from '@/libraries/date';

const FLIGHT_PRICES_NUMBER_OF_DAYS = 14;

export default Vue.extend({
  components: {
    AppLayout,
    WeatherForecastComponent,
    LineChart,
  },

  props: {
    appSettings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dateRange: dateRange(new Date(), 4),
      weatherForecastPerCity: [] as WeatherForecast[],

      showWeatherForecast: true,
      showFlightPrices: true,
      showCityImages: true,

      flightSearchResults: [] as FlightDataArr[],
      flightDataValues: [] as LineChartDataArr,
    };
  },

  computed: {
    flightDataDateStrings() {
      const result = [];

      const date = new Date();
      for (let i = 0; i < FLIGHT_PRICES_NUMBER_OF_DAYS; i += 1) {
        date.setDate(date.getDate() + 1);
        result.push(dateToDateString(date));
      }

      return result;
    },
  },

  created() {
    this.loadWeatherData(this.appSettings?.officeLocations);
    this.loadFlightData(this.appSettings?.currentLocation, this.appSettings?.officeLocations);
  },

  methods: {
    loadWeatherData(locations: City[]) {
      if (!locations) {
        return;
      }
      locations.forEach((location) => {
        WeatherRepository.getForecast(location.name).then((response) => {
          this.weatherForecastPerCity.push(response);
        });
      });
    },
    loadFlightData(currentLocation: City, locations: City[]) {
      if (!currentLocation || !locations) {
        return;
      }
      const flightSearchesPerCity: Promise<FlightDataArr>[] = [];
      locations.forEach((location) => {
        flightSearchesPerCity.push(FlightRepository.search({
          fromCityCode: currentLocation.cityCode,
          toCityCode: location.cityCode,
          fromDateStart: new Date(),
          fromDateEnd: futureDate(new Date(), FLIGHT_PRICES_NUMBER_OF_DAYS),
        }));
      });

      Promise.all(flightSearchesPerCity).then((response) => {
        this.flightSearchResults = response;

        // convert flightData
        this.computeFlightDataValues();
      });
    },

    computeFlightDataValues(): void {
      const result = [] as LineChartDataArr;
      // for the flightData of every city
      this.flightSearchResults.forEach((cityFlightDatas) => {
        const cheapestFlights: number[] = [];
        // find cheapest flight for each date
        this.flightDataDateStrings.forEach((dateString) => {
          const cheapestFlightOnDate = cityFlightDatas.reduce((prev, cur) => {
            if (dateToDateString(cur.departureDate) !== dateString) {
              return prev;
            }
            if (prev.price === 0 || cur.price < prev.price) {
              return cur;
            }
            return prev;
          }, { departureDate: new Date(), price: 0 } as unknown as FlightData);

          cheapestFlights.push(cheapestFlightOnDate.price);
        });

        const cityFlightData: LineChartData = {
          label: cityFlightDatas[0].arivalCity,
          data: cheapestFlights,
        };

        result.push(cityFlightData);
      });

      this.flightDataValues = result;
    },
  },
});
</script>
