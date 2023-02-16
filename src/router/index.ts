import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AdminLogin from '../views/Auth/admin/loginPage.vue'
// import AdminRegister from '../views/Auth/admin/registerPage.vue'
import SellerLogin from '../views/Auth/seller/loginPage.vue'
import SellerRegister from '../views/Auth/seller/registerPage.vue'
import CategoryList from '../views/MasterData/categoryPage.vue'
import ProductList from '../views/MasterData/productPage.vue'
import SellerList from '../views/sellerPage.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path:'/adminr',
  //   name: 'Admin_Register',
  //   component: AdminRegister
  // },
  {
    path:'/',
    name: 'Admin_Login',
    component: AdminLogin
  },
  {
    path:'/sellerr',
    name: 'Seller_Register',
    component: SellerRegister
  },
  {
    path:'/seller',
    name: 'Seller_Login',
    component: SellerLogin
  },
  {
    path: '/category_list',
    name: 'category_list',
    meta: {
      auth: true
    },
    component: CategoryList,
  },
  {
    path: '/product_list',
    name: 'product_list',
    meta: {
      auth: true
    },
    component: ProductList
  },
  {
    path:'/seller_list',
    name: 'Seller_List',
    meta: {
      auth: true
    },
    component: SellerList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = sessionStorage.getItem('token')
  // alert(loggedIn);
  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/admin')
    return
  }
  next()
})

export default router
