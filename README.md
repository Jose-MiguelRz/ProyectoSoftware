
# 🧩 ProyectoSoftware  
## Sistema de Prácticas Profesionales UDLAP

---

## 📌 Descripción general

**ProyectoSoftware** es una aplicación web desarrollada para centralizar el proceso de prácticas profesionales de la Universidad de las Américas Puebla.

El sistema busca reducir la confusión de los estudiantes al consultar información sobre empresas, pasos del proceso, contactos, documentos y citas relacionadas con prácticas profesionales.

La plataforma integra frontend moderno con React y TypeScript, autenticación real con Firebase Authentication, base de datos en la nube con Firestore, soporte multiidioma, accesibilidad y una estructura modular pensada para ser mantenible y escalable.

---

# 🎯 Objetivo del proyecto

El objetivo principal del sistema es:

> Centralizar el proceso de prácticas profesionales en una sola plataforma digital, reduciendo la dispersión de información, los errores de seguimiento y la confusión de los estudiantes.

El sistema permite:

- Consultar empresas disponibles para prácticas.
- Ver información importante del proceso.
- Revisar una guía paso a paso.
- Consultar preguntas frecuentes.
- Acceder a contactos institucionales.
- Iniciar sesión con credenciales de estudiante.
- Usar la plataforma en español o inglés.
- Cambiar tema visual y tamaño de fuente.
- Guardar información en Firebase.

---

# 🧠 Problema que resuelve

Antes del sistema, el proceso de prácticas tenía varios problemas:

- La información estaba repartida en distintos medios.
- Los estudiantes no siempre sabían qué paso seguía.
- Había confusión con documentos, contactos y requisitos.
- El seguimiento podía perderse fácilmente.
- No existía una interfaz centralizada para consultar empresas y guías.

Este proyecto propone una plataforma única para consultar y gestionar esa información.

---

# 🚀 Evolución del proyecto

## 🟡 Fase 1 — Diseño de producto

En la primera fase se trabajó el diseño conceptual del sistema.

Incluyó:

- Investigación con usuarios.
- Identificación de necesidades.
- Definición de problemas.
- Arquitectura de información.
- Flujos de usuario.
- Prototipo navegable.
- Testing UX.
- Diseño de interfaz.

Resultado:

- Prototipo validado.
- Flujo principal definido.
- Estructura del sistema clara.
- Base para el desarrollo frontend.

---

## 🔵 Sprint 2 — Accesibilidad e internacionalización

En el segundo sprint se agregaron funciones enfocadas en experiencia de usuario y accesibilidad.

Se implementó:

- Traducción Español / Inglés.
- Cambio de tema claro / oscuro.
- Cambio de tamaño de fuente.
- Persistencia de configuración con `localStorage`.

Estas funciones permiten que el usuario adapte la interfaz a sus necesidades.

---

## 🔴 Sprint 3 — Firebase y persistencia real

En el tercer sprint se integró Firebase como backend serverless.

Se implementó:

- Firebase Authentication.
- Firestore Database.
- Archivo de configuración Firebase.
- Hooks personalizados para Firestore.
- Inicialización de datos desde mockups.
- Persistencia de empresas, guías, usuarios y citas.

Con esto, el sistema dejó de depender únicamente de datos locales y pasó a usar servicios en la nube.

---

# 🏗️ Arquitectura del sistema

El sistema usa una arquitectura basada en frontend + servicios cloud.

No hay un backend tradicional con Express, Node o API propia. En su lugar, Firebase actúa como backend.

