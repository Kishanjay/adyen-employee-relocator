<template>
  <v-bottom-navigation>
    <v-btn
      value="dashboard"
      to="/"
    >
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn
      value="graph"
      to="/graph"
    >
      <span>Graph</span>
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>

    <v-btn value="recommender">
      <span>Recommender</span>
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
