<script setup lang="ts">
  import AppHeader from './components/AppHeader.vue';
  import { useShowStore } from './stores/showStore';

  const { initialLoadShows } = useShowStore();
  console.log('loaded');
  initialLoadShows();
</script>

<template>
  <AppHeader></AppHeader>
  <RouterView></RouterView>
</template>

<style scoped></style>
