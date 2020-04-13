<template>
  <div
    class="d-flex flex-column"
    style="min-height: 100vh;"
  >
    <the-appbar
      :app-settings="appSettings"
      @toggle:settings="toggleShowSettingsDrawer"
    />
    <the-settings-drawer
      :app-settings="appSettings"
      :show-settings-drawer.sync="showSettingsDrawer"
    />
    <v-content>
      <slot />
    </v-content>

    <the-navigator />
  </div>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue';
import { AppSettings } from '@/types';
import TheAppbar from '../components/TheAppbar.vue';
import TheNavigator from '../components/TheNavigator.vue';
import TheSettingsDrawer from '../components/TheSettingsDrawer.vue';


export default Vue.extend({
  components: {
    TheAppbar,
    TheNavigator,
    TheSettingsDrawer,
  },
  props: {
    appSettings: {
      type: Object as PropType<AppSettings>,
      required: true,
    },


  },
  data() {
    return {
      showSettingsDrawer: false,
    };
  },
  methods: {
    toggleShowSettingsDrawer() {
      this.showSettingsDrawer = !this.showSettingsDrawer;
    },
  },
});
</script>
