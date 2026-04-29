<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import ShowRating from '../components/ShowRating.vue';
  import { useShowStore } from '../stores/showStore';
  import { useRoute } from 'vue-router';

  const store = useShowStore();
  const route = useRoute();
  const loading = ref(true);

  const show = computed(() => store.showDetails);
  onMounted(async () => {
    const showId = route.params.id;
    await store.loadShowDetails(Number(showId));
    loading.value = false;
  });

  watch(
    () => route.params.id,
    async (newId) => {
      if (newId) {
        loading.value = true;
        await store.loadShowDetails(Number(newId));
        loading.value = false;
      }
    },
  );
</script>

<template>
  <article v-if="!loading" class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-2">
    <div class="flex flex-col items-center gap-4">
      <h1 class="mt-4 w-full max-w-6xl text-center text-2xl font-bold text-gray-300">
        {{ show.name }}
      </h1>
      <img class="w-5/6 max-w-xl rounded-2xl" :src="show.image.original" :alt="show.name" />
    </div>
    <div class="flex w-full flex-col items-center text-zinc-400 md:mt-8">
      <div class="flex w-5/6 justify-between">
        <p>{{ show.genres.join(', ') }}</p>
        <ShowRating :rating="show.rating.average"></ShowRating>
      </div>
      <div class="flex w-5/6 justify-between">
        <p>Language: {{ show.language }}</p>
        <p>Average Runtime: {{ show.averageRuntime }}</p>
      </div>
      <div class="flex w-5/6 justify-between">
        <p>Seasons: {{ show.seasons }}</p>
        <p>Episodes: {{ show.episodes }}</p>
      </div>
      <div v-html="show.summary" class="my-8 flex w-5/6 justify-between"></div>
    </div>
  </article>
</template>
