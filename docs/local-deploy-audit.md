# Auditoría local de preparación para Cloudflare Pages

Fecha: 12 de noviembre de 2026. Workspace: `C:\Kfest\Kfest`.

## Fuente y estado inicial

Se trabajó exclusivamente sobre la copia local. Al empezar, el árbol de Git estaba limpio, en la rama `andre`, commit `176071f` (`se agrego vista ig y tiktok, se modifico los utilkfest y se cambio direcciones y emails`). El remoto configurado es `origin`, `https://github.com/johan-vega/kfest_web.git`.

Según las referencias ya guardadas localmente, `andre` coincidía con `origin/andre`, estaba un commit por delante de `origin/main` y 37 por delante de la `main` local. La `main` local estaba 36 commits por detrás de `origin/main`. No se hizo fetch; estos datos no acreditan el estado actual de GitHub. Publicar directamente desde la `main` local podría utilizar una versión antigua.

Se encontraron Angular framework 22.1.6, CLI/build/SSR 22.1.8, TypeScript 6.0.3, Node 24.15.0 y npm 11.12.1. Angular tenía `outputMode: "server"`, entrada Express y ninguna hidratación compartida entre los arranques de navegador y servidor. La aplicación es una landing con anclas, sin rutas de cliente adicionales, API ni operaciones que necesiten un backend en producción.

Se inspeccionaron los componentes App e ImageViewer, los datos del catálogo y Barista Lab, pruebas, arranques, renderizado de servidor, configuración, scripts, recursos públicos y referencias a imágenes. El quiz retirado no se restauró. Los archivos vacíos heredados `div`, `p`, `small` y `strong`, y la configuración histórica `vercel.json`, se conservaron.

## Correcciones y configuración final

- Angular genera archivos estáticos en `dist/kfest-web/browser`, con una ruta prerenderizada y contenido HTML útil. Conserva las herramientas SSR para compilar, sin desplegar Express, Workers o Functions.
- La configuración compartida habilita hidratación y repetición de eventos. La restauración de tema y favoritos se pospone hasta después del render inicial para evitar diferencias entre servidor y navegador.
- Node queda fijado en `.node-version` a 24.15.0. Se documentan npm 11.12.1 y las variables públicas de build en `.env.example`; los archivos locales de entorno quedan ignorados.
- Se prepara SEO mediante un script de build: metadatos, canonical configurable, imagen social existente, JSON-LD, robots y sitemap de una sola URL real. Los previews reciben noindex y nunca se convierten automáticamente en la canonical de producción.
- Se añade una página 404 estática y headers mínimos compatibles con fuentes y embeds. No se aplica una CSP restrictiva ni redirección global de SPA.
- Se añaden carga diferida bajo el primer pliegue, prioridad para el hero y dimensiones intrínsecas en las imágenes del HTML publicado, sin recomprimir ni sustituir imágenes. Los presupuestos Angular se conservan.
- Se añade `noopener noreferrer` al enlace del PDF y se corrige la jerarquía de un encabezado del álbum sin cambiar su clase visual.

La instalación inicial detectó 19 vulnerabilidades (8 moderadas, 8 altas y 3 críticas). Las correcciones compatibles dentro de los rangos iniciales no eliminaban todas. Se actualizó Angular dentro de la misma versión mayor: framework/compiler-cli **22.2.6**, CLI/build/SSR **22.2.7**; TypeScript sigue en **6.0.3** y Vitest en **4.1.12**. No se usaron `--force` ni `--legacy-peer-deps`. Para resolver el lockfile sin el árbol anterior se utilizó una carpeta aislada dentro de la caché ignorada; después se verificó la instalación real con `npm ci` desde el lockfile final.

En Windows, el servidor de desarrollo que estaba activo bloqueaba el ejecutable de esbuild. Se detuvo únicamente ese servidor identificado y su proceso hijo para reinstalar dependencias. Después se restauró `npm start` en `http://localhost:4200`.

## Validaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| `npm ci --no-fund` con lockfile final | Correcto; 385 paquetes instalados, 386 auditados |
| `npm audit --json` final | 0 vulnerabilidades en todas las severidades |
| `npm test -- --watch=false` | 54 pruebas aprobadas en 3 archivos |
| `npm run test:seo` | 9 pruebas aprobadas |
| `npm run build` | Correcto; una ruta prerenderizada |
| Verificador estático integrado en build | Correcto: contenido, hidratación, metadatos, recursos, anclas, ALT, dimensiones, PDF, robots, headers y 404 |
| `npm run assets:audit` | 55 imágenes, 0 sin uso y 0 referencias inexistentes |
| Diferencias en imágenes y PDF | Ninguna en esta preparación |
| Revisión de credenciales | Sin coincidencias sospechosas en el escaneo de 29 archivos fuente/configuración seguidos por Git; no se añadieron secretos |

