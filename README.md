# Manual de Uso - Proyecto Pokémon TCG

Este proyecto contiene un backend desarrollado con NestJS y un frontend creado con Vue 3. Ambos están dockerizados y se levantan en conjunto usando `docker-compose`.

## Requisitos
- Docker
- Docker Compose

## Estructura de Carpetas

```
pokemon-tcg/
├── pokemon-tcg-backend/     # Backend NestJS
├── pokemon-tcg-frontend/    # Frontend Vue 3
└── docker-compose.yml       # Configuración conjunta
```

## Primeros pasos

1. Clonar el repositorio:
    ```bash
    git clone <REPO_URL>
    cd pokemon-tcg
    ```

2. Crear un archivo `.env` para el backend dentro de `pokemon-tcg-backend`:
    ```env
    DATABASE_URL=postgres://postgres:123456@database:5432/postgres
    CORS_ORIGIN=http://localhost:5173
    ```

3. Levantar todo el entorno con docker-compose:
    ```bash
    docker-compose up --build
    ```

4. Acceder a las aplicaciones:
    - **Backend (API)**: [http://localhost:3000](http://localhost:3000)
    - **Frontend (Interfaz Web)**: [http://localhost:5173](http://localhost:5173)

5. (Opcional) Aplicar migraciones de base de datos:
    ```bash
    docker-compose exec backend npx prisma migrate dev
    ```

---

## Comandos útilez

| Acción | Comando |
|---|---|
| Levantar todo | `docker-compose up` |
| Levantar desde cero (recompilar) | `docker-compose up --build` |
| Detener todo | `docker-compose down` |
| Ver logs | `docker-compose logs -f` |
| Ingresar al backend | `docker-compose exec backend sh` |
| Ingresar a la base de datos | `docker-compose exec database psql -U ash tcg` |

---

## Notas Importantes
- El frontend está disponible en el puerto `5173`.
- El backend expone la API REST en el puerto `3000`.
- La base de datos es PostgreSQL 15 y guarda los datos en un volumen llamado `postgres_data`.
- El proyecto fue creado pensando en que el frontend y el backend puedan interactuar sin problemas mediante Docker networking.

---

## Ejemplo de Endpoints Disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | /sets | Lista todos los sets disponibles |
| GET | /sets/:id | Muestra el detalle de un set |
| GET | /sets/:id/cards | Muestra las cartas de un set |
| GET | /cards/:id | Muestra el detalle de una carta |

---
