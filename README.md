# PruebaTecnica-Konverza
Proyecto de la prueba técnica para Konverza, consta de un backend hecho con laravel a la cual le llegaran todas las solicitudes del frontend por medio de HTTP, la API solo se encarga de hacer las operaciones básicas (CRUD) con la base de datos. También posee un frontend hecho con angular, donde se visualizarán todos los datos.

El proyecto posee autenticación JWT en su backend, para garantizar la encriptación de los datos, también el frontend posee guards de Angular para impedir el paso de rutas a usuarios que no se han registrado previamente.

La base de datos de MySQL cuenta con las migraciones hechas en laravel, existen 3 tablas principales: User, Producto e Inventario. Un usuario crea un producto y este a su vez cada que se realiza una modificación se guarda en el inventario.

La estrucura en el backend por hablar de los archivos más importantes, es :

Carpeta App: Se encontrarán dentro los controladores y los modelos.
Carpeta config: Dentro se encuentran archivos como auth y jwt, estos son importantes pues se crean de forma automática cuando se importa la autenticación JWT al proyecto.
Carpeta database: Aquí se guardan las migraciones que al ejecutar el migrate crean las tablas en la base de datos.
Carpeta routes: Aquí está el archivo api, que guarda todas las rutas que existen en el backend, dichas rutas cuentan con protección JWT para garantizar que se accederán previamente con autenticación.
Archivo .env: Cuenta con algunas configuraciones globales, por ejemplo los datos necesarios para acceder a la base de datos, también acá se guarda el token de autenticación que genera JWT a la hora de instalarse, dicho token es la otra llave que se necesita para validar los datos.

La estructura del frontend, mencionando lo más importante:

Carpeta public: Almacena algunas de las imágenes que se pueden ver en el frontend.
Carpeta Src: Es donde se almacena casi que todo en Angular, se desgloza:
Carpeta Components: Aquí se guardaron todos los componentes que se muestran, dicho de otra forma, acá van las vistas y los archivos que le dan funcionalidad para colocar los datos extraídos del backend sobre las vistas, los estilos para agregar un poco más de visualidad y realizar alguna tarea en específico dentro del componente.
Carpeta Guards: Aquí se encuentra el único archivo que verifica la validez del token, permitiendo que se bloquee el acceso a las demás vistas.
Carpeta Interfaces: Solamente van dos pequeños archivos que funcionaron para crear una estructura de un tipo de dato, dichas interfaces se usaron para mostrar los datos en las tablas existentes.
Carpeta Services: Los services contienen todas las peticiones HTTP a la API, se encargaron de mandar el token y los datos a las peticiones, se crearon 2, uno para cualquier tipo de datos que se mandara a pedir y el otro para pedir el token y cerrar la sesión.
Archivo App.component.ts: Como angular trabaja en una sola página, todas las vistas se mandan a colocar acá, dentro tiene la etiqueta router-oulet que permite hacer el cambio.
Archivo app.routes.ts: Este es el archivo que permite visualizar las diferentes rutas a través de la página web, no confundir con las peticiones HTTP que hacen los Services, pues estas solo sirven para cambiar las vistas de la página.

Por último está la base de datos, realmente solo son tablas con relaciones, toda la magia está en el backend y el frontend.

Muchas gracias si llegaste hasta acá leyendo!
