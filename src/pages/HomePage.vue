<template>
  <base-layout>
    <v-container>
      <v-alert
        color="info"
        outlined
      >
        <div class="d-flex justify-space-between font-weight-bold">
          <span>
            Comparing: Amsterdam, Madrid, Budapest
          </span>
        </div>
      </v-alert>

      <v-alert
        color="info"
        text
      >
        <div class="d-flex justify-space-between font-weight-bold">
          <span>
            Date range: {{ dateRange }}
          </span>
          <a
            @click="() => { alert('Premium required to use this feature')}"
          >Change date</a>
        </div>
      </v-alert>

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
  </base-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import WeatherForecastComponent from '@/components/WeatherForecast.vue';

import WeatherRepository from '@/repositories/WeatherRepository';

import { WeatherForecast } from '@/types';
import { dateRange } from '@/libraries/date';

export default Vue.extend({
  components: {
    BaseLayout,
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
    };
  },

  created() {
    this.loadWeatherData(this.appSettings?.officeLocations);
  },

  methods: {
    loadWeatherData(locations: string[]) {
      if (!locations) {
        return;
      }
      locations.forEach((location) => {
        WeatherRepository.getForecast(location).then((response) => {
          this.weatherForecast.push(response);
        });
      });
    },
    // eslint-disable-next-line no-alert
    alert(msg: string) { window.alert(msg); },
  },
});
</script>
