# 🔥 Configuración de Firebase - Paso a Paso

## 1️⃣ Crear Proyecto en Firebase

### Paso 1: Ir a Firebase Console
- Abre [https://console.firebase.google.com](https://console.firebase.google.com)
- Inicia sesión con tu cuenta Google

### Paso 2: Crear Nuevo Proyecto
1. Click en "Crear proyecto"
2. Nombre: `udlap-practicas` (o el que prefieras)
3. Desactiva Google Analytics (opcional)
4. Click en "Crear proyecto"
5. Espera a que se cree (1-2 minutos)

### Paso 3: Configurar Autenticación
1. En el menú izquierdo, ve a **Authentication**
2. Click en "Get started"
3. Selecciona **Email/Password** como método de autenticación
4. Habilítalo (toggle ON)
5. Click "Save"

### Paso 4: Crear Base de Datos (Firestore)
1. En el menú izquierdo, ve a **Firestore Database**
2. Click en "Create database"
3. Elige **Start in test mode** (para desarrollo)
4. Elige región: **us-central1** (o la más cercana)
5. Click en "Create"

---

## 2️⃣ Obtener Credenciales Firebase

### Paso 1: Ir a Configuración del Proyecto
1. En la esquina superior izquierda, haz click en el ⚙️ (engranaje)
2. Selecciona "Configuración del proyecto"

### Paso 2: Copiar Configuración
1. Baja a la sección **"Tu app"**
2. Si no hay una app, click en el icono de web `</>`
3. Se abrirá un modal con tu configuración
4. Copia el objeto `firebaseConfig` que se ve así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxx...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-xxxxx",
  storageBucket: "tu-proyecto-xxxxx.appspot.com",
  messagingSenderId: "1234567890123",
  appId: "1:1234567890123:web:abc123def456"
};
```

---

## 3️⃣ Configurar el Archivo Firebase

### Editar `app/config/firebase.ts`

Reemplaza la configuración de ejemplo con la que copiaste:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxxx_TU_API_KEY_AQUI_xxx",        // ← Reemplaza aquí
  authDomain: "tu-proyecto-xxxxx.firebaseapp.com",  // ← Reemplaza aquí
  projectId: "tu-proyecto-xxxxx",                   // ← Reemplaza aquí
  storageBucket: "tu-proyecto-xxxxx.appspot.com",   // ← Reemplaza aquí
  messagingSenderId: "1234567890123",               // ← Reemplaza aquí
  appId: "1:1234567890123:web:abc123def456"        // ← Reemplaza aquí
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

---

## 4️⃣ Probar la Conexión

### Paso 1: Reinicia el servidor
Si está corriendo, presiona `Ctrl+C` y luego:
```bash
npm run dev
```

### Paso 2: Prueba el Login
1. Abre http://localhost:5173
2. Ingresa cualquier matrícula (ej: `123456`)
3. Ingresa cualquier contraseña (ej: `password123`)
4. Si ve "Inicializando base de datos..." → ✅ Firebase se está conectando
5. Si entra al dashboard → ✅ ¡Funciona!

### Paso 3: Verifica en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a **Authentication** → Verás los usuarios creados
4. Ve a **Firestore Database** → Verás las empresas y guías cargadas

---

## 5️⃣ ¿Qué Cambió?

### Antes (MockDatabase - Todo Local)
```
Login → Datos en memoria → No persisten
```

### Ahora (Firebase - Datos en la Nube)
```
Login → Firebase Auth → Firestore Database → Datos persisten ☁️
```

---

## 🔒 Reglas de Seguridad (Importante)

⚠️ **Test Mode expira en 30 días.** Para producción, debes cambiar las reglas:

### En Firestore Database → Reglas

Reemplaza todo con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios autenticados pueden leer
    match /companies/{document=**} {
      allow read: if request.auth != null;
    }
    
    match /guides/{document=**} {
      allow read: if request.auth != null;
    }
    
    match /appointments/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click en "Publish"

---

## 🚨 Errores Comunes

### Error: "The default Firebase app does not exist"
**Solución:** Verifica que `app/config/firebase.ts` tenga las credenciales correctas.

### Error: "Permission denied" en Firestore
**Solución:** Ve a Firestore Database → Reglas y usa las reglas de arriba.

### No se cargan los datos
**Solución:** 
1. Verifica en Firestore Console si hay datos
2. Si no hay, actualiza la página
3. Revisa la consola del navegador (F12) para errores

---

## 💡 Próximos Pasos

Una vez funcione:

1. **Agregar más datos:** Usa Firebase Console para agregar empresas, contactos, etc.
2. **Sincronizar en tiempo real:** Usa `onSnapshot` para actualizar en vivo
3. **Hacer funcional el formulario de prácticas:** Guardar datos en Firestore
4. **Deploy:** Usa Firebase Hosting para publicar tu app gratis

---

## 📚 Recursos

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)

¡Listo! Tu app ahora usa Firebase ☁️
