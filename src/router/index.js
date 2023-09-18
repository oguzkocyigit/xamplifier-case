import Vue from 'vue';
import Router from 'vue-router';
import ProductsView from '@/views/ProductsView.vue';
import CartView from '@/views/CheckoutView.vue';
import LoginView from '@/views/LoginView.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth !== null && store.state.auth !== undefined;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