```txt
Usuario
  ↓
Interfaz React
  ↓
Providers / Hooks
  ↓
Firebase SDK
  ↓
Firebase Authentication + Firestore
````

---

## Tipo de arquitectura

El proyecto sigue una arquitectura **serverless**.

Esto significa que:

* No se administra un servidor propio.
* Firebase maneja autenticación.
* Firestore maneja datos.
* React consume servicios directamente desde el frontend.
* La lógica de estado se organiza con providers y hooks.

---

# 🧩 Capas principales

## 1. Capa de interfaz

Está formada por componentes React.

Ejemplos:

* `login.tsx`
* `home.tsx`
* `companies.tsx`
* `faq.tsx`
* `guide.tsx`
* `contacts.tsx`
* `accessibility-settings.tsx`

Esta capa muestra la información al usuario y captura sus acciones.

---

## 2. Capa de estado global

Está formada por providers de React.

Ejemplos:

* `AuthProvider`
* `DatabaseProvider`
* `AccessibilityProvider`
* `StudentProfileProvider`
* `ToastProvider`

Estos providers permiten compartir información entre componentes sin pasar props manualmente.

---

## 3. Capa de lógica reutilizable

Está formada por hooks personalizados.

Ejemplo:

* `useFirestore.ts`

Los hooks encapsulan operaciones repetidas como leer, agregar, actualizar o eliminar documentos en Firestore.

---

## 4. Capa de servicios externos

Está formada por Firebase.

Servicios usados:

* Firebase Authentication.
* Cloud Firestore.

Firebase funciona como backend del sistema.

---

# 🛠️ Tecnologías usadas

## Frontend

### React

React se usa para construir la interfaz del sistema mediante componentes reutilizables.

Ventajas:

* Permite dividir la app en componentes.
* Facilita el manejo de estado.
* Permite crear interfaces dinámicas.
* Es adecuado para aplicaciones web modernas.

---

### TypeScript

TypeScript se usa para agregar tipado estático al proyecto.

Ventajas:

* Reduce errores.
* Ayuda a detectar problemas antes de ejecutar.
* Mejora el autocompletado.
* Hace el código más mantenible.

---

### Vite

Vite se usa como herramienta de desarrollo y empaquetado.

Funciones:

* Levanta el servidor local.
* Compila el proyecto.
* Permite recarga rápida durante desarrollo.
* Genera build final para producción.

Comando principal:

```bash
npm run dev
```

---

### Tailwind CSS

Tailwind se usa para estilos.

Ventajas:

* Permite diseñar rápido.
* Evita crear demasiados archivos CSS.
* Facilita diseño responsivo.
* Se integra bien con variables CSS.

---

### React Router

React Router se usa para navegación entre páginas.

Permite manejar rutas como:

* `/`
* `/dashboard`
* `/dashboard/empresas`
* `/dashboard/guia`
* `/dashboard/contactos`
* `/dashboard/faq`

---

## Backend / Cloud

### Firebase Authentication

Firebase Authentication se usa para manejar usuarios y sesiones.

Se encarga de:

* Crear usuarios.
* Iniciar sesión.
* Cerrar sesión.
* Mantener sesión activa.
* Proteger acceso a secciones privadas.

---

### Firebase Firestore

Firestore se usa como base de datos NoSQL en la nube.

Se encarga de guardar:

* Empresas.
* Usuarios.
* Guías.
* Citas.
* Información del sistema.

---

## Estado global

### React Context API

React Context API se usa para compartir información global entre componentes.

Se usa en:

* Autenticación.
* Base de datos.
* Accesibilidad.
* Perfil de estudiante.

Esto evita tener que pasar datos manualmente por muchos componentes.

---

## Accesibilidad e internacionalización

### CSS Variables

Se usan variables CSS para manejar colores y tamaños dinámicos.

Ejemplo:

```css
--background
--foreground
--primary
--font-size
```

Estas variables permiten cambiar tema y tamaño de fuente sin reescribir todos los estilos.

---

### localStorage

Se usa `localStorage` para guardar preferencias del usuario.

Ejemplos:

* Idioma seleccionado.
* Tema claro u oscuro.
* Tamaño de fuente.

Así, cuando el usuario recarga la página, sus preferencias se mantienen.

---

### Sistema i18n propio

El proyecto no usa una librería externa como `i18next`.

En su lugar, usa un sistema propio basado en un archivo de traducciones.

Ejemplo:

```ts
translate(language, "nav.home")
```

Esto permite mostrar texto en español o inglés dependiendo del idioma seleccionado.

---

## UI y experiencia de usuario

### Lucide React

Se usa para íconos.

Ejemplos:

* Íconos de usuario.
* Íconos de empresa.
* Íconos de configuración.
* Íconos de navegación.

---

### Radix UI

Se usa para componentes accesibles de interfaz.

Ejemplos:

* Dialogs.
* Tooltips.
* Dropdowns.
* Componentes interactivos.

---

### Sonner

Se usa para mostrar notificaciones tipo toast.

Ejemplos:

* Login exitoso.
* Error de autenticación.
* Datos guardados.
* Acción completada.

---

## Testing

### Cypress

Cypress se usa para pruebas end-to-end.

Permite probar flujos completos como:

* Abrir la app.
* Hacer login.
* Entrar al dashboard.
* Navegar entre páginas.
* Validar elementos visibles.

---

### Vitest

Vitest se usa para pruebas unitarias.

Permite probar funciones, componentes o lógica aislada.

---

# 📂 Estructura del proyecto

```txt
ProyectoSoftware/
│
├── app/
│   ├── App.tsx
│   ├── components/
│   │   ├── login.tsx
│   │   ├── home.tsx
│   │   ├── companies.tsx
│   │   ├── faq.tsx
│   │   ├── guide.tsx
│   │   ├── contacts.tsx
│   │   ├── auth-provider.tsx
│   │   ├── database-provider.tsx
│   │   ├── accessibility-provider.tsx
│   │   ├── student-profile-provider.tsx
│   │   └── ui/
│   │
│   ├── config/
│   │   └── firebase.ts
│   │
│   ├── constants/
│   │   ├── database.ts
│   │   ├── translations.ts
│   │   └── design-tokens.ts
│   │
│   ├── hooks/
│   │   └── useFirestore.ts
│   │
│   └── routes.tsx
│
├── src/
│   ├── main.tsx
│   ├── index.css
│   └── test/
│
├── styles/
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
│
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── README.md
```

---

# 🧠 Explicación de carpetas principales

## `app/`

Contiene la lógica principal de la aplicación.

Aquí se encuentran los componentes, providers, hooks, constantes y rutas.

---

## `app/components/`

Contiene los componentes principales del sistema.

Cada archivo representa una parte visual o funcional.

Ejemplos:

* `login.tsx`: pantalla de inicio de sesión.
* `home.tsx`: página principal del dashboard.
* `companies.tsx`: listado de empresas.
* `guide.tsx`: guía paso a paso.
* `contacts.tsx`: contactos institucionales.
* `faq.tsx`: preguntas frecuentes.

---

## `app/components/ui/`

Contiene componentes reutilizables de UI.

Ejemplos:

* Botones.
* Cards.
* Inputs.
* Dialogs.
* Tabs.
* Tooltips.
* Formularios.

Esta carpeta ayuda a mantener una interfaz consistente.

---

## `app/config/`

Contiene archivos de configuración.

Actualmente incluye:

```txt
firebase.ts
```

Este archivo conecta el proyecto con Firebase.

---

## `app/constants/`

Contiene datos estáticos y configuraciones generales.

Ejemplos:

* Datos mock.
* Traducciones.
* Tokens de diseño.

---

## `app/hooks/`

Contiene hooks personalizados.

El hook más importante es:

```txt
useFirestore.ts
```

Este archivo ayuda a conectar componentes con Firestore.

---

## `src/`

Contiene el punto de entrada principal del proyecto.

El archivo principal es:

```txt
main.tsx
```

Este monta la aplicación en el DOM.

---

# 🔐 Sistema de autenticación

La autenticación se realiza con Firebase Authentication.

El usuario inicia sesión usando su ID de estudiante y contraseña.

Como Firebase Authentication necesita un correo, el sistema transforma el ID en un email institucional.

Ejemplo:

```txt
ID ingresado: 123456
Email generado: 123456@udlap.mx
```

Luego Firebase valida:

* Si el usuario existe.
* Si la contraseña es correcta.
* Si puede iniciar sesión.

---

## Flujo de login

```txt
Usuario ingresa ID y contraseña
  ↓
