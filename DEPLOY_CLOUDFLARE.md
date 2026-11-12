# Publicar Kfest en Cloudflare Pages

Esta guía parte de la versión local actual. No descarga archivos del repositorio remoto, no restaura el quiz retirado y no requiere Workers, Functions ni un servidor Node en producción. Ningún comando de publicación se ejecutó automáticamente.

## Configuración preparada

| Ajuste | Valor |
| --- | --- |
| Node | `24.15.0`, fijado en `.node-version` |
| npm | `11.12.1`, indicado en `packageManager` |
| Framework | Angular 22, TypeScript 6 |
| Modo Angular | `outputMode: "static"` |
| Renderizado | HTML prerenderizado + hidratación y repetición de eventos en el navegador |
| Ruta pública indexable | `/`; las secciones `#carta`, `#calculadora`, etc. son anclas |
| Comando de build | `npm run build` |
| Directorio de publicación | `dist/kfest-web/browser` |
| Rama de producción propuesta | `andre`, la rama local más reciente al comenzar esta preparación |
| Servicios adicionales | Ninguno |

Angular conserva `src/main.server.ts`, `@angular/platform-server` y `@angular/ssr` para generar el HTML durante el build. Express y su archivo heredado `src/server.ts` no son una dependencia de ejecución de Pages. El script anterior `serve:ssr:kfest-web` se sustituye por una vista estática local. `vercel.json` se conserva como configuración histórica de otra plataforma; Cloudflare no lo utiliza.

