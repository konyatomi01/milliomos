<script setup>
import {RouterView} from "vue-router"
import {useStore} from "./store.js"


const store = useStore()
</script>


<template>
  <router-view></router-view>
</template>


