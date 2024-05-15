

<template>
    <div class="container">
      <div class="content">
      <div class="top">
        <h1 class="text">Helytelen válasz: Vége a játéknak!</h1>
        <h1 class="text">A helyes válasz: {{ rightAnswer }}</h1></div>
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
  import audioFile from '../assets/bruh.wav'
  import { ref } from 'vue';
  import { useRouter} from 'vue-router'
  import { useStore } from '../store.js'
  const router = useRouter()
  
  const {
  difficulty,
  Question,
  voltFelezes,
  voltKozonseg,
  voltKerdesCsere,
  switchQuestion
} = useStore()

var rightAnswer
switch(Question.value.correctAnswer) {
    case "A":
        rightAnswer = Question.value.answerA
        break
    case "B":
        rightAnswer = Question.value.answerB
        break
    case "C":
        rightAnswer = Question.value.answerC
        break
    case "D":
        rightAnswer = Question.value.answerD
        break    
            
}
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
  