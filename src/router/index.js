import Vue from 'vue'
import VueRouter from 'vue-router'
import Vinita from "@/vinita/vinita"
import Kuldeep from "@/kuldeep/kuldeep"
Vue.use(VueRouter)

const routes = [
  {
    path:"",
    component:Vinita
  },
  {
    path:"/kuldeep",
    component:Kuldeep
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
