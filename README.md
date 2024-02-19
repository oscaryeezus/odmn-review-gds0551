# OdmnReviewGds0551

Este es un proyecto Angular para el sistema OdmnReviewGds0551.

## Descripción

Este proyecto utiliza Angular para construir la interfaz de usuario del sistema OdmnReviewGds0551. Además, se utiliza json-server para simular un servidor de backend utilizando un archivo `db.json`.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado Node.js y Angular CLI en tu máquina. Además, necesitarás tener `json-server` instalado globalmente o como una dependencia en tu proyecto.

```bash
# Instalar Angular CLI globalmente (si no lo tienes instalado)
npm install -g @angular/cli

# Instalar json-server globalmente (si no lo tienes instalado)
npm install -g json-server
```

## Configuración

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/oscaryeezus/odmn-review-gds0551.git
cd OdmnReviewGds0551
```

Instala las dependencias del proyecto:

```bash
npm install
```
## Uso

Para iniciar la aplicación Angular y levantar el servidor json-server, puedes ejecutar los siguientes comandos:

```bash
# Iniciar el servidor json-server (en una terminal separada)
json-server --watch db.json

# Iniciar la aplicación Angular
ng serve
```
Después de ejecutar estos comandos, puedes acceder a la aplicación en tu navegador visitando http://localhost:4200/.
