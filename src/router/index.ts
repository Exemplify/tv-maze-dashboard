import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailsView from '../views/DetailsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/shows/:id', component: DetailsView },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
