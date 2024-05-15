import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Main from './components/Main.vue'
import Game from './components/Game.vue'
import Lose from './components/Lose.vue'
import Win from './components/Win.vue'
import { load } from './store.js'


Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))];
}

const routes = [
  { path: '/', name: "Menu", component: Main },
  { path: '/game', name: "Jatek", component: Game },
  { path: '/lose', name: "Lose", component: Lose },
  { path: '/win', name: "Win", component: Win },
]

const router = createRouter({

  history: createWebHashHistory(),
  routes,
})

// Todo: Jobban megcsinálni a store betöltését
load().catch(e => console.log(e)).finally(() => {
  createApp(App).use(router).mount('#app')
})





