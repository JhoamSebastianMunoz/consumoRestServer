<div align="center">

# consumoRestServer

*Servidor de práctica para consumir APIs REST con Express y TypeScript*

[![Node.js](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

[Descripción](#descripción) • [Inicio rápido](#inicio-rápido) • [Configuración](#configuración) • [API](#api) • [Recursos](#recursos)

</div>

## Descripción

Proyecto académico (ADSO 2023) que implementa un servidor HTTP con [Express](https://expressjs.com) y [TypeScript](https://www.typescriptlang.org), diseñado para practicar el consumo de APIs REST desde cualquier cliente (Postman, curl, Thunder Client, etc.).

Cada endpoint demuestra una forma distinta de recibir parámetros: **ruta**, **consulta (query)**, **cuerpo JSON** y **cabeceras**, combinados con los métodos HTTP `GET`, `POST`, `PUT` y `DELETE`.

> [!NOTE]
> El servidor no persiste datos: cada ruta únicamente refleja los parámetros recibidos en la respuesta JSON, para verificar que el cliente los envía correctamente.

## Inicio rápido

**Requisitos:** [Node.js](https://nodejs.org) 18 o superior y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/JhoamSebastianMunoz/consumoRestServer.git
cd consumoRestServer

# 2. Instalar dependencias
npm install

# 3. Compilar TypeScript y arrancar el servidor
npx tsc
node dist/app.js
```

El servidor quedará escuchando en `http://localhost:10101`.

> [!TIP]
> Durante el desarrollo puedes compilar en modo *watch* con `npx tsc --watch` para que los cambios en `app.ts` se recompilen automáticamente.

## Configuración

El puerto se controla mediante la variable de entorno `PORT`, cargada con [dotenv](https://github.com/motdotla/dotenv) desde un archivo `.env` (ya incluido en `.gitignore`):

```bash
# .env
PORT=10101
```

Si `PORT` no está definida, el servidor usa el puerto `10101` por defecto.

## Estructura del proyecto

```
consumoRestServer/
├── app.ts          # Servidor Express y todas las rutas
├── dist/           # JavaScript compilado (salida de tsc)
├── tsconfig.json   # Configuración de TypeScript
└── package.json
```

## API

Todas las respuestas son JSON. Ejemplos usando `curl` contra `http://localhost:10101`:

| Método | Ruta | Parámetros |
|--------|------|------------|
| `POST` | `/parametros-ruta/:domicilio` | Ruta: `domicilio` · Query: `cc`, `nombres`, `apellidos` |
| `POST` | `/parametros-ruta/:id/:peso` | Ruta: `id`, `peso` · Body: `ancho`, `alto` |
| `DELETE` | `/delete-parametros-consulta` | Query: `cc` · Body: `motivo` · Header: `Authorization` |
| `PUT` | `/put-parametro-consulta-body-cabecera` | Query: `cc` · Body: `apellidos` · Header: `Authorization` |
| `GET` | `/get-parametros-consulta-ruta-cabecera/:cantidad/:marca` | Ruta: `cantidad`, `marca` · Query: `precio` · Header: `Authorization` |

### Registro de persona — `POST /parametros-ruta/:domicilio`

```bash
curl -X POST "http://localhost:10101/parametros-ruta/calle-123?cc=1234567890&nombres=Juan&apellidos=Perez"
```

```json
{
  "status": "ok params",
  "cc": "1234567890",
  "nombres": "Juan",
  "apellidos": "Perez"
}
```

### Registro de artículo — `POST /parametros-ruta/:id/:peso`

```bash
curl -X POST "http://localhost:10101/parametros-ruta/A1/2.5" \
  -H "Content-Type: application/json" \
  -d '{"ancho": 10, "alto": 20}'
```

```json
{
  "status": "ok params",
  "id": "A1",
  "peso": "2.5",
  "ancho": 10,
  "alto": 20
}
```

### Borrado de usuario — `DELETE /delete-parametros-consulta`

```bash
curl -X DELETE "http://localhost:10101/delete-parametros-consulta?cc=1234567890" \
  -H "Content-Type: application/json" \
  -H "Authorization: token-abc123" \
  -d '{"motivo": "cambio de datos"}'
```

```json
{
  "status": "ok delete",
  "id": "token-abc123",
  "cc": "1234567890",
  "motivo": "cambio de datos"
}
```

### Actualización de usuario — `PUT /put-parametro-consulta-body-cabecera`

```bash
curl -X PUT "http://localhost:10101/put-parametro-consulta-body-cabecera?cc=1234567890" \
  -H "Content-Type: application/json" \
  -H "Authorization: calle-456" \
  -d '{"apellidos": "Garcia"}'
```

```json
{
  "status": "ok update",
  "domicilio": "calle-456",
  "cc": "1234567890",
  "apellidos": "Garcia"
}
```

### Consulta de producto — `GET /get-parametros-consulta-ruta-cabecera/:cantidad/:marca`

```bash
curl "http://localhost:10101/get-parametros-consulta-ruta-cabecera/5/Nike?precio=99.90" \
  -H "Authorization: calle-789"
```

```json
{
  "status": "ok get",
  "domicilio": "calle-789",
  "precio": "99.90",
  "cantidad": "5",
  "marca": "Nike"
}
```

> [!TIP]
> En las rutas `DELETE`, `PUT` y `GET`, el valor de la cabecera `Authorization` se interpreta como el campo `domicilio` del recurso, tal como lo indica el enunciado de la práctica.

## Recursos

- [Documentación de Express](https://expressjs.com/es/guide/routing.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [HTTP request methods (MDN)](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)
- [Consumo de APIs REST con fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
