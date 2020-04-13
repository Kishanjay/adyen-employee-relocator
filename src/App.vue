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
const defaultAppSettings: AppSettingsObject = {
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
    let appSettings = defaultAppSettings;
    const localAppSettings = localStorage.getItem('appSettings');
    if (localAppSettings) {
      try {
        appSettings = JSON.parse(localAppSettings);
      } catch (e) {
        console.log({ e });
      }
    }

    return {
      appSettings,
    };
  },
});
</script>
