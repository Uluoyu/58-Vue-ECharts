import Vue from 'vue'
import VueRouter from 'vue-router'
import AreaPage from '../views/AreaPage.vue'
import HouseTypePage from '../views/HouseTypePage.vue'
import HousePayWayPage from '../views/HousePayWayPage.vue'
import AreaAndPricePage from '../views/AreaAndPricePage.vue'
import PricePage from '../views/PricePage.vue'
import HouseAreaPage from '../views/HouseAreaPage.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/areapage',
    component: AreaPage
  },
  {
    path: '/housetypepage',
    component: HouseTypePage
  },
  {
    path: '/housepaywaypage',
    component: HousePayWayPage
  },
  {
    path: '/areaandpricepage',
    component: AreaAndPricePage
  },
  {
    path: '/pricepage',
    component: PricePage
  },
  {
    path: '/houseareapage',
    component: HouseAreaPage
  }
]

const router = new VueRouter({
  routes
})

export default router
