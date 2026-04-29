<script setup lang="ts">
  import StarIcon from '@/assets/icons/star.svg';
  defineProps<{
    rating: number;
  }>();
</script>

<template>
  <span class="flex w-fit items-center">
    <img class="min-h-5 w-5 pb-0.5" :src="StarIcon" alt="" />
    <h3 class="text-bold ml-1 text-amber-400">{{ rating }}</h3>
  </span>
</template>
