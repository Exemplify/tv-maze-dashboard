<script setup lang="ts">
  import type { Show } from '../models';
  import ShowRating from './ShowRating.vue';
  defineProps<{
    show?: Show;
  }>();
</script>

<template>
  <article
    class="h-fit w-36 rounded-xl border-2 border-sky-900 bg-zinc-900 shadow shadow-slate-700 md:w-56"
  >
    <div class="h-52 w-full md:h-80">
      <!-- image -->
      <img
        loading="lazy"
        draggable="false"
        class="h-full w-full object-cover select-none"
        :src="show?.image?.medium"
        :title="show?.name"
      />
    </div>
    <div class="flex flex-col items-center border-t-2 border-sky-900">
      <!-- details -->
      <ShowRating :rating="show?.rating.average ?? 0"></ShowRating>
      <h3
        class="my-auto w-full overflow-hidden px-2 text-center text-sm text-nowrap text-ellipsis md:text-lg"
      >
        {{ show?.name }}
      </h3>
    </div>
  </article>
</template>
