import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projects',
      component: () => import('../views/Projects/ProjectsView.vue'),
      meta: {
        requiresAuth: true,
      },
      
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('../views/Projects/OneProjectView.vue'),
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
        {
      path: '/tasks/',
      name: 'tasks',
      component: () => import('../views/Tasks/TasksView.vue'),
      props: true,
      meta: {
        requiresAuth: true,
      },
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
