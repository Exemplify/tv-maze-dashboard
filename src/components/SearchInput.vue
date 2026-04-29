<script setup lang="ts">
  import { ref } from 'vue';
  import { useSearch } from '../composables/useSearch';
  const { query, results } = useSearch();
  const searchResults = ref([]);

  const emit = defineEmits<{
    showSearched: [id: number];
  }>();

  const handleClick = (id: number) => {
    query.value = '';
    searchResults.value = [];
    emit('showSearched', id);
  };
</script>

<template>
  <div>
    <input
      class="rounded-lg border-2 border-slate-800 bg-zinc-800 p-1 text-slate-400"
      placeholder="Search shows"
      type="text"
      id="search"
      autocomplete="off"
      v-model="query"
    />
    <ul v-if="results.length" class="absolute w-48 rounded-2xl bg-zinc-900">
      <li
        v-for="({ show }, index) in results"
        :key="index"
        class="m-2 w-11/12 border-b-2 border-slate-600 px-4 py-2 text-sm active:bg-zinc-800"
        @click="(e) => handleClick(show.id)"
      >
        <p>{{ show.name }}</p>
      </li>
    </ul>
  </div>
</template>
