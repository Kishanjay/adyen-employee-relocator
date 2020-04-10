<template>
  <app-layout>
    <h1>test</h1>
    <line-chart
      :x-axis-labels="[1,2,3,4]"
      :values="[{ label: 'Amsterdam', data: [1,2,3,4]} , { label: 'DH', data: [2,3,3,4]} ]"
    />
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue';
import LineChart from '../components/LineChart.vue';

export default {
  components: {
    AppLayout,
    LineChart,
  },
};
</script>

<style>

</style>
