<template>
  <div
    class="d-flex flex-column"
    style="min-height: 100vh;"
  >
    <the-appbar />

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

  data() {
    return {
      drawer: null,
    };
  },
});
</script>
