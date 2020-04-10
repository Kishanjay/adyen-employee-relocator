<template>
  <line-chart :chart-data="chartData" />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Line } from 'vue-chartjs';
import { ChartData, ChartDataSets } from 'chart.js';


import { stringToRgb } from '@/libraries/color';
import { LineChartData, LineChartDataArr } from '@/types';

const LineChart = Vue.extend({
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    // Work around since Vue.extend function is not picking up on
    // extended functions inhereited by the 'extends' property
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).renderChart(this.chartData, this.options);
  },
});

export default Vue.extend({
  components: {
    LineChart,
  },
  props: {
    xAxisLabels: {
      required: true,
      type: Array as PropType<string[]>,
    },
    values: {
      required: true,
      type: Array as PropType<LineChartDataArr>,
    },
  },
  computed: {
    chartData() {
      const chartData: ChartData = {};

      chartData.labels = this.xAxisLabels;
      chartData.datasets = this.values.map((d: LineChartData) => {
        const dataset: ChartDataSets = {
          label: d.label,
          data: d.data,
          borderColor: stringToRgb(d.label),
          fill: false,
        };
        return dataset;
      });

      return chartData;
    },
  },
});
</script>

<style>

</style>
