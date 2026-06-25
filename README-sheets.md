# Registrar el formulario en Google Sheets

El formulario de la web ya está listo para guardar cada registro en una hoja de
Google Sheets. Solo falta conectar **tu** hoja. Es gratis y toma ~10 minutos.

## Paso 1 — Crea la hoja
1. Ve a https://sheets.google.com y crea una hoja nueva (ej. "Padre Santo · Leads").
2. En la fila 1 escribe estos encabezados (en este orden):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | fecha | nombre | email | empresa | whatsapp | origen |

## Paso 2 — Pega el script
1. En esa hoja: menú **Extensiones → Apps Script**.
2. Borra lo que haya y pega este código:

```javascript
function doPost(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1')
          || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var p = e.parameter;
  hoja.appendRow([
    p.fecha || new Date().toISOString(),
    p.nombre || '',
    p.email || '',
    p.empresa || '',
    p.whatsapp || '',
    p.origen || ''
  ]);
  return ContentService.createTextOutput('ok');
}
```

> Si tu hoja se llama distinto a "Hoja 1", igual funciona (toma la primera hoja).

## Paso 3 — Publica el script como app web
1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web** (Web app).
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** **Cualquiera** ("Anyone").
4. Clic en **Implementar**, autoriza los permisos que pida.
5. Copia la **URL de la app web** (termina en `/exec`).
   Se ve así: `https://script.google.com/macros/s/AKfy...../exec`

## Paso 4 — Conéctala a la web
Pásame esa URL y la pego en `app.js` (variable `SHEET_ENDPOINT`), o hazlo tú:

```javascript
// app.js, línea ~12
var SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfy...../exec';
```

Listo. Cada vez que alguien envíe el formulario, se agrega una fila a tu hoja.

---

### Notas
- Mientras `SHEET_ENDPOINT` esté vacío, el formulario abre WhatsApp con los datos
  como respaldo (para no perder ningún lead).
- La petición se envía en modo `no-cors` (no necesita configuración extra de CORS).
- ¿Quieres además recibir un correo por cada lead? Se puede agregar
  `MailApp.sendEmail(...)` dentro del `doPost`. Avísame y lo incluyo.
- Alternativas sin Apps Script (si prefieres): Formspree, SheetDB o Sheety.
