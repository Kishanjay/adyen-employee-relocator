<template>
  <v-app id="adyen-relocator">
    <router-view :app-settings="appSettings" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { City } from '@/types';

interface AppSettingsObject {
  currentLocation: City;
  officeLocations: City[];
}
const appSettings: AppSettingsObject = {
  currentLocation: {
    name: 'New York', cityCode: 'NYC',
  },
  officeLocations: [
    { name: 'Amsterdam', cityCode: 'AMS' },
    { name: 'Madrid', cityCode: 'MAD' },
    { name: 'Budapest', cityCode: 'BUD' },

  ],
};

export default Vue.extend({
  data() {
    return {
      appSettings,
    };
  },
});
</script>
