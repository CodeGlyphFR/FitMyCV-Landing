---
title: "Cómo formatear un CV compatible con ATS: estructura, fuentes y modelo"
description: "Guía práctica para crear un CV en formato compatible con ATS: tipo de archivo, estructura de secciones, fuentes recomendadas y elementos a evitar."
date: "2026-02-28"
translationKey: "ats-format"
tags: ["ATS", "CV", "formato", "diseño", "modelo"]
---

## Por qué el formato es tan importante como el contenido

Tienes las competencias adecuadas, las experiencias correctas, las palabras clave justas — y aun así tu CV es rechazado. ¿El culpable? Su formato.

Antes de analizar el contenido de tu CV, un ATS debe primero **extraer su estructura**: identificar las secciones, analizar las fechas, aislar las competencias. Si este primer paso falla por un formato incompatible, el contenido — por relevante que sea — nunca se analiza.

Para entender en detalle cómo funciona este proceso de parsing, consulta [nuestra guía completa sobre CV ATS](/blog/cv-ats-guia-completa).

## El formato de archivo ideal

### Word (.docx) vs PDF: ¿cuál elegir?

| Criterio | .docx | PDF texto | PDF escaneado |
|----------|-------|-----------|--------------|
| **Compatibilidad ATS** | Excelente | Muy buena | Ninguna |
| **Preservación del diseño** | Variable según la versión de Word | Perfecta | N/A |
| **Universal** | Requiere Word/compatible | Cualquier dispositivo | N/A |
| **Recomendación** | Si la oferta lo pide | Opción por defecto | Evitar completamente |

**Nuestra recomendación:** El PDF texto es el mejor compromiso. Preserva tu diseño y es leído por el 95 % de los ATS del mercado. Si la oferta pide explícitamente un .docx, proporciónalo.

**El test del PDF texto:** Abre tu PDF → Ctrl+A (seleccionar todo) → Ctrl+C (copiar) → pega en el Bloc de notas. Si el texto aparece limpio y en el orden correcto, tu PDF es compatible.

### Codificación y nombre del archivo

- **Codificación:** Guarda siempre en UTF-8 para garantizar la correcta lectura de acentos y caracteres especiales.
- **Nombre del archivo:** Usa un formato claro y profesional: `Nombre_Apellido_CV.pdf`. Evita los espacios, los acentos en el nombre del archivo y los nombres genéricos como `CV_final_v3.pdf`.

## La estructura ideal de un CV compatible con ATS

### El orden de secciones recomendado

1. **Información de contacto** — Nombre, email, teléfono, ciudad, LinkedIn (en el cuerpo del documento, nunca en encabezado Word)
2. **Título del puesto objetivo** — Usa el título exacto de la oferta
3. **Resumen profesional** — 3-4 líneas sintetizando tu valor añadido con las palabras clave principales
4. **Competencias** — Lista agrupada por categoría
5. **Experiencia profesional** — Orden cronológico inverso
6. **Formación** — Títulos universitarios, másteres
7. **Certificaciones** — PMP, AWS, Google, TOEIC…
8. **Idiomas** — Con nivel (B2, C1, bilingüe)

### Qué debe incluir cada sección

**Experiencia profesional** — Para cada puesto:
```
Título del puesto | Nombre de la empresa | Ciudad
Mes/Año – Mes/Año (o Actualidad)

• Verbo de acción + misión + resultado cuantificado
• Dirigido la migración CRM a Salesforce para 500 usuarios (+30 % de productividad)
• Reducido el tiempo de procesamiento de pedidos en un 45 % mediante automatización RPA
```

**Competencias** — Agrupa por categoría para facilitar el parsing:
```
Técnicas: Python, SQL, Power BI, Tableau
Sector: Gestión de proyectos, análisis financiero, gestión del cambio
Herramientas: Salesforce, SAP, Jira, Confluence
```

La IA puede ayudarte a identificar las competencias más relevantes a destacar para cada oferta. Descubre cómo en [nuestro artículo sobre optimización ATS con IA](/blog/adaptar-cv-ats-ia).

## Las reglas tipográficas

### Fuentes recomendadas

| Fuente | Tipo | Compatibilidad ATS | Legibilidad en pantalla |
|--------|------|--------------------|-----------------------|
| Calibri | Sans-serif | Excelente | Excelente |
| Arial | Sans-serif | Excelente | Muy buena |
| Garamond | Serif | Muy buena | Buena |
| Times New Roman | Serif | Excelente | Buena |
| Helvetica | Sans-serif | Muy buena | Excelente |

**Reglas a seguir:**
- **1-2 fuentes como máximo** — Una para títulos, una para el cuerpo (o la misma para todo)
- **10-12 pt para el cuerpo del texto** — Por debajo de 10 pt, algunos ATS tienen dificultades para analizar
- **12-14 pt para los títulos** — Suficiente para crear una jerarquía visual

### Márgenes y espaciado

- **Márgenes:** 1,5 a 2,5 cm en los cuatro lados. Márgenes demasiado estrechos (< 1 cm) pueden truncarse durante el parsing.
- **Interlineado:** 1,0 a 1,15. Un interlineado de 1,5 desperdicia espacio valioso.
- **Extensión:** 1 página para perfiles junior (0-5 años), 2 páginas máximo para perfiles senior. Más allá, los reclutadores dejan de leer — y algunos ATS truncan.

### Formato a usar vs evitar

| Usar | Evitar |
|------|--------|
| **Negrita** para títulos y palabras clave | Cuadros de texto flotantes |
| Viñetas simples (•, –) | Iconos y emojis |
| Líneas horizontales simples | Marcas de agua o fondos |
| Cursiva con moderación | Texto como imagen |
| Mayúsculas para títulos | Marcos y bordes complejos |

## Elementos a eliminar de tu CV

Algunos elementos, aunque comunes, son invisibles o problemáticos para los ATS:

- **Fotos** — Ignoradas por el ATS, ocupan espacio útil. En España, no son obligatorias.
- **Encabezados y pies de página** — La mayoría de los ATS los ignoran completamente. Nunca pongas tus datos de contacto aquí.
- **Cuadros de texto** — Tratados como objetos flotantes, su contenido suele ser ignorado o mal posicionado.
- **Formas y SmartArt** — Totalmente invisibles para los ATS.

Para la lista completa de errores comunes, consulta [los 10 errores que hacen que los ATS rechacen tu CV](/blog/errores-cv-ats).

## FAQ

**¿Las plantillas de Canva son compatibles con ATS?**
La mayoría no lo son. Canva exporta PDF basados en elementos gráficos, no en estructura de texto. Si quieres usar Canva, haz el test Ctrl+A → Ctrl+C en el PDF exportado. Si el texto está desordenado o incompleto, la plantilla no es compatible.

**¿Mi CV debe caber en una sola página?**
No necesariamente. Para un perfil junior (menos de 5 años de experiencia), una página basta. Para un perfil senior, dos páginas son aceptables. Lo importante es que cada línea aporte valor.

**¿Los colores son un problema para los ATS?**
No, los ATS ignoran los colores — no interfieren con el parsing. Pero cuidado: un texto gris claro sobre fondo blanco puede ser difícil de leer para el reclutador que revisa tu CV después del filtro ATS. Opta por un alto contraste.

## Pasa a la acción

Un CV bien formateado es la base. Un CV adaptado a cada oferta es lo que marca la diferencia. FitMyCV analiza la compatibilidad de tu CV con la oferta de empleo y te guía para optimizarlo.

[Analizar mi CV →](https://app.fitmycv.io) | [Ver precios →](/pricing)
