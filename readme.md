Para iniciar la aplicación se debe correr el comando meteor npm install y posterior a esto npm start
Para poder iniciar la DB se debe tener instalado previamente mysql. Se debe iniciar y correr los siguientes comandos
1. sudo mysql_secure_installation utility y agregar la contraseña "1007223499"
2. Activar corta fuegos
3. activar mysql desde el cortafuegos
4. Si se esta en linux, se debe correr el comando sudo /usr/bin/mysql -u root -p
5. Crear la database "prueba"
6. Permitir el uso de conexiones externas a través del comando ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1007223499';
7. codificar y sacar 5. 