AuthProvider recibe los datos
  ↓
El ID se convierte a email
  ↓
Firebase Authentication valida
  ↓
Si es correcto, crea sesión
  ↓
El usuario entra al dashboard
```

---

## Firebase Auth vs Firestore

Es importante separar estos dos conceptos.

### Firebase Authentication

Sirve para login.

Guarda:

* Email.
* Contraseña encriptada.
* UID del usuario.
* Estado de sesión.

---

### Firestore

Sirve para datos de la aplicación.

Guarda:

* Perfil del usuario.
* Empresas.
* Guías.
* Citas.
* Información del sistema.

---

## UID del usuario

Cuando Firebase crea un usuario, genera un UID.

Ejemplo:

```txt
uid: X8sdf7823asd...
```

Ese UID se puede usar para relacionar datos en Firestore.

Ejemplo:

```json
{
  "uid": "X8sdf7823asd",
  "studentId": "123456",
  "email": "123456@udlap.mx",
  "role": "student"
}
```

---

# 🗄️ Base de datos

La base de datos usada es Firestore.

Firestore es NoSQL, por lo que no usa tablas como SQL.

Usa:

* Colecciones.
* Documentos.
* Campos.

---

## Estructura general

```txt
Firestore
│
├── companies
│   ├── company_1
│   ├── company_2
│   └── company_3
│
├── users
│   ├── user_1
│   ├── user_2
│   └── user_3
│
├── guides
│   ├── guide_1
│   ├── guide_2
│   └── guide_3
│
└── appointments
    ├── appointment_1
    ├── appointment_2
    └── appointment_3
