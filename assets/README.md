# Assets

## padre-santo.png (la imagen del "Dios parchado")

La sección **Los 6 sacramentos** (`#modulos` en `index.html`) tiene un slot
reservado para la ilustración del Padre Santo (la figura con lentes de sol y
halo neón sobre la nebulosa).

Para que aparezca, coloca aquí un archivo llamado exactamente:

```
assets/padre-santo.png
```

Recomendaciones:
- PNG con **fondo transparente** (solo la figura recortada), para que se funda
  con la nebulosa del fondo.
- Alto ~1400px o más, orientación vertical/cuadrada.
- Si prefieres otro nombre o ruta, edita la regla `.sacr-deity` en `styles.css`
  (propiedad `background-image`).

Mientras el archivo no exista, el slot simplemente no muestra nada (no se ve un
ícono roto) y la nebulosa de fondo se ve completa.
