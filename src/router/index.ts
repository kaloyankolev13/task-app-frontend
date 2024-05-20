import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { jwtDecode } from 'jwt-decode';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: () => import('../views/ProjectsView.vue'),
    // },
    // {
    //   path: '/project/:id',
    //   name: 'project',
    //   component: () => import('../views/ProjectView.vue'),
    //   props: true,
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Admin/LoginView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin/AdminView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/product/:id',
      name: 'admin-edit',
      component: () => import('../views/Admin/EditView.vue'),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && (!token || isTokenExpired(token))) {
    next({ name: 'login' }); // Redirect to the login page
  } else {
    next(); // Continue to the next route
  }
});

function isTokenExpired(token: string) {
  const decodedToken = jwtDecode(token);
  if (!decodedToken.exp) {
    return false;
  }
  return decodedToken.exp < Date.now() / 1000; // check if the token has expired
}

export default router
