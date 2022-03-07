import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import Book from '../views/BookView.vue'
import Clients from '../views/ClientsView.vue'
import Products from '../views/ProductsView.vue'
import Admin from '../views/AdminView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/book',
    name: 'Book',
    component: Book,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth == true && router.app.$store.state.auth.authenticated == false) {
    console.log("move to signin")
    next({ name: 'SignIn' })
    console.log("-----------")
    console.log(router.app.$store.state.auth.isAdmin)

  } else {
    next()
  }

  if (to.meta.requiresAuth == true && 
    to.meta.requiresAdmin == true && 
    router.app.$store.state.auth.authenticated == true && 
    router.app.$store.state.auth.isAdmin == false) {
      next({ name: 'Book' })

  } else {
    next()

  }

})

//guard clause
// router.beforeEach((to, from, next) => {
//    console.log("if not sing in ",to.path !='/signin')

//   if(to.path !='/signin'){
//     // if(to.meta.requiresAuth ==true){
//     //   if(router.app.$store.state.auth.authenticated == false){
//         next("SignIn")
//     //   }
//     // }
//   }

// console.log("requied auth",to.meta)
// if(to.path !=='/signin'){
//   if(to.meta.requiresAuth &&router.app.$store.state.auth.authenticated == true){
//     next()
//   }else{
//     next("SignIn")
//   }
// }


// })

export default router