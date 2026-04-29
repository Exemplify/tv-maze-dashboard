<script setup lang="ts">
  import type { Show } from '../models';
  import ShowCard from './ShowCard.vue';

  defineProps<{
    genre: string;
    showList: Show[];
  }>();
  const emit = defineEmits<{
    showClicked: [id: number];
  }>();

  const handleClick = (id: number) => {
    emit('showClicked', id);
  };
</script>

<template>
  <section class="max-w-full">
    <h2 class="ml-2 text-2xl font-bold text-zinc-400">{{ genre }}</h2>
    <div class="slider mx-4 flex items-center justify-evenly gap-8 overflow-auto py-4 select-none">
      <div v-for="show in showList" :key="show.id">
        <ShowCard :show="show" @click="(event: Event) => handleClick(show.id)"></ShowCard>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
  @media (min-width: 768px) {
    .slider::-webkit-scrollbar {
      height: 0.8rem;
    }
    .slider::-webkit-scrollbar-thumb {
      background: var(--color-sky-800);
      border-radius: 1rem;
    }
    .slider::-webkit-scrollbar-track {
      background: var(--color-zinc-950);
    }
  }
</style>
