<template>
  <v-bottom-navigation>
    <v-btn
      value="dashboard"
      to="/"
    >
      <span>Weather</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn
      value="flights"
      to="/flights"
    >
      <span>Flights</span>
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>

    <v-btn
      value="images"
      to="/images"
    >
      <span>Mood</span>
      <v-icon>mdi-clipboard-text</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts">
export default {
  // TODO add active state
};
</script>

<style>

</style>
