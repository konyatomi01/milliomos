<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Dropdown from './Dropdown.vue';
import { useStore } from '../store.js'
import { useRouter} from 'vue-router'
import audioFile from '../assets/inditas.wav'

const router = useRouter()

const {
  difficulty,
  Question,
  voltFelezes,
  voltKozonseg,
  voltKerdesCsere,
  switchQuestion
} = useStore()

let penz = ["5000", "10000", "20000", "50000", "100000", "200000", "300000", "500000", "800000", "1000000",
  "2000000", "5000000", "10000000", "20000000", "50000000"]


function submitAnswer(choice) {
  if (choice == Question.value.correctAnswer) {
    if (difficulty.value < 15) {
      difficulty.value++
      switchQuestion()
    }
    else router.push({name: "Win"})
  }
  else router.push({name: "Lose"})
}

function kerdesCsere() {
  voltKerdesCsere.value = true
  switchQuestion()
}

function randomInt(max) {
  return Math.floor(Math.random() * (max))
}

function randomElement(array, n = 1, exclude) {
  let result = []
  array = array.filter((_, i) => i != exclude)
  for (let i = 0; i < n; i++) {
    let index = randomInt(array.length)
    result.push(array[index])
    array = array.filter((_, i) => i != index)
  }
  return result
}

const lookup = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
}

function felezes() {
  voltFelezes.value = true
  let choices = randomElement(Question.value.answers, 2, lookup[Question.value.correctAnswer])
  choices.forEach(choice => {
    Question.value.answers[lookup[choice.id]].displayed = false
  })
}

function getGradient(percentage) {
  return `linear-gradient(90deg, rgb(27, 18, 168) ${percentage}%, rgb(255, 87, 5) ${percentage}%)`;
}


function kozonseg() {
  voltKozonseg.value = true
  let jo = Math.min(randomInt(60) + 30, 98)
  let rossz1 = Math.min(99 - jo, randomInt(100 - jo) + 2)
  let rossz2 = Math.min(100 - jo - rossz1, randomInt(100 - jo - rossz1) + 1)
  let rossz3 = 100 - jo - rossz1 - rossz2

  switch (Question.value.correctAnswer) {
    case "A":
      Question.value.answers[0].percentage = jo
      Question.value.answers[1].percentage = rossz1
      Question.value.answers[2].percentage = rossz2
      Question.value.answers[3].percentage = rossz3
      break

    case "B":
      Question.value.answers[0].percentage = rossz1
      Question.value.answers[1].percentage = jo
      Question.value.answers[2].percentage = rossz2
      Question.value.answers[3].percentage = rossz3
      break

    case "C":
      Question.value.answers[0].percentage = rossz2
      Question.value.answers[1].percentage = rossz1
      Question.value.answers[2].percentage = jo
      Question.value.answers[3].percentage = rossz3
      break

    case "D":
      Question.value.answers[0].percentage = rossz3
      Question.value.answers[1].percentage = rossz1
      Question.value.answers[2].percentage = rossz2
      Question.value.answers[3].percentage = jo
      break
  }
}

var audio = new Audio(audioFile)

onMounted(()=>{audio.play()}) 

const vanSegitseg = computed(() => {
  return !voltFelezes.value || !voltKozonseg.value || !voltKerdesCsere.value
})


</script>

<template>
  <main class="main">
    <section class="top">
      <div class="header">
        <div class="side">
          <Dropdown>
            <template #default>
              <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 -960 960 960">
                <path
                  d="M476-280q21 0 35.5-14.5T526-330q0-21-14.5-35.5T476-380q-21 0-35.5 14.5T426-330q0 21 14.5 35.5T476-280Zm-36-154h74q0-17 1.5-29t6.5-23q5-11 12.5-20.5T556-530q35-35 49.5-58.5T620-642q0-53-36-85.5T487-760q-55 0-93.5 27T340-658l66 26q7-27 28-43.5t49-16.5q27 0 45 14.5t18 38.5q0 17-11 36t-37 42q-17 14-27.5 27.5T453-505q-7 15-10 31.5t-3 39.5Zm40 394L360-160H200q-33 0-56.5-23.5T120-240v-560q0-33 23.5-56.5T200-880h560q33 0 56.5 23.5T840-800v560q0 33-23.5 56.5T760-160H600L480-40ZM200-240h192l88 88 88-88h192v-560H200v560Zm280-280Z" />
              </svg>
            </template>
            <template #items>
                <button v-show="!voltFelezes" class="help-option" @click="felezes">Felezés</button>
                <button v-show="!voltKozonseg" class="help-option" @click="kozonseg">Közönség</button>
                <button v-show="!voltKerdesCsere" class="help-option" @click="kerdesCsere">Csere</button>
                <p v-show="!vanSegitseg">Nincs több segítséged</p>
            </template>
          </Dropdown>
        </div>
        <div class="middle">
          <h1 class="text" style="text-align: center;">
            {{ difficulty }}.Kérdés
          </h1>
          <h1 class="text" style="text-align: center;">
            {{ penz[difficulty - 1] }} Ft
          </h1>
        </div>
        <div class="side">
          <button @click="()=>$router.push({name: 'Menu'})">
            <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 -960 960 960">
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        </div>
      </div>
      <h1 class="text" id="text" style="text-align: center; font-size: 1.3rem;">
        {{ Question?.text }}
      </h1>
    </section>
    <div class="question-layout">
      <div class="question" v-for="answer in Question.answers" :key="answer.id">
        <button v-show="answer.displayed"
          :style="answer.percentage != undefined ? `background: ${getGradient(answer.percentage)};` : ''"
          @click="() => submitAnswer(answer.id)">
          {{ answer.id }}: {{ answer.text }}
          <span v-if="answer.percentage != undefined">{{ answer.percentage }}%</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

@media (orientation: portrait) {
  .main {
    width: 90vw;
    margin: auto;
  }
}

.question-layout {
  flex: 1;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}

.question {
  width: 100%;
  text-align: center;
}

.question button {
  width: 100%;
  height: 100%;
  display: block;
}

.help-option {
  
  display: block;
  width: 100%;
  margin: 1rem;
  border-radius: 16px;
}

@media (orientation: portrait) {
  .question-layout {
    grid-template-columns: 1fr;
  }
}

.top {
  background-color: rgba(0, 0, 0, 0.539);
  border-radius: 16px;
  padding: 10px;
}

.header {
  display: flex;
  align-items: center;
}

.header .middle {
  flex: 3;
}

.header .side {
  color: white;
  fill: white;
  padding: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header .side button {
  display: block;
  padding: 0.5rem;
}

.header button svg {
  display: block;
}

.header .text {
  font-size: 1.5rem;
  margin: 0;
}

</style>