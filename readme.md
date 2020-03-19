Proyecto 2 de bases de datos 1, Integrantes:

- Juan Diego Marín Rodríguez
- Daniela Guardia Cuevo
- Manuel Alejandro Escobar Mira

1. Para poder iniciar el proyecto se debe tener previamente instalado MeteorJS. Consulte esta página web para descargar Meteor. --> https://www.meteor.com/install
2. Para iniciar la aplicación se debe correr el comando meteor npm install y posterior a esto npm start

Nota: El servidor MYSQL esta montado en https://remotemysql.com/ , cabe resaltar que para ejecutar la aplicación requiere conexión a internet y además no tener ninguna configuración de contafuegos que impida conectar.

La organización del proyecto es:

1. imports/ui/ <- Aqui estan todas las partes de interfaces graficas del proyecto, todas separadas por categoria (por url)

2. imports/api/metodos/ <- Aqui estan todos los métodos (todo el código mysql en javaScript)

3. La conexión en la base de datos esta en startup/dataBaseConnection

4. La creación de tablas y sus relaciones esta en startup/onStartApp