```

---

## Colección `companies`

Guarda las empresas disponibles para prácticas.

Ejemplo:

```json
{
  "name": "CEMEX",
  "description": "Empresa multinacional mexicana",
  "location": "Monterrey",
  "industry": "Construcción",
  "contactEmail": "talento@cemex.com",
  "website": "https://www.cemex.com",
  "paid": true,
  "positions": 3,
  "hours": "40 hrs/semana",
  "isActive": true
}
```

---

## Colección `users`

Guarda información adicional del usuario.

Firebase Auth guarda el login, pero Firestore puede guardar el perfil.

Ejemplo:

```json
{
  "uid": "firebase_uid",
  "studentId": "123456",
  "email": "123456@udlap.mx",
  "name": "Juan Pérez",
  "role": "student"
}
```

---

## Colección `guides`

Guarda los pasos del proceso de prácticas.

Ejemplo:

```json
{
  "title": "Paso 1: Preparación de documentos",
  "description": "Reúne la documentación necesaria",
  "order": 1,
  "category": "application",
  "isActive": true
}
```

---

## Colección `appointments`

Guarda citas o reuniones relacionadas con el proceso.

Ejemplo:

```json
{
  "studentId": "firebase_uid",
  "companyId": "company_id",
  "date": "2026-05-15",
  "time": "10:00",
  "type": "interview",
  "status": "confirmed"
}
```

---

# 🔄 Inicialización de datos

El sistema puede cargar datos iniciales desde mockups.

El flujo es:

```txt
App inicia
  ↓
DatabaseProvider revisa Firestore
  ↓
Si no hay datos, carga datos iniciales
  ↓
