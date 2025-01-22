# PruebaTecnica-Konverza
Proyecto de la prueba técnica para Konverza, consta de un backend hecho con laravel a la cual le llegaran todas las solicitudes del frontend por medio de HTTP, la API solo se encarga de hacer las operaciones básicas (CRUD) con la base de datos. También posee un frontend hecho con angular, donde se visualizarán todos los datos.

El proyecto posee autenticación JWT en su backend, para garantizar la encriptación de los datos, también el frontend posee guards de Angular para impedir el paso de rutas a usuarios que no se han registrado previamente.

La base de datos de MySQL cuenta con las migraciones hechas en laravel, existen 3 tablas principales: User, Producto e Inventario. Un usuario crea un producto y este a su vez cada que se realiza una modificación se guarda en el inventario.
