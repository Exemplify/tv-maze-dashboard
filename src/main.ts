import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useShowStore } from './stores/showStore';

// (async () => {
//   const shows = await getShows();
//   const episodes = await getEpisodes(1);
//   const searchResult = await getShowSearch('arcane');
//   console.log(searchResult[0]);
// })();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount('#app');
const { initialLoadShows } = useShowStore();
initialLoadShows();
