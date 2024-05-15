<template>
    <button ref="target" class="dropdown" @click="value = !value">
        <slot></slot>
        <div v-show="value" class="dropdown-content">
           <slot name="items"></slot>
        </div>
    </button>
</template>

<script setup>
import {ref} from "vue"
import { onClickOutside } from '@vueuse/core'

const value = ref(false)
const target = ref()
onClickOutside(target, () => value.value = false)

</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    position: absolute;
    
    background-color: rgba(0, 0, 0, 0.539);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}
</style>