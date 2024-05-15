<template>
  <div class="container">
    <div class="button-container">
      <button @click="onStartNewGame">Új játék</button>
    </div>

    <div v-if="voltJáték" class="button-container">
      <button @click="onContinueGame">Játék folytatása</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh; 
}

.button-container {
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>



<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router'
import { useStore } from '../store.js'
const router = useRouter()

const {startNewGame, voltJáték} = useStore()

const onStartNewGame = () => {
  startNewGame()
  router.push({name: "Jatek"})
}

function onContinueGame() {
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
