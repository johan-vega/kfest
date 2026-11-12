# KfestWeb

## Instagram y recursos gráficos

La sección de Instagram incrusta el perfil público oficial de
[@kfest.peru](https://www.instagram.com/kfest.peru/) mediante
`https://www.instagram.com/kfest.peru/embed/`, conservando la cabecera y el marco
de Kfest. Instagram entrega su contenido al cargar el marco: no se mantienen
publicaciones ni estadísticas copiadas en el proyecto. No requiere un token de
Meta. El diseño interior, la selección y la cantidad de publicaciones dependen de
Instagram; el perfil incrustado observado muestra seis publicaciones, no nueve.
La cuenta debe ser pública y permitir inserciones. Siempre queda disponible un
enlace para abrir el perfil si el navegador o Instagram impiden cargarlo.

El favicon reutiliza `public/images/logo_marron.png`, el logo oficial de Kfest.

Para comprobar imágenes sin uso y referencias rotas:

```bash
npm run assets:audit
```

La auditoría recorre los archivos fuente, considera referencias dentro de SVG y
preserva los directorios usados por rutas dinámicas, como `images/carta/`.
Verifica además que existan las siete páginas declaradas en `catalogPageList`.
El inventario de archivos retirados está en `docs/asset-cleanup.json`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