Las pruebas de SEO cubren URL desconocida, URL de producción, derivación segura desde las variables de Cloudflare, previews con canonical estable/noindex, XML, tokens de Google, JSON-LD e idempotencia. Sus dominios y tokens de prueba son fixtures aislados en memoria, nunca configuración publicada.

Tras unificar los contactos, el bundle inicial es de **570,91 kB** (JS 475,70 kB y CSS 95,21 kB). Angular estima una transferencia de **131,66 kB**. El verificador cuenta **67 archivos públicos**, 570.909 bytes de JS/CSS y estima 155.962 bytes gzip / 131.303 bytes Brotli sobre su concatenación. Son estimaciones locales, no mediciones del transporte del CDN. El archivo mayor es la carta PDF de **7.959.355 bytes**, por debajo de 25 MiB. No se aumentaron presupuestos para ocultar advertencias.

En la vista previa estática se comprobaron HTTP 200 para portada, robots, PDF y favicon; una ruta inexistente devuelve 404. Sin dominio configurado, `/sitemap.xml` devuelve 404 intencionalmente. Se verificaron MIME de PDF/PNG y el header `nosniff`.

En navegador se verificaron contenido prerenderizado, recarga, restauración del tema guardado, idioma y atributo HTML `lang`, navegación por anclas, Barista Lab (V60 y espresso), carta/modal con siguiente página, zoom a 125 %, cierre con Escape y modal del jabón. A 375 × 900, el documento no desbordaba horizontalmente (ancho de contenido observado: 366 px). Los iframes mostraron los perfiles reales de Instagram y TikTok. No se observaron errores de hidratación Angular `NG05xx`. Instagram registró un error no fatal de su propio script externo (`route config was null`); su perfil seguía visible. Se conserva el enlace alternativo de cada proveedor.

## Estado SEO y pendientes reales

No se ha proporcionado un dominio definitivo ni un token de Search Console. Por eso el build local final omite canonical, URLs sociales absolutas y sitemap; no publica localhost, dominios ficticios ni tokens falsos. Producción generará esos recursos con `SITE_URL` real o, en el primer build de la rama de producción identificada, con el dominio estable derivado de Pages.

Actualización tras la confirmación del propietario: los datos correctos son los del footer. Se unificaron el horario del bloque de contacto a lunes a sábado de 7:30 am a 8 pm y el correo a `fundostateresitaperu@gmail.com`. Los teléfonos ya coincidían: 918 422 677 / 987 483 134. La dirección confirmada es Jr. Pancho Fierro 3547, Los Olivos, Lima, Perú; también se conserva completa en inglés. Se incorporaron correo, dirección y horario confirmados al JSON-LD y se actualizaron sus validaciones. Los tres enlaces legales del footer todavía usan `href="#"`; no llevan a documentos reales. Deben completarse con sus destinos correctos cuando estén disponibles.

La corrección de contactos pasó las 9 pruebas de SEO y el build estático con su verificador. El correo largo permite saltos de línea para evitar desbordamientos. El primer intento de build no pudo resolver Google Fonts en el entorno restringido; la repetición con acceso de red completó correctamente. Las 54 pruebas Angular de la tabla corresponden a la preparación anterior; no se repitieron para esta corrección de textos.

Siguen pendientes las acciones del propietario: autorizar commit/push/PR, conectar GitHub con Pages, confirmar rama y variables, desplegar, comprobar HTTPS/headers/compresión en el dominio publicado, verificar Search Console y enviar el sitemap. La sintaxis JSON-LD no garantiza resultados enriquecidos. No se ejecutó Lighthouse ni se afirmó una puntuación. No se verificaron todos los destinos externos ni se enviaron mensajes o formularios reales.

## Cambios pendientes en Git

Once archivos seguidos modificados:

`.gitignore`, `angular.json`, `package.json`, `package-lock.json`, `src/app/app.css`, `src/app/app.html`, `src/app/app.spec.ts`, `src/app/app.ts`, `src/index.html`, `src/main.server.ts`, `src/main.ts`.

Dieciséis archivos nuevos sin seguimiento:

`.env.example`, `.node-version`, `DEPLOY_CLOUDFLARE.md`, `SEO_CHECKLIST.md`, `docs/local-deploy-audit.md`, `public/404.html`, `public/_headers`, `public/robots.txt`, `scripts/build.mjs`, `scripts/image-metadata.mjs`, `scripts/seo-config.mjs`, `scripts/seo-config.test.mjs`, `scripts/serve-static.mjs`, `scripts/verify-static-build.mjs`, `src/app/app.config.server.ts`, `src/app/app.config.ts`.

No se ejecutaron commits, staging, push, merge, rebase, reset, clean, pull ni cambios de rama. No se modificó el remoto. La guía [DEPLOY_CLOUDFLARE.md](../DEPLOY_CLOUDFLARE.md) propone una rama `codex/publish-cloudflare` creada desde `andre` y un PR revisado; todos los comandos de publicación quedan para decisión del propietario. La [SEO_CHECKLIST.md](../SEO_CHECKLIST.md) separa las comprobaciones locales de las posteriores al despliegue.
