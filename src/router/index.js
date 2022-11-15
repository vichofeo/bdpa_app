import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import OpcionesView from '../views/OpcionesView.vue'
import pruebas from "@/views/pruebas.vue"


import VAsegurado  from '@/views/VAsegurado.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "Menu" */ '../views/Menu.vue')
  },
  {
    path: '/opciones',
    name: 'opciones',
    component: () => import(/* webpackChunkName: "ValidacionTitulares" */ '../views/OpcionesView.vue')
  },
  
  
  
  //ruta de opciones de sasgurad
  {
    path: "/asegurado",
    name: "asegurado",
    component: VAsegurado,
    //beforeEnter : authGuard
    meta: { requiereAuth: true },
    children : [

    ]
  },
  {
    path: "/pruebas",
    name: "pruebas",
    component: pruebas,
    //beforeEnter : authGuard
    meta: { requiereAuth: false },
    children : [

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
