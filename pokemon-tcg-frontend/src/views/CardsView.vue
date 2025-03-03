<template>
  <div>
    <h1>Listado de Cartas</h1>
    <ul>
      <li v-for="card in cards" :key="card.id">{{ card.name }} - {{ card.supertype }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cards = ref([])

onMounted(async () => {
  const response = await axios.get('http://localhost:3000/cards')
  cards.value = response.data
})
</script>
