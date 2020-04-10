<template>
  <app-layout :app-settings="appSettings">
    <v-container>
      <v-card>
        <v-card-title>Weather forecast</v-card-title>

        <v-row class="mx-1 pb-2">
          <v-col
            v-for="(data, index) in weatherForecastPerCity"
            :key="index"
          >
            <weather-forecast-component
              :data="data"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import WeatherForecastComponent from '@/components/WeatherForecast.vue';

import WeatherRepository from '@/repositories/WeatherRepository';
import { dateRange } from '@/libraries/date';

import { City, WeatherForecast } from '@/types';

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
      weatherForecastPerCity: [] as WeatherForecast[],
    };
  },
  created() {
    this.loadWeatherData(this.appSettings?.officeLocations);
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
  },
});
</script>