La compatibilidad de Node se comprobó con las [versiones admitidas por Angular](https://angular.dev/reference/versions). La selección mediante `.node-version` y `NODE_VERSION` está documentada en la [imagen de build de Pages](https://developers.cloudflare.com/pages/configuration/build-image/).

## Trabajar localmente

Desde la raíz del proyecto, con Node 24.15.0 y npm 11.12.1:

```powershell
npm ci
npm start
```

`npm start` ejecuta Angular en modo desarrollo. Detén un `ng serve` activo antes de reinstalar dependencias en Windows: puede bloquear `node_modules/@esbuild/win32-x64/esbuild.exe`. Esto no requiere eliminar ni reemplazar los archivos fuente.

Para obtener la versión que se publicará:

```powershell
npm run build
npm run preview
```

La vista previa estática se abre en `http://127.0.0.1:4301`. Solo sirve archivos locales y responde 404 a rutas inexistentes. No es un backend para producción. Para detenerla, utiliza Ctrl+C. El servidor de vista previa desactiva la caché local para evitar mostrar builds antiguos.

Comprobaciones disponibles:

```powershell
npm test -- --watch=false
npm run test:seo
npm run assets:audit
npm run check:build
npm audit
```

En el entorno restringido de Windows usado para esta preparación, Vitest necesita una carpeta temporal dentro del workspace:

```powershell
$env:TEMP = Join-Path (Get-Location).Path '.angular\cache\test-tmp'
$env:TMP = $env:TEMP
New-Item -ItemType Directory -Path $env:TEMP -Force | Out-Null
npm test -- --watch=false
```

El build de producción descarga la hoja de fuentes de Google utilizada por el diseño. No desactives TLS ni cambies el diseño si falla la red: comprueba conectividad a Google Fonts y repite el build.

## URL pública y variables de entorno

Puedes copiar `.env.example` a `.env.local` para pruebas locales. `.env.local` está excluido de Git y `npm run build` lo carga mediante Node. Las variables ya definidas en el entorno tienen prioridad. No copies este archivo a `public/`.

| Variable | Uso |
| --- | --- |
| `SITE_URL` | Origen HTTPS real de producción, con o sin `/` final, sin rutas, consultas o fragmentos. Vacío mientras no exista. |
| `PRODUCTION_BRANCH` | Obligatoria en Cloudflare, en producción y previews. Debe coincidir exactamente con la rama de producción elegida en Pages, inicialmente `andre`. |
| `GOOGLE_SITE_VERIFICATION` | Opcional. Solo el valor exacto de `content` entregado por Google. Normalmente se configura únicamente en producción. |
| `NODE_VERSION` | Configura `24.15.0` en Pages para reforzar la versión fijada en el archivo. |

No es necesario un token de Cloudflare, una API key ni un secreto en el frontend para conectar Pages mediante GitHub. El token de verificación de Google es público por diseño; no es una credencial privada.

No definas manualmente `CF_PAGES`, `CF_PAGES_BRANCH` ni `CF_PAGES_URL`: Cloudflare proporciona estos valores.

Comportamiento del build:

1. Con `SITE_URL` válida, genera canonical, URLs sociales absolutas y JSON-LD con esa URL estable.
2. En un primer build de producción de Pages, sin `SITE_URL`, puede obtener el dominio estable del proyecto desde `CF_PAGES_URL`, después de confirmar que `CF_PAGES_BRANCH` coincide con `PRODUCTION_BRANCH`. Si Cloudflare proporciona una URL con prefijo de deployment, lo elimina para utilizar el dominio estable del proyecto.
3. En previews nunca deriva la canonical de `CF_PAGES_URL`. Si conocen `SITE_URL`, apuntan a la producción; si no, omiten las etiquetas que dependen de ella.
4. Solo los previews añaden `noindex, follow` y `X-Robots-Tag: noindex`. Producción queda indexable.
5. Sin URL conocida en un build local, no se fabrican canonical, sitemap ni imagen social absoluta. `robots.txt` permite rastrear, pero no anuncia un sitemap inexistente.
6. Una URL local, de ejemplo, con ruta o un hostname temporal de Pages configurado como `SITE_URL` provoca un error de build para evitar publicarlo por accidente.

Una vez que el primer despliegue muestre su dominio real, es recomendable establecerlo explícitamente como `SITE_URL` tanto en producción como en previews. Al usar dominio propio, cambia esta misma variable y recompila.

## Publicar la versión local en GitHub de forma segura

Al comenzar: rama `andre`, commit `176071f`, remoto `origin` apuntando a `https://github.com/johan-vega/kfest_web.git`. El árbol estaba limpio. Según las referencias locales existentes, `andre` estaba un commit por delante de `origin/main` y al día con `origin/andre`; `main` local estaba 37 commits por detrás de `andre`. No se realizó `fetch`, por lo que estas referencias no garantizan el estado remoto actual.

No cambies a la `main` local para preparar esta publicación: contiene una versión anterior. Primero revisa todos los cambios y guarda una copia del workspace si deseas una copia adicional de seguridad. Un parche de `git diff` por sí solo no conserva archivos sin seguimiento.

Los siguientes comandos son un procedimiento manual para cuando el propietario autorice publicar; no se han ejecutado:

```powershell
git status --short
git diff --check
git diff
git switch -c codex/publish-cloudflare
```

Crear esa rama desde la revisión actual conserva los archivos y el historial existentes. Después de revisar los archivos nuevos y modificados:

```powershell
git add -- .gitignore .node-version .env.example angular.json package.json package-lock.json src/main.ts src/main.server.ts src/index.html src/app/app.config.ts src/app/app.config.server.ts src/app/app.ts src/app/app.html src/app/app.css src/app/app.spec.ts public/404.html public/_headers public/robots.txt scripts/build.mjs scripts/seo-config.mjs scripts/seo-config.test.mjs scripts/image-metadata.mjs scripts/verify-static-build.mjs scripts/serve-static.mjs DEPLOY_CLOUDFLARE.md SEO_CHECKLIST.md docs/local-deploy-audit.md
git diff --cached --check
git diff --cached --stat
git diff --cached
```

Solo cuando el usuario decida confirmar y subir:

```powershell
git commit -m "Prepare static Cloudflare Pages deployment and SEO"
git push -u origin codex/publish-cloudflare
```

Abre un Pull Request hacia `andre`, revisa el diff y aprueba el merge manualmente. Así Pages puede publicar esa rama manteniendo la versión más reciente. Si se prefiere `main` como producción, primero integra la versión actual mediante un PR revisado en GitHub; después cambia **tanto** la rama de producción de Pages **como** `PRODUCTION_BRANCH` a `main`. Si aparecen conflictos o nuevos cambios remotos, resuélvelos de forma explícita, conservando las funcionalidades actuales. No hace falta sustituir `main` por la fuerza.

## Crear Cloudflare Pages mediante integración GitHub

1. Accede a Cloudflare y busca **Workers & Pages → Create application → Pages → Connect to Git**. Los nombres de la interfaz pueden variar; el destino es **Pages con integración Git**, no un Worker.
2. Autoriza la aplicación de Cloudflare para el repositorio de Kfest. El propietario elige qué repositorios compartir.
3. Selecciona `johan-vega/kfest_web` y la rama que ya contenga estos cambios revisados.
4. Usa la configuración exacta siguiente:

| Campo de Pages | Valor |
| --- | --- |
| Production branch | `andre`, si se sigue la propuesta anterior |
| Framework preset | `None` para respetar el comando y directorio explícitos |
| Root directory | Raíz del repositorio, sin subcarpeta |
| Build command | `npm run build` |
| Build output directory | `dist/kfest-web/browser` |
| Node | `24.15.0` |
| Variables en Production y Preview | `PRODUCTION_BRANCH=andre`; `SITE_URL` real cuando se conozca |

No establezcas `NODE_ENV=production` para omitir dependencias de desarrollo durante la instalación: Angular necesita sus herramientas de build. El lockfile y `npm ci` mantienen versiones reproducibles. No es necesario instalar Wrangler ni generar un workflow de GitHub Actions para esta integración.

5. Revisa que los despliegues automáticos estén habilitados para la rama de producción y, si se desean, para los PR/previews.
6. Pulsa **Save and Deploy** cuando el propietario quiera publicar. Comprueba los logs: debe aparecer una ruta prerenderizada y la verificación estática correcta, con el dominio canónico esperado y sin `noindex` en producción.
7. Anota la URL real que asigna Pages. Actualiza `SITE_URL` explícitamente y reconstruye si hace falta.

La integración Git de Pages recompila los cambios publicados en la rama seleccionada. Consulta la [guía oficial de Angular en Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/) y la [configuración de builds](https://developers.cloudflare.com/pages/configuration/build-configuration/). Este proyecto usa su directorio verificado, no el directorio de ejemplo de esa guía.

El plan Free tiene límites de builds y archivos: comprueba los [límites vigentes](https://developers.cloudflare.com/pages/platform/limits/). Los recursos actuales caben dentro del máximo de 25 MiB por archivo; no se requiere almacenamiento externo.

## Dominio propio

En el proyecto Pages abre **Custom domains**, añade el dominio que realmente posees y sigue la configuración DNS indicada por Cloudflare. Espera a que HTTPS esté activo. No apuntes un DNS aislado sin asociar antes el dominio al proyecto.

Después:

1. Define `SITE_URL` con el origen HTTPS elegido en los entornos de producción y preview.
2. Ejecuta un nuevo despliegue y verifica canonical, `og:url`, JSON-LD, robots y sitemap.
3. Configura manualmente una redirección 301 desde los hostnames alternativos que controles hacia el dominio principal, si corresponde. No se incluye una redirección con un dominio todavía desconocido.
4. Añade la nueva propiedad a Search Console. Conserva las verificaciones anteriores mientras se completa la transición.

## Google Search Console

No hay tokens ni archivos de verificación inventados en el proyecto. El registro y la solicitud de indexación siguen siendo acciones del propietario en Google.

**Propiedad de prefijo URL:** para la primera web `*.pages.dev`, utiliza la URL HTTPS exacta del proyecto. Solo cubre ese prefijo. Puedes verificar mediante archivo HTML o meta tag.

**Propiedad de dominio:** para un dominio propio con DNS bajo tu control, cubre protocolos y subdominios. Se verifica mediante el registro DNS suministrado por Google. No puedes verificar la propiedad de todo `pages.dev`, que pertenece a Cloudflare.

Opción A, archivo:

1. Descarga el archivo HTML exacto de Google.
2. Colócalo en `public/` sin cambiar el nombre ni el contenido.
3. Recompila y despliega.
4. Abre la ruta indicada por Google en el dominio real y confirma que responde 200 con su contenido original. El verificador del build compara esos archivos byte por byte.
5. Pulsa **Verificar** en Google y conserva el archivo.

Opción B, meta tag:

1. Copia exclusivamente el valor de `content` de la etiqueta que Google proporciona.
2. Guárdalo como `GOOGLE_SITE_VERIFICATION` en el entorno de producción de Pages.
3. Recompila y despliega. La etiqueta estará en el `head` del HTML inicial.
4. Verifica en Google. Si prefieres introducir manualmente la etiqueta en `src/index.html`, deja la variable vacía para evitar duplicados.

Tras verificar la propiedad:

1. En **Sitemaps**, envía `sitemap.xml` cuando el dominio real esté configurado y el archivo responda 200.
2. En **Inspección de URLs**, inspecciona la URL canónica principal y prueba la URL publicada.
3. Solicita indexación cuando Google permita hacerlo.
4. Revisa **Indexación → Páginas** y los errores de rastreo, canonical o recursos. Comprueba las métricas móviles y las validaciones de datos estructurados.

La verificación no garantiza indexación ni una fecha de aparición. Sigue las instrucciones oficiales para [verificar propiedad](https://support.google.com/webmasters/answer/9008080) y [elegir el tipo de propiedad](https://support.google.com/webmasters/answer/34592).

## Diagnóstico después del despliegue

- `/`: HTTP 200, contenido prerenderizado, una canonical real si ya se conoce la URL y ausencia de `noindex` en producción.
- `/robots.txt`: HTTP 200, `Allow: /`, URL real del sitemap cuando se haya generado.
- `/sitemap.xml`: HTTP 200 y XML con una sola URL real; si no se conoce el dominio en un build local, el archivo se omite intencionadamente.
- `/carta_kfest.pdf`: PDF original accesible. Sus siete imágenes siguen en `/images/carta/`.
- `/images/logo_marron.png`: favicon accesible.
- Ruta inexistente: HTTP 404; no debe devolver la portada con estado 200. `public/404.html` desactiva el fallback SPA automático de Pages, apropiado para esta landing sin rutas de cliente adicionales.
- Archivo de Google, si existe: HTTP 200 y contenido intacto.
- En un preview: confirma el encabezado `X-Robots-Tag: noindex` y que no anuncie un sitemap del preview.

Prueba también la carta con zoom, modales Útilkfest, Barista Lab, cambio de idioma, tema guardado, anclas, refresco y WhatsApp. Instagram/TikTok y las fuentes siguen siendo recursos externos; sus enlaces alternativos se conservan. Cloudflare aplica la compresión de transporte; compruébala en la respuesta publicada, no solo con las estimaciones locales.

Si falla el despliegue, guarda el commit desplegado, rama, versión de Node, variables sin valores sensibles, comando, directorio de salida y primeras líneas del error. No compartas `.env.local`, credenciales ni tokens privados. Reproduce primero con `npm ci` y `npm run build` sobre esa misma revisión.

Los headers añadidos son mínimos y compatibles con los embeds: `nosniff`, política de referencia y caché larga solo para JS/CSS con hash. No se impone una CSP que bloquee TikTok, Instagram, fuentes o scripts de hidratación. Véase [headers de Pages](https://developers.cloudflare.com/pages/configuration/headers/) y [comportamiento de páginas y 404](https://developers.cloudflare.com/pages/configuration/serving-pages/).
