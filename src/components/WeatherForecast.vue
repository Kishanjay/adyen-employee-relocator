
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
      >
        <v-list-item-title>{{ weather.date | humanizedDate }}</v-list-item-title>
        <v-list-item-subtitle class="text-right">
          {{ weather.minTemperatureCelsius }}&deg;
          /
          {{ weather.maxTemperatureCelsius }}&deg;
          <v-icon>mdi-thermometer</v-icon>
          <template v-if="showRain">
            <br>{{ weather.rainMillimeters }}mm <v-icon>mdi-weather-pouring</v-icon>
          </template>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { WeatherForecast } from '../types';


export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<WeatherForecast>,
      required: true,
    },
    showRain: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style>

</style>
