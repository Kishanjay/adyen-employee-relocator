<template>
  <v-navigation-drawer
    v-model="visible"
    absolute
    temporary
    bottom
    right
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Settings
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-dialog
        v-model="showEditOriginLocation"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <v-list-item
            link
            v-on="on"
          >
            <v-list-item-content>
              <v-list-item-title>
                Origin location
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ updatedAppSettings.currentLocation.name }}
                [{{ updatedAppSettings.currentLocation.cityCode }}]
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon color="grey lighten-1">
                mdi-pencil
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </template>
        <edit-origin-location
          :origin-location="updatedAppSettings.currentLocation"
          @update:originLocation="updateOriginLocation"
          @done="showEditOriginLocation = false"
        />
      </v-dialog>

      <v-list-item
        link
        @click="alert('Unsupported. If you really want you can edit this in localStorage')"
      >
        <v-list-item-content>
          <v-list-item-title>
            Destination location
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ updatedAppSettings.officeLocations.map(l => l.name).join(', ') }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-icon color="grey lighten-1">
            mdi-pencil
          </v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-list-item>
      <v-list-item-content>
        <v-btn
          block
          color="primary"
          @click="saveSettings"
        >
          Update
        </v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import EditOriginLocation from './EditOriginLocation.vue';

export default {
  components: {
    EditOriginLocation,
  },
  props: {
    showSettingsDrawer: {
      type: Boolean,
      required: true,
    },
    appSettings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showEditOriginLocation: false,
      updatedAppSettings: { ...this.appSettings },
    };
  },
  computed: {
    visible: {
      get() {
        return this.showSettingsDrawer;
      },
      set(value) {
        this.$emit('update:showSettingsDrawer', value);
      },
    },
  },
  methods: {
    updateOriginLocation(newOriginLocation) {
      this.updatedAppSettings.currentLocation = newOriginLocation;
    },
    saveSettings() {
      localStorage.setItem('appSettings', JSON.stringify(this.updatedAppSettings));
      this.$router.go(0);
    },
    // eslint-disable-next-line no-alert
    alert: (msg) => window.alert(msg),
  },
};
</script>

<style>

</style>
