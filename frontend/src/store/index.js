import { createStore } from 'vuex'

export default createStore({
  state: {
    companyName: "Groupomania",
  },
  // getters used in App.vue
  getters: {
    copyright: (state) => {
      const currentYear = new Date().getFullYear()
      return `En ${currentYear} le groupe ${state.companyName} est actif. Le site est destiné uniquement aux personnels internes. Tous droits réservés`
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})