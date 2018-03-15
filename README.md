## Levantamiento del proyecto.

### Previo al levantamiento.

Antes del levantamiento del proyecto, asegurarse de tener instalado la aplicación Node JS (https://nodejs.org/en/). Además es necesario que se añada Node JS al Path, para poder ejecutar los comandos de instalación de paquetes.

Tener instaladas las herramientas Yeoman, Bower y Grunt, en caso de no tenerlos instalados con el siguiente comando:

	npm install --global yo bower grunt-cli

Para revisar la instalación de dichas aplicaciones utilizar el siguiente comando:

	yo --version && bower --version && grunt-cli --version


### Ejecución del levantamiento.

Moverse a la carpeta donde se tenga el proyecto.

Ejecutar el comando:

	npm install

Seguido del comando:

	bower install

IMPORTANTE: en caso de que se marque algún tipo de error relacionado con grunt, realizar la instalación local de dicha herramienta a través del comando:

	npm install grunt-cli

Para levantar el proyecto se utiliza la tarea:

	grunt live
