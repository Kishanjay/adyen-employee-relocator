<template>
  <div>
    <TheNavigator />

    <v-content>
      <slot />
    </v-content>
    <TheFooter />
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import TheNavigator from '../components/TheNavigator.vue';
import TheFooter from '../components/TheFooter.vue';

export default Vue.extend({
  components: {
    TheNavigator,
    TheFooter,
  },

  data() {
    return {
      drawer: null,
    };
  },
});
</script>
