<template>
  <div
    class="d-flex flex-column"
    style="min-height: 100vh;"
  >
    <the-appbar :app-settings="appSettings" />

    <v-content>
      <slot />
    </v-content>

    <the-navigator />
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import TheAppbar from '../components/TheAppbar.vue';
import TheNavigator from '../components/TheNavigator.vue';

export default Vue.extend({
  components: {
    TheAppbar,
    TheNavigator,
  },
  props: {
    appSettings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawer: null,
    };
  },
});
</script>
