import router from '../router';

export const navigateToShowPage = (id: number) => {
  router.push(`/shows/${id}`);
};
