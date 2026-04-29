<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import SearchInput from './SearchInput.vue';
  import { navigateToShowPage } from '../utils';
</script>

<template>
  <header
    class="flex h-16 w-screen items-center justify-around border-b-4 border-sky-900 bg-zinc-900"
  >
    <RouterLink to="/">
      <h1 class="ml-3 text-3xl font-bold text-sky-500 active:text-sky-300">TV MAZE</h1>
    </RouterLink>
    <SearchInput @show-searched="navigateToShowPage"></SearchInput>
  </header>
</template>
