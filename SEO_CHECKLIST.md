# SEO de Kfest: comprobación antes y después de publicar

## Preparado en el proyecto

- [x] HTML inicial en español, un H1 principal y contenido visible prerenderizado.
- [x] Título `Kfest | Café de Especialidad Peruano`, descripción profesional y viewport.
- [x] Favicon con el logo existente.
- [x] Open Graph y Twitter Card sin etiquetas duplicadas.
- [x] Imagen social existente `images/New-Hero.jpg`; sus dimensiones se leen del archivo.
- [x] Generación de canonical y URLs absolutas mediante `SITE_URL`.
- [x] Obtención segura del dominio estable de Pages solo en el primer build de producción identificado.
- [x] Ninguna canonical local, de ejemplo ni de preview como configuración de producción.
- [x] Sitemap XML con una sola URL indexable `/`, sin anclas, rutas inventadas ni `lastmod` ficticio.
- [x] `robots.txt` permite rastrear recursos públicos y anuncia el sitemap solo cuando existe.
- [x] Producción indexable; previews con `noindex` en meta y header, sin sitemap propio.
- [x] JSON-LD `CafeOrCoffeeShop` parseable, con nombre, descripción, teléfono, correo, dirección, horario y redes públicas existentes. Los datos de contacto del footer fueron confirmados por el propietario. URL, logo, imagen y carta absolutos solo cuando se conoce el dominio.
- [x] Sin reseñas, puntuaciones ni coordenadas inventadas en JSON-LD.
- [x] Datos de contacto unificados con el footer: lunes a sábado de 7:30 am a 8 pm, `fundostateresitaperu@gmail.com`, teléfonos 918 422 677 / 987 483 134 y Jr. Pancho Fierro 3547, Los Olivos, Lima, Perú.
- [x] Español e inglés comparten URL: no se generan rutas `/en` o `/es` ni `hreflang` falsos. El atributo `lang` cambia al interactuar con el selector.
- [x] Imágenes bajo el primer pliegue con carga diferida; la imagen hero tiene prioridad alta. Se añaden dimensiones intrínsecas al HTML de producción sin recomprimir fotos.
- [x] Verificación automática de recursos locales, ALT, anclas, PDF, fuentes referenciadas por CSS, headers, HTML útil e hidratación.
- [x] Página 404 propia para rutas que no existen.
- [x] Verificación Search Console preparada mediante archivo HTML o token por variable, sin códigos falsos.

## Pendiente hasta conocer la URL real

- [ ] Crear el proyecto Pages y confirmar la rama de producción y su `PRODUCTION_BRANCH`.
- [ ] Confirmar el dominio gratuito asignado; revisar la canonical generada en ese primer build.
- [ ] Establecer `SITE_URL` explícitamente con el dominio elegido, tanto para producción como para previews.
- [ ] Si se añade dominio propio, configurar DNS/HTTPS y decidir las redirecciones de hostnames alternativos.
- [ ] Validar los datos estructurados sobre la URL publicada. La validez sintáctica de Schema.org no implica elegibilidad completa para resultados enriquecidos de Google.
- [ ] Completar los tres enlaces legales del footer, que actualmente apuntan a `#`, con sus documentos reales.
- [ ] Añadir el archivo o token exacto entregado por Google y verificar propiedad.
- [ ] Enviar `sitemap.xml`, inspeccionar la URL principal y solicitar indexación.

## URLs que comprobar sobre el dominio publicado

Sustituye el origen por el valor real de `SITE_URL`. No uses URLs de ejemplo como configuración del build.

| Recurso | Resultado esperado |
| --- | --- |
| `/` | 200, HTML útil, título/description, canonical correcta, sin noindex en producción |
| `/#carta`, `/#calculadora`, `/#utilkfest` | Desplazamiento al contenido; no son entradas independientes del sitemap |
| `/robots.txt` | 200, recursos permitidos, sitemap absoluto real |
| `/sitemap.xml` | 200, XML válido con la portada únicamente |
| `/carta_kfest.pdf` | 200, archivo PDF original |
| `/images/logo_marron.png` | 200, PNG real y favicon correcto |
| Archivo HTML proporcionado por Google | 200 y contenido sin alterar |
| Una ruta que no existe | 404, no una portada con 200 |
| Archivos JS/CSS indicados por el HTML | 200, MIME correcto y compresión en Cloudflare |

## Validación visual e indexación posterior

- [ ] Confirmar título, descripción, OG y canonical con el código fuente de la respuesta inicial.
- [ ] Probar el enlace compartido: imagen social y texto correctos. Los proveedores pueden conservar caché de tarjetas.
- [ ] Revisar JSON-LD con [Rich Results Test](https://search.google.com/test/rich-results) y [Schema Markup Validator](https://validator.schema.org/), completando únicamente datos reales.
- [ ] Comprobar en Search Console que la canonical elegida por Google coincida con la intención del sitio.
- [ ] Revisar Indexación → Páginas, Inspección de URLs y recursos que Google no pueda cargar.
- [ ] Probar el sitio sin JavaScript: la información principal, enlaces y carta deben seguir presentes.
- [ ] Probar navegador con JavaScript: hidratación sin errores `NG05xx`, Barista Lab, tema, idioma, modales y zoom.
- [ ] Revisar móvil, Core Web Vitals y compresión con el dominio real. No se ha inventado una puntuación Lighthouse.
- [ ] Confirmar `X-Robots-Tag: noindex` en previews y su ausencia en producción.

Los pasos de publicación, DNS y Search Console son manuales y no se realizaron desde este workspace. Sigue [DEPLOY_CLOUDFLARE.md](DEPLOY_CLOUDFLARE.md) para la configuración exacta.
