# Anon Q&A | Damián Catanzaro

Anon Q&A es un proyecto hecho en Next.JS con Express.JS y MongoDB para hacer preguntas y respuestas de manera anónima.

**Demo:** https://anon.damiancatanzaro.com/
**Autor:** [@DamianCatanzaro](https://twitter.com/DamianCatanzaro)

## Requerimientos

-   NodeJS
-   MongoDB

## Instalación

```
git clone
```

## Instalación de paquetes de NPM

```
npm install
```

## Editar el archivo .env.development para desarrollo

```
DB_HOST=localhost
DB_PORT=27017
DB_USER=
DB_PASS=
DB_NAME=anonqya

TELEGRAM_BOTID=
TELEGRAM_CHATID=

PORT=3000

PASSWORD_EDITOR=nuestra_password
URL=http://localhost:3000
```

## Para producción: crear el archivo .env con su configuración

```
DB_HOST=localhost
DB_PORT=27017
DB_USER=
DB_PASS=
DB_NAME=anonqya

TELEGRAM_BOTID=
TELEGRAM_CHATID=

PORT=3000

PASSWORD_EDITOR=nuestra_password
URL=http://localhost:3000
```

## Para correr entorno de desarrollo

```
npm run dev
```

## Para correr entorno de producción

```
npm run build
npm run start
```

## Para responder preguntas

**Lo unico que hay que hacer es pasarle por query params lo siguiente**

```
?isAdmin=true&password=nuestra_password
```

**quedando nuestra url de la siguiente manera**

```
http://localhost:3000?isAdmin=true&password=nuestra_password
```
