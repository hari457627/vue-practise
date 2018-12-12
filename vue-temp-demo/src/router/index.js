import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Mainbody from '@/components/main'
import Portfolio from '@/views/portfolio'
import About from '@/views/about'
import Contact from '@/views/contact'
import Themes from '@/views/themes'
import Dashboard from '@/views/dashboard'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Mainbody,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/portfolio',
          name: 'portfolio',
          component: Portfolio
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contact
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/themes',
          name: 'themes',
          component: Themes
        }
      ]
    }
  ]
})
