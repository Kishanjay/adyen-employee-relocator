<template>
  <v-card>
    <v-card-title class="headline">
      Edit Origin Location
    </v-card-title>
    <v-card-text class="pb-0">
      <v-text-field
        v-model="locationName"
        label="Name"
        placeholder="e.g. Amsterdam"
        outlined
      />
      <v-text-field
        v-model="locationCityCode"
        label="City code"
        placeholder="e.g. AMS"
        outlined
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="green darken-1"
        text
        @click="$emit('done')"
      >
        Done
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    originLocation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    locationName: {
      get() {
        return this.originLocation.name;
      },
      set(name) {
        this.$emit('update:originLocation', { ...this.originLocation, name });
      },
    },
    locationCityCode: {
      get() {
        return this.originLocation.cityCode;
      },
      set(cityCode) {
        this.$emit('update:originLocation', { ...this.originLocation, cityCode });
      },
    },
  },
};
</script>

<style>

</style>
