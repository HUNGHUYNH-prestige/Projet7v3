import { createRouter, createWebHashHistory } from 'vue-router'
//import Home from '../views/Home.vue'

// views use component to reflect
// views import component
// components export to being used by views

// when the router is in use
// there is : # in the url
// # means : fragment identifier

// 2 import methods :
// - method :  1  --> import Home from '../views/Home.vue'
// - method :  2  --> component: () => import('../views/Homne.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    //component: Home,
    component: () =>
      import('../views/Home.vue'),
    alias: ['/home'],
    meta: {
      title: 'Accueil',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => 
      import('../views/Login.vue'),
    meta: {
      title: 'Login',
      hideForAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => 
      import('../views/Signup.vue'),
    meta: {
      title: 'Signup',
      hideForAuth: true
    }
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => 
      import('../views/OnePost.vue'),
    meta: {
      title: 'Post',
      requiresAuth: true
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'postEdition',
    component: () => 
      import('../views/PostEdition.vue'),
    meta: {
      title: 'Editer le post',
      requiresAuth: true
    }
  },
  {
    path: '/posts/:postId/comments/:id/edit',
    name: 'CommentEdition',
    component: () => 
      import('../views/CommentEdition.vue'),
    meta: {
      title: 'Editer le commentaire',
      requiresAuth: true
    }
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => 
      import('../views/Submit.vue'),
    meta: {
      title: 'Créer un post',
      requiresAuth: true
    }
  },
  {
    path: '/profiles/:id',
    name: 'userProfile',
    component: () => 
      import('../views/UserProfile.vue'),
    meta: {
      title: 'Profil utilisateur',
      requiresAuth: true
    }
  },
  {
    path: '/profiles/:id/edit',
    name: 'profileEdition',
    component: () => 
      import('../views/ProfileEdition.vue'),
    meta: {
      title: 'Editer le profil',
      requiresAuth: true
    }
  },
  {
    path: '/charter',
    name: 'charter',
    component: () => 
      import('../views/ForumCharter.vue'),
    meta: {
      title: 'Charte du forum',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
// use : Global Before Guards to prevent the security of each route
// site : https://newbedev.com/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from-other-pages-to-login-if-not-loggedin-in-vue-router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Groupomania'
  // This route needs auth, so needs to be logged in
  if (to.matched.some(loggingIsOk => loggingIsOk.meta.requiresAuth)) {
    // if the user is not in the local storage then go to : login page
    if (!localStorage.getItem('userToken')) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some(loggingIsOk => loggingIsOk.meta.hideForAuth)) {
    if (localStorage.getItem('userToken')) {
      next({ name: 'home' })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