Si ya hay datos, solo los lee
```

Esto permite que la app tenga información desde el primer uso.

---

# 🧩 Providers principales

## AuthProvider

Controla la autenticación.

Responsabilidades:

* Login.
* Logout.
* Escuchar cambios de sesión.
* Guardar usuario activo.
* Proteger rutas.

---

## DatabaseProvider

Controla el acceso a la base de datos.

Responsabilidades:

* Inicializar Firestore.
* Cargar datos mock si es necesario.
* Compartir datos con componentes.
* Mantener compatibilidad con datos existentes.

---

## AccessibilityProvider

Controla configuración visual y de idioma.

Responsabilidades:

* Idioma.
* Tema claro / oscuro.
* Tamaño de fuente.
* Guardar preferencias en localStorage.

---

## StudentProfileProvider

Controla información del estudiante.

Responsabilidades posibles:

* Perfil.
* Nombre.
* Datos de usuario.
* Información académica.

---

## ToastProvider

Controla notificaciones.

Responsabilidades:

* Mostrar mensajes de éxito.
* Mostrar errores.
* Alertar acciones importantes.

---

# 🌍 Sistema de traducciones

El sistema usa traducciones propias.

Archivo principal:

```txt
app/constants/translations.ts
```

El sistema tiene objetos para español e inglés.

Ejemplo:

```ts
export const translations = {
  es: {
    nav: {
      home: "Inicio",
      companies: "Empresas"
    }
  },
  en: {
    nav: {
      home: "Home",
      companies: "Companies"
    }
  }
}
```

---

## Función de traducción

La función recibe:

* Idioma.
* Clave.

Ejemplo:

```ts
translate(language, "nav.home")
```

Resultado:

```txt
Español: Inicio
Inglés: Home
```

---

## Ventajas del sistema de traducción

* No recarga la página.
* Es fácil agregar nuevos textos.
* Es fácil agregar otro idioma.
* Mantiene los textos centralizados.

---

# ♿ Accesibilidad

El proyecto incluye funciones de accesibilidad enfocadas en mejorar la experiencia del usuario.

Incluye:

* Modo claro.
* Modo oscuro.
* Tamaño de fuente.
* Soporte multiidioma.
* Diseño responsivo.

---

## Tecnologías usadas para accesibilidad

* React Context API.
* CSS Variables.
* Tailwind CSS.
* localStorage.
* Componentes Radix UI.

---

## Modo claro / oscuro

El tema se maneja mediante variables CSS.

Ejemplo:

```css
:root {
  --background: #ffffff;
  --foreground: #111111;
}

.dark {
  --background: #111111;
  --foreground: #ffffff;
}
```

---

## Tamaño de fuente

El tamaño de fuente se maneja con una variable.

Ejemplo:

```css
:root {
  --font-size: 16px;
}
```

Esto permite cambiar el tamaño global de la interfaz.

---

## Persistencia de accesibilidad

Las preferencias se guardan en `localStorage`.

Ejemplo:

```ts
localStorage.setItem("accessibility-language", language)
```

Cuando el usuario regresa, el sistema carga la configuración guardada.

---

# 🧭 Rutas del sistema

El sistema usa React Router.

Ejemplo de rutas:

```txt
/                 → Login
/dashboard        → Home
/dashboard/empresas
/dashboard/guia
/dashboard/contactos
/dashboard/faq
```

---

## Rutas protegidas

Las rutas protegidas solo se muestran si el usuario inició sesión.

Flujo:

```txt
Usuario intenta entrar a dashboard
  ↓
ProtectedRoute revisa sesión
  ↓
Si hay usuario, permite acceso
  ↓
Si no hay usuario, redirige a login
```

---

# 🧪 Testing

El proyecto incluye herramientas para pruebas.

## Cypress

Se usa para pruebas end-to-end.

Ejemplo de flujo probado:

```txt
Abrir app
  ↓
Login
  ↓
Dashboard
  ↓
Navegar a empresas
  ↓
Validar contenido
```

---

## Vitest

Se usa para pruebas unitarias.

Sirve para probar:

* Funciones.
* Componentes.
* Lógica aislada.
* Hooks.

---

# ▶️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Jose-MiguelRz/ProyectoSoftware.git
```

---

## 2. Entrar a la carpeta

```bash
cd ProyectoSoftware
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

---

## 5. Abrir en navegador

Normalmente Vite muestra una URL como:

```txt
http://localhost:5173
```

---

# 🔥 Configuración de Firebase

## 1. Crear proyecto en Firebase

Entrar a:

```txt
https://console.firebase.google.com
```

Crear un proyecto llamado, por ejemplo:

```txt
udlap-practicas
```

---

## 2. Activar Authentication

En Firebase:

```txt
Authentication → Sign-in method → Email/Password
```

Activar el método Email/Password.

---

## 3. Crear Firestore Database

En Firebase:

```txt
Firestore Database → Create database
```

Para desarrollo se puede usar test mode.

---

## 4. Copiar configuración

Firebase genera un objeto como este:

```ts
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

Ese objeto se coloca en:

