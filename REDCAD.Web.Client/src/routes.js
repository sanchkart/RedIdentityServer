import Home from 'components/Home/home';
import Movies from 'components/Movies/movies';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    component: Movies
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
