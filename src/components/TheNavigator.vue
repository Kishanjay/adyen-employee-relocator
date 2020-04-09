<template>
  <v-bottom-navigation
    v-model="bottomNav"
  >
    <v-btn value="recent">
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Graph</span>
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Recommender</span>
      <v-icon>mdi-clipboard-text</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script lang="ts">
export default {

};
</script>

<style>

</style>