```txt
app/config/firebase.ts
```

---

# ⚠️ Variables y seguridad

El archivo `.gitignore` ignora archivos `.env`.

Esto es importante porque las credenciales sensibles no deberían subirse directamente al repositorio.

Para producción, se recomienda usar variables de entorno.

Ejemplo:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

---

# 📦 Dependencias principales

Algunas dependencias importantes del proyecto:

```json
{
  "react": "^18.2.0",
  "typescript": "^6.0.3",
  "vite": "^5.0.8",
  "firebase": "^12.12.1",
  "tailwindcss": "^3.3.6",
  "react-router-dom": "^7.14.1",
  "lucide-react": "^0.344.0",
  "sonner": "^1.4.3",
  "cypress": "^12.17.4",
  "vitest": "^4.1.4"
}
```

---

# 🧑‍💻 Comandos útiles

## Ejecutar proyecto

```bash
npm run dev
```

---

## Instalar dependencias

```bash
npm install
```

---

## Construir proyecto

```bash
npm run build
```

---

## Ejecutar pruebas

```bash
npm run test
```

---

## Ejecutar Cypress

```bash
npx cypress open
```

---

# 🧠 Flujo completo del sistema

```txt
Usuario abre la app
  ↓
React carga App.tsx
  ↓
Se montan los providers
  ↓
AuthProvider revisa sesión
  ↓
Si no hay sesión, muestra Login
  ↓
Usuario escribe ID y contraseña
  ↓
Firebase Authentication valida
  ↓
Si es correcto, entra al Dashboard
  ↓
DatabaseProvider carga datos desde Firestore
  ↓
Componentes muestran empresas, guías, contactos y FAQ
  ↓
Usuario puede cambiar idioma, tema o tamaño de fuente
  ↓
Preferencias se guardan en localStorage
```

---

# 📊 Componentes principales

## `login.tsx`

Pantalla de inicio de sesión.

Responsabilidades:

* Recibir ID y contraseña.
* Llamar al AuthProvider.
* Mostrar errores.
* Redirigir si el login es correcto.

---

## `home.tsx`

Página principal del dashboard.

Responsabilidades:

* Mostrar bienvenida.
* Mostrar accesos rápidos.
* Mostrar información general.

---

## `companies.tsx`

Página de empresas.

Responsabilidades:

* Mostrar empresas disponibles.
* Filtrar o buscar empresas.
* Mostrar detalles importantes.
* Permitir interacción con oportunidades.

---

## `guide.tsx`

Página de guía paso a paso.

Responsabilidades:

* Mostrar proceso de prácticas.
* Ordenar pasos.
* Ayudar al estudiante a seguir el flujo correcto.

---

## `faq.tsx`

Página de preguntas frecuentes.

Responsabilidades:

* Mostrar dudas comunes.
* Organizar respuestas.
* Reducir confusión del estudiante.

---

## `contacts.tsx`

Página de contactos.

Responsabilidades:

* Mostrar información de coordinación.
* Mostrar correo, oficina, horario y teléfono.
* Facilitar contacto institucional.

---

## `accessibility-settings.tsx`

Panel de accesibilidad.

Responsabilidades:

* Cambiar idioma.
* Cambiar tema.
* Cambiar tamaño de fuente.
* Guardar preferencias.

---

# 🧾 Documentación técnica de archivos importantes

## `app/config/firebase.ts`

Inicializa Firebase.

Responsabilidades:

* Importar `initializeApp`.
* Crear instancia de Firebase.
* Exportar `auth`.
* Exportar `db`.

Ejemplo conceptual:

```ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
```

---

## `app/components/auth-provider.tsx`

Maneja autenticación.

Responsabilidades:

* Escuchar sesión activa.
* Hacer login.
* Hacer logout.
* Guardar usuario actual.
* Compartir estado de autenticación.

---

## `app/components/database-provider.tsx`

Maneja datos principales.

Responsabilidades:

* Conectar con Firestore.
* Cargar empresas.
* Cargar guías.
* Inicializar datos si la base está vacía.
* Compartir funciones de base de datos.

---

## `app/hooks/useFirestore.ts`

