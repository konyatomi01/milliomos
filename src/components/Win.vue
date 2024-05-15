<template>
        <div class="container">
      <div class="content">
      <div class="top">
        <h1 class="text">Gratulálunk, Ön megnyerte az 50 millió Forintot!</h1>
        </div>
        <div>
          <button @click="onStartNewGame">Új játék</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh; 
  }
  
  .content {
    text-align: center;
    
  }
  .top {
  background-color: rgba(0, 0, 0, 0.539);
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 2rem;
}
  
  </style>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter} from 'vue-router'
  import { useStore } from '../store.js'
  import audioFile from '../assets/winzene.wav'
  const router = useRouter()
  
  const {
  difficulty,
  Question,
  voltFelezes,
  voltKozonseg,
  voltKerdesCsere,
  switchQuestion
} = useStore()

var audio = new Audio(audioFile)
audio.play()

  const {startNewGame, voltJáték} = useStore()
  
  const onStartNewGame = () => {
    startNewGame()
    router.push({name: "Jatek"})
  }
  
  
  
  </script>
  
  <style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  