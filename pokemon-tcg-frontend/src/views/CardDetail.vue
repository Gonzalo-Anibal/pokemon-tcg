<template>
  <div class="card-detail">
    <div class="card-container">
      <div class="card-image">
        <img v-if="mainImage" :src="mainImage.url" :alt="`${card.name}`" />
        <p v-else>No hay imagen disponible</p>
      </div>

      <div class="card-info">
        <h1>{{ card.name }}</h1>
        <p><strong>Supertype:</strong> {{ card.supertype }}</p>
        <p><strong>Types:</strong> {{ card.types?.join(', ') }}</p>
        <p><strong>Rarity:</strong> {{ card.rarity }}</p>
      </div>
    </div>

    <div class="markets">
      <h3>Mercados</h3>
      <ul>
        <li v-for="market in card.markets" :key="market.id">
          <a :href="market.url" target="_blank">{{ market.market }}</a>
          <span> (actualizado el {{ market.updatedAt }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const card = ref({})
const route = useRoute()

onMounted(async () => {
  const { id } = route.params
  const response = await axios.get(`http://localhost:3000/cards/${id}`)
  card.value = response.data
})

const mainImage = computed(() => {
  return card.value.images?.find((image) => image.type === 'set') || card.value.images?.[0] // O ajustamos esto si tienes un criterio mejor
})
</script>

<style scoped>
.card-detail {
  padding: 20px;
}

.back-btn {
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
}

.card-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.card-image img {
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.card-info {
  flex: 1;
}

h1 {
  margin: 0 0 10px;
}

.markets {
  margin-top: 20px;
}
</style>
