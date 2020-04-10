<template>
  <app-layout :app-settings="appSettings">
    <v-container>
      <v-card>
        <v-card-title>Cheapest flights per day</v-card-title>
        <line-chart
          v-if="flightDataValues.length"
          class="pa-4"
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
import LineChart from '@/components/LineChart.vue';

import FlightRepository from '@/repositories/FlightRepository';
import { futureDate, dateToDateString } from '@/libraries/date';

import {
  City, FlightData, FlightDataArr, LineChartData, LineChartDataArr,
} from '@/types';

const FLIGHT_PRICES_NUMBER_OF_DAYS = 14;

export default Vue.extend({
  components: {
    AppLayout,
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
      flightSearchResults: [] as FlightDataArr[],
      cheapestFlightsOfCities: [] as LineChartDataArr,
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
    this.loadFlightData(this.appSettings?.currentLocation, this.appSettings?.officeLocations);
  },
  methods: {
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
        this.computeCheapestFlightsOfCities();
      });
    },
    computeCheapestFlightsOfCities(): void {
      const result = [] as LineChartDataArr;
      // Loop over the flight data of each city
      this.flightSearchResults.forEach((cityFlightDatas) => {
        const cheapestFlightsArr: number[] = [];
        // Loop over the dates we're fetching
        this.flightDataDateStrings.forEach((dateString) => {
          // Find the cheapest flight for this date
          const cheapestFlightOnDate = cityFlightDatas.reduce((prev, cur) => {
            if (dateToDateString(cur.departureDate) !== dateString) {
              return prev;
            }
            if (prev.price === 0 || cur.price < prev.price) {
              return cur;
            }
            return prev;
          }, { departureDate: new Date(), price: 0 } as unknown as FlightData);

          cheapestFlightsArr.push(cheapestFlightOnDate.price);
        });

        //
        const cheapestFlightsOfCity: LineChartData = {
          label: cityFlightDatas[0].arivalCity,
          data: cheapestFlightsArr,
        };

        result.push(cheapestFlightsOfCity);
      });

      this.cheapestFlightsOfCities = result;
    },
  },
});
</script>

<style>

</style>
