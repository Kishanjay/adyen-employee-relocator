<template>
  <v-app id="adyen-relocation">
    <HomePage :app-settings="appSettings" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HomePage from '@/pages/HomePage.vue';

interface AppSettingsObject {
  officeLocations: string[];
}
const appSettings: AppSettingsObject = {
  officeLocations: ['Amsterdam', 'Madrid', 'Budapest'],
};

export default Vue.extend({
  components: {
    HomePage,
  },

  data() {
    return {
      appSettings,
    };
  },
});
</script>
