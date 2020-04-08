
<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ data.city }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />

    <v-list>
      <v-list-item
        v-for="(weather, index) in data.weather"
        :key="index"
        class="mt-4"
      >
        <v-list-item-title>{{ weather.date | humanizedDate }}</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ weather.minTemperatureCelsius }}&deg;
          /
          {{ weather.maxTemperatureCelsius }}&deg;
          <v-icon>mdi-thermometer</v-icon><br>
          94% <v-icon>mdi-weather-pouring</v-icon>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { PropInterface, WeatherForecast } from '../types';


export default Vue.extend({
  props: {
    data: {
      type: Object as PropInterface<WeatherForecast>,
      required: true,
    },
  },
});
</script>

<style>

</style>
