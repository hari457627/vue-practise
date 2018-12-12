import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Dashboard from '@/components/Dashboard'
import Mainbody from '@/components/Mainbody'
import Portfolio from '@/views/portfolio'
import About from '@/views/about'
import Contact from '@/views/contact'
import Themes from '@/views/theme'
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
      component: Dashboard,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Mainbody
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
