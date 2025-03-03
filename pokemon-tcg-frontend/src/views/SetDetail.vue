<template>
  <div class="set-detail">
    <div class="set-header">
      <img v-if="set?.logoUrl" :src="set.logoUrl" :alt="set.name" class="set-logo" />
      <div class="set-info">
        <h1 class="title">{{ set?.name ?? 'Detalle de Set' }}</h1>
        <p class="series">Serie: {{ set?.series }}</p>
        <p class="release-date">Fecha de lanzamiento: {{ formatDate(set?.releaseDate) }}</p>
      </div>
      <img
        v-if="set?.symbolUrl"
        :src="set.symbolUrl"
        :alt="`${set.name} symbol`"
        class="set-symbol"
      />
    </div>

    <div v-if="cards.length" class="cards-grid">
      <div v-for="card in cards" :key="card.id" class="card-item">
        <router-link :to="`/cards/${card.id}`" class="card-link">
          <img :src="getCardImage(card)" :alt="card.name" class="card-image" />
          <div class="card-info">
            <h2>{{ card.name }}</h2>
            <p>Tipo: {{ card.types?.join(', ') ?? 'N/A' }}</p>
            <p>Número: {{ card.number }}</p>
            <p>Rareza: {{ card.rarity ?? 'Desconocida' }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <p v-else>Cargando cartas...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const setId = route.params.id as string

const set = ref<unknown>(null)
const cards = ref<unknown[]>([])

// Obtener detalle del set
const fetchSet = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/sets/${setId}`)
    set.value = data
  } catch (error) {
    console.error('Error al cargar el set:', error)
  }
}

// Obtener cartas del set
const fetchCards = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/sets/${setId}/cards`)
    cards.value = data
  } catch (error) {
    console.error('Error al cargar las cartas:', error)
  }
}

// Obtener URL de la primera imagen de la carta
const getCardImage = (card: unknown) => {
  return card.images?.[0]?.url ?? 'https://via.placeholder.com/150'
}

// Formatear fecha
const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Carga inicial
onMounted(() => {
  fetchSet()
  fetchCards()
})
</script>

<style scoped>
.set-detail {
  padding: 16px;
}

.set-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #ddd;
  /* background-color: #f8f8f8; */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.set-logo {
  width: 100px;
  height: auto;
}

.set-info {
  flex: 1;
}

.set-symbol {
  width: 50px;
  height: auto;
}

.title {
  font-size: 24px;
  margin: 0;
}

.series,
.release-date {
  font-size: 14px;
  color: #666;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.card-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  /* background-color: #fff; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.card-item:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  /* background-color: #f8f8f8; */
}

.card-info {
  padding: 8px;
}

.card-info h2 {
  font-size: 16px;
  margin: 4px 0;
}

.card-info p {
  font-size: 12px;
  margin: 2px 0;
  color: #fff;
}
</style>
