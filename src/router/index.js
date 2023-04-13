import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import CreateProject from '../views/CreateProjectView.vue';
import ProjectEdit from '../views/ProjectEditView.vue';
import Discuss from '../views/DiscussView.vue';

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/create/project',
    component: CreateProject
  },
  {
    path: '/project/:id',
    component: ProjectEdit
  },
  {
    path: '/discuss/:id',
    component: Discuss
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
