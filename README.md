## API Testing con Cypress y Cucumber

### Descripción
Integración de Cypress, Typescript y Cucumber para API Testing. Se automatizaron los servicios de la API Publica **restful-booker** https://restful-booker.herokuapp.com/apidoc/index.html.

### Requisitos
- El unico requisito es contar con una versión de **NodeJS >= 16**

### Instalación
- Clonar el repositorio en tu equipo
```
git clone https://github.com/JBryan98/cypress11-restful-booker.git
```

- Una vez dentro del proyecto instalar las dependencias
```
npm install
```

### Ejecución

- Para ejecutar el proyecto es necesario el siguiente comando
```
npm run test
```

###  Dependencias utilizadas
1. ``@badeball/cypress-cucumber-preprocessor: ^18.0.1``
2. ``@bahmutov/cypress-esbuild-preprocessor: ^2.2.0``
3. ``cypress: ^12.16.0``
4. ``esbuild: ^0.18.11``
5. ``typescript: ^5.1.6``