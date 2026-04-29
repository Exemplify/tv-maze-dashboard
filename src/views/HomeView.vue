<script setup lang="ts">
  import GenreSlider from '../components/GenreSlider.vue';
  import { useShowStore } from '../stores/showStore';
  import { navigateToShowPage } from '../utils';

  const showStore = useShowStore();
</script>

<template>
  <article class="md:flex md:w-4/5 md:flex-col md:justify-self-center">
    <div class="my-4" v-for="(slider, index) in showStore.showsByGenre" :key="index">
      <GenreSlider
        :genre="slider.genre"
        :show-list="slider.shows"
        @show-clicked="navigateToShowPage"
      ></GenreSlider>
    </div>
  </article>
</template>
