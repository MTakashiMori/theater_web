import Vue from 'vue'
import VueRouter from 'vue-router'
import PathTemplate from '../components/path-template.vue';
import MovieShow from '../components/movie-show.vue';
import MovieList from '../components/movie-list.vue';
import MovieRate from '../components/movie-rate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/movie',
    component: PathTemplate,
    children: [
      {
        path: '',
        component: MovieList,
        name: 'movie-list'
      },
      {
        path: ':id',
        component: MovieShow,
        name: 'movie-show'
      },
      {
        path: ':id',
        component: MovieRate,
        name: 'movie-rate'
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router
