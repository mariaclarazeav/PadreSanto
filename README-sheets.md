# Conectar el formulario a tu Google Sheet

Tu hoja: https://docs.google.com/spreadsheets/d/1TmgP7R7in6jLLEv17XK-nlDlWXySaVN03XaSLs7OQGc/edit

El formulario ya está listo; solo falta crear el "puente" (un Apps Script publicado
como app web) que reciba cada envío y lo escriba en tu hoja. **Solo tú puedes
hacerlo** porque corre con tu cuenta de Google. Toma ~5 minutos.

## Paso 1 — Abre el editor de Apps Script
1. Abre tu hoja (link de arriba).
2. Menú **Extensiones → Apps Script**.
3. Borra todo lo que haya en el editor.

## Paso 2 — Pega este código y guarda
(Crea los encabezados automáticamente la primera vez, no tienes que escribirlos.)

```javascript
function doPost(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  // Crea los encabezados si la hoja está vacía
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(['fecha', 'nombre', 'email', 'empresa', 'whatsapp', 'origen']);
  }

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

Guarda con el ícono de disquete (o Ctrl+S).

## Paso 3 — Publica como app web
1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En el engranaje ⚙ (Seleccionar tipo) elige **Aplicación web**.
3. Configura:
   - **Descripción:** Padre Santo leads (lo que quieras).
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** **Cualquiera** ("Anyone").
4. **Implementar** → autoriza los permisos (te pedirá entrar con tu cuenta y
   aceptar; si sale "Google no verificó esta app", entra en *Configuración
   avanzada → Ir a (nombre) → Permitir*).
5. Copia la **URL de la app web** (termina en `/exec`):
   `https://script.google.com/macros/s/AKfy....../exec`

## Paso 4 — Pásame esa URL
Me la envías y la pego en `app.js` (variable `SHEET_ENDPOINT`). Listo: cada envío
del formulario aparece como una fila nueva en tu hoja.

> Para probar tú mismo después: llena el formulario en la web → debería aparecer
> una fila. (Si quieres probar el script solo, en el editor corre `doPost` no
> funciona directo porque espera datos; mejor pruébalo desde la web ya conectada.)

---

### Opcional
- ¿Quieres además un **correo por cada lead nuevo**? Agrega dentro del `doPost`,
  antes del `return`:
  ```javascript
  MailApp.sendEmail('info@aipadresanto.com', 'Nuevo lead Padre Santo',
    p.nombre + ' · ' + p.email + ' · ' + p.empresa + ' · ' + p.whatsapp);
  ```
- Si más adelante cambias el script, recuerda **Implementar → Gestionar
  implementaciones → editar → Nueva versión** para que aplique.
