# Express

## Crear un proyecto de Express

1. Crear un directorio para el proyecto
2. Inicializar el proyecto con npm
3. Instala Express

### Crear un directorio para el proyecto

```bash
mkdir myapp
cd myapp
```

### Inicializar el proyecto con npm

```bash
npm init
# o
npm init -y
```

### Instalar Express

```bash
npm install express
```

### Creamos un archivo de entrada `index.js`

```javascript
// Importamos la libreria express
import express from "express";

// const express = require('express')
// Creamos una instancia de express
const app = express();
// Definimos el puerto en el que se va a escuchar
const port = 3000;

// Definimos la ruta raiz
app.get("/", (req, res) => {
  // Enviamos el mensaje
  res.send("Hello World!");
});

// Iniciamos el servidor
app.listen(port, () => {
  // Mostramos el mensaje
  console.log(`El servidor esta corriendo en: http://localhost:${port}`);
});
```

### Agregar type module en el package.json

```json
{
    ...
    "type": "module",
    ...
}
```

### Ejecutar el servidor

```bash
node index.js
```

### Instalar nodemon para el hot reload en modo Desarrollo

```bash
npm install -D nodemon
```
