<template>
  <header>
    <v-app-bar
      app
      clipped-left
    >
      <v-toolbar-title>Relocation Helper</v-toolbar-title>
      <v-spacer />
      <v-btn
        outlined
        @click="$emit('toggle:settings');"
      >
        <v-icon>mdi-cog</v-icon>
        Settings
      </v-btn>

      <template v-slot:extension>
        <div class="d-flex wp100">
          <span class="mr-8">Origin: <b>{{ appSettings.currentLocation.name }}</b></span>
          <span>
            Destination:
            <b>[{{ appSettings.officeLocations.map(l => l.name).join(', ') }}]</b>
          </span>
        </div>
      </template>
    </v-app-bar>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    appSettings: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style>

</style>
