<template>
  <app-layout :app-settings="appSettings">
    <v-container>
      <v-card>
        <v-card-title>Images</v-card-title>
        <v-card
          v-for="(imagesOfCity, index) in imagesOfCities"
          :key="index"
          flat
          tile
        >
          <v-card-title>{{ imagesOfCity.city }}</v-card-title>
          <v-row>
            <v-col
              v-for="(image, imageIndex) in imagesOfCity.images"
              :key="imageIndex"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img
                :src="image.imageURL"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

import ImageRepository from '@/repositories/ImageRepository';

import { City } from '@/types';

export default Vue.extend({
  components: {
    AppLayout,
  },

  props: {
    appSettings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      imagesOfCities: [] as any,
    };
  },
  created() {
    this.loadImages(this.appSettings?.officeLocations);
  },
  methods: {
    loadImages(locations: City[]) {
      locations.forEach((location) => {
        ((cityName) => {
          ImageRepository.search(cityName).then((result) => {
            this.imagesOfCities.push({ city: cityName, images: result });
          });
        })(location.name);
      });
    },
  },
});
</script>
