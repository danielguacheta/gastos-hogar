# 🏡 Gastos del Hogar

App de control de gastos mensuales del hogar con Firebase + GitHub Pages.

## 🚀 Cómo publicar en GitHub Pages

1. Crea un repositorio en GitHub llamado `gastos-hogar`
2. Sube el archivo `index.html` a la raíz del repositorio
3. Ve a **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: **main** → **Save**
4. En 2-3 minutos tu app estará en: `https://TU_USUARIO.github.io/gastos-hogar`

## 🔥 Firebase - Reglas de seguridad

En la consola de Firebase → Firestore → Reglas, pega esto para que solo tú puedas escribir:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /meses/{mes} {
      allow read, write: if true;
    }
  }
}
```

## ⚠️ Seguridad
- Cambia las reglas de Firestore si no quieres que cualquiera pueda editar los datos
- Considera agregar autenticación con Firebase Auth en el futuro

## ✨ Funciones
- 📋 Registro mensual de gastos con 24 ítems base
- ✓ Check de pagos realizados
- 📊 Comparativo mes vs mes anterior
- 📈 Gráficas de evolución y distribución
- ☁️ Datos en la nube, accesible desde cualquier dispositivo
