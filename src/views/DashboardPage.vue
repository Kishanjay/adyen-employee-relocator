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
          v-for="(data, index) in weatherForecast"
          :key="index"
        >
          <weather-forecast-component
            :data="data"
          />
        </v-col>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import WeatherForecastComponent from '@/components/WeatherForecast.vue';

import WeatherRepository from '@/repositories/WeatherRepository';
import FlightRepository from '@/repositories/FlightRepository';

import { City, WeatherForecast } from '@/types';
import { dateRange, futureDate } from '@/libraries/date';

export default Vue.extend({
  components: {
    AppLayout,
    WeatherForecastComponent,
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
      weatherForecast: [] as any,

      showWeatherForecast: true,
      showFlightPrices: true,
      showCityImages: true,
    };
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
          this.weatherForecast.push(response);
        });
      });
    },
    loadFlightData(currentLocation: City, locations: City[]) {
      if (!currentLocation || !locations) {
        return;
      }
      locations.forEach((location) => {
        FlightRepository.search({
          fromCityCode: currentLocation.cityCode,
          toCityCode: location.cityCode,
          fromDateStart: new Date(),
          fromDateEnd: futureDate(new Date(), 5),
        });
      });
    },
  },
});
</script>
