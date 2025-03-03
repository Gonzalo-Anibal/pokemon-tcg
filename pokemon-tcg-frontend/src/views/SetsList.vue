<template>
  <div class="sets-list">
    <h1 class="title">Expansiones Disponibles</h1>
    <div v-if="sets.length" class="expansions-container">
      <div
        v-for="set in sets"
        :key="set.id"
        class="row g-0 set-item set-as-link expansion-row align-items-center py-2"
        @click="goToSet(set.id)"
        data-url="/sets/{{set.id}}"
      >
        <!-- Icono (placeholder de momento, podrías hacer algo más dinámico) -->
        <div class="icon-container col-auto mx-3 text-center">
          <span
            class="expansion-symbol is-pokemon icon is-24x24 d-block m-auto"
            :aria-label="set.name"
          >
            <span
              class="expansion-icon"
              :style="{
                backgroundImage: `url(${set.symbolUrl})`,
                backgroundSize: 'cover',
              }"
            ></span>
          </span>
        </div>

        <!-- Logo (podrías agregar el logo si es necesario) -->
        <div class="col-auto d-none d-md-block me-3">
          <img v-if="set.logoUrl" :src="set.logoUrl" alt="Set Logo" class="set-logo" />
          <div v-else class="image icon placeholder is-64x64"></div>
        </div>

        <!-- Nombre -->
        <div class="col">
          <a href="#" @click.prevent>{{ set.name }}</a>
        </div>

        <!-- Total de cartas -->
        <div class="col-2 text-center d-none d-md-block">{{ set.total ?? 0 }} Cartas</div>

        <!-- Fecha de lanzamiento -->
        <div class="col-3 text-center d-none d-md-block">
          {{ formatDate(set.releaseDate) }}
        </div>
      </div>
    </div>
    <p v-else>Cargando sets...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Estado reactivo para los sets
const sets = ref([])

// Router para redireccionar al hacer click
const router = useRouter()

// Función para obtener los sets desde el backend
const fetchSets = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/sets')
    sets.value = data
  } catch (error) {
    console.error('Error al cargar los sets:', error)
  }
}

// Navegación al detalle de un set (puedes implementar la vista de detalle después)
const goToSet = (id: string) => {
  router.push(`/sets/${id}`)
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
  fetchSets()
})
</script>

<style scoped>
.expansions-container {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.expansion-row {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 8px 12px;
}

.expansion-row:hover {
  background-color: #f8f9fa;
}

.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expansion-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.set-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
a:hover {
  text-decoration: underline;
  .text-center {
    color: grey;
  }
}
.set-item:hover {
  color: black;
}
</style>