Contiene hooks reutilizables para Firestore.

Funciones esperadas:

* Leer colecciones.
* Agregar documentos.
* Actualizar documentos.
* Eliminar documentos.

Ventaja:

* Evita repetir código Firebase en cada componente.

---

## `app/constants/database.ts`

Contiene datos mock.

Sirve como:

* Datos iniciales.
* Respaldo local.
* Seed para Firestore.

---

## `app/constants/translations.ts`

Contiene textos traducidos.

Sirve para:

* Español.
* Inglés.
* Interfaz multiidioma.

---

## `tailwind.config.js`

Configura Tailwind.

Incluye:

* Rutas donde Tailwind busca clases.
* Colores basados en variables CSS.
* Radios.
* Tamaños de fuente.
* Tokens de diseño.

---

## `vite.config.js`

Configura Vite.

Incluye:

* Plugin de React.
* Configuración de pruebas con jsdom.

---

# 🔒 Seguridad

El sistema usa seguridad en varias capas.

## Firebase Authentication

Firebase maneja:

* Contraseñas encriptadas.
* Sesiones seguras.
* Validación de credenciales.

---

## Firestore Rules

Se recomienda proteger la base con reglas.

Ejemplo:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /companies/{document=**} {
      allow read: if request.auth != null;
    }

    match /guides/{document=**} {
      allow read: if request.auth != null;
    }

    match /appointments/{document=**} {
      allow read, write: if request.auth != null;
    }

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

# ⚠️ Limitaciones actuales

El sistema funciona, pero todavía puede mejorar.

Limitaciones:

* Depende de Firebase.
* No tiene backend propio.
* Las reglas de Firestore deben configurarse bien antes de producción.
* El sistema de traducción es propio, no usa una librería avanzada.
* Puede requerir validaciones extra para roles.
* Falta definir permisos más estrictos para usuarios administrativos.

---

# 🔮 Mejoras futuras

Posibles mejoras:

* Panel administrativo.
* Gestión de empresas desde la interfaz.
* Carga de documentos.
* Notificaciones por correo.
* Notificaciones push.
* Chatbot de ayuda.
* Dashboard de métricas.
* Roles más completos.
* Validación de documentos.
* Integración con correo institucional.
* Exportación de reportes.

---

# 👥 Equipo de trabajo

## UX Research / Producto

Responsabilidades:

* Investigación con usuarios.
* Entrevistas.
* Identificación de necesidades.
* Testing UX.
* Definición de problemas.

---

## UI/UX Design

Responsabilidades:

* Wireframes.
* Diseño visual.
* Prototipo en Figma.
* UI Kit.
* Componentes visuales.

---

## Product / Tech Analyst

Responsabilidades:

* Requisitos funcionales.
* Validaciones.
* Roles y permisos.
* Backlog.
* Consistencia diseño-sistema.

---

## Tech Lead / Sistemas

Responsabilidades:

* Arquitectura.
* Modelo de dominio.
* Integraciones.
* Viabilidad técnica.
* Estructura del sistema.

---

## Project Manager

Responsabilidades:

* Organización del equipo.
* Seguimiento de tareas.
* Priorización.
* Gestión de tiempos.
* Control de entregables.

---

# 📈 Estado actual

El proyecto actualmente cuenta con:

* Interfaz funcional.
* Login con Firebase.
* Base de datos en Firestore.
* Sistema multiidioma.
* Accesibilidad básica.
* Componentes organizados.
* Documentación técnica.
* Soporte para pruebas.

Estado:

```txt
Proyecto funcional con integración cloud.
```

---

# 🎯 Conclusión

ProyectoSoftware es una aplicación web moderna para apoyar el proceso de prácticas profesionales de la UDLAP.

El proyecto evolucionó desde una fase de diseño UX/UI hasta una implementación funcional con React, TypeScript, Firebase Authentication y Firestore.

La arquitectura serverless permite tener una solución escalable sin necesidad de administrar un backend propio.

El sistema centraliza información, mejora la experiencia del estudiante y deja una base técnica clara para futuras mejoras.

---

```
```
