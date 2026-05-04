# 📚 Documentación Completa - Sistema de Prácticas Profesionales UDLAP

## 🏗️ Arquitectura General del Proyecto

Tu proyecto es una **aplicación web SPA (Single Page Application)** construida con:
- **React** (interfaz de usuario)
- **Vite** (empaquetador y servidor de desarrollo)
- **TypeScript** (tipado de JavaScript)
- **Tailwind CSS** (estilos)
- **React Router** (navegación)

**Flujo principal:**
```
Usuario abre la app 
  ↓
Login (AuthProvider valida credenciales)
  ↓
Dashboard protegido (ProtectedRoot)
  ↓
Accede a: Home, FAQ, Empresas, Guía, Contactos, Accesibilidad
```

---

## 🗄️ Sistema de Bases de Datos

### ¿Hay API remota?
**NO.** Tu proyecto **NO tiene backend** ni APIs externas. Todo funciona con datos almacenados **localmente en memoria y localStorage**.

### Clase MockDatabase (Patrón Singleton)
**Ubicación:** `app/constants/database.ts`

La clase `MockDatabase` simula una base de datos real:
```typescript
export class MockDatabase {
  private static instance: MockDatabase;  // Singleton
  
  // Una sola instancia en toda la aplicación
  static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }
}
```

### Datos Almacenados

#### 1. **Empresas (Companies)**
```typescript
interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  email: string;
  website?: string;
  paid: boolean;
  positions: number;
  hours: string;
  isActive: boolean;
}
```

**Datos mockup:**
- Tecnológico de Monterrey
- CEMEX
- BBVA México
- Grupo Azucarero
- Volkswagen México
- Farmacias del Dr. Ahorro
- Consultoría Digital Solutions

#### 2. **Usuarios (Users)**
```typescript
interface User {
  id: string;
  studentId: string;      // Matrícula del estudiante
  name: string;
  email: string;
  career: string;         // Carrera
  semester: number;       // Semestre actual
}
```

**Datos mockup:**
- Juan Pérez García (Ingeniería en Sistemas, Sem 8)
- María González López (Ingeniería Industrial, Sem 7)

#### 3. **Contactos**
Datos **nuevos** que actualizaste:
```typescript
name: "Mercedes Flores Bouchan"
role: "Coordinador"
email: "mercedes.flores@udlap.mx"
phone: "4383"
office: "BI 404"
```

#### 4. **Guías (Guides)**
Pasos del proceso de prácticas (8 etapas).

#### 5. **Citas (Appointments)**
```typescript
interface Appointment {
  studentId: string;
  companyId: string;
  date: string;
  time: string;
  type: 'interview' | 'meeting' | 'presentation';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
```

### ¿Cómo se Acceden los Datos?

**Opción 1: Usando el DatabaseProvider (Recomendado)**
```typescript
import { useDatabase } from "./database-provider";

export function Empresas() {
  const db = useDatabase();
  const companies = db.getCompanies();
  // ...
}
```

**Opción 2: Instancia directa**
```typescript
const db = MockDatabase.getInstance();
const users = db.getUsers();
```

### Persistencia de Datos

**¿Se guardan los cambios cuando cierro la pestaña?**

Parcialmente:
- ✅ **Preferencias de accesibilidad** → guardadas en `localStorage`
- ✅ **Usuario logueado** → guardado en `localStorage`
- ❌ **Cambios en empresas, contactos** → se pierden (no hay backend)

Ejemplo:
```typescript
// En accessibility-provider.tsx
localStorage.setItem("accessibility-language", language);
localStorage.getItem("accessibility-language");
```

---

## 🔐 Sistema de Autenticación

**Ubicación:** `app/components/auth-provider.tsx`

### Flujo de Login

```typescript
const login = async (studentId: string, password: string) => {
  // 1. Simula delay de red (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 2. Valida credenciales (cualquier usuario/contraseña no vacíos)
  if (studentId.trim() && password.trim()) {
    const result = db.authenticate(studentId, password);
    
    // 3. Si es válido, guarda en localStorage
    if (result.success) {
      localStorage.setItem("udlap_auth_user", JSON.stringify(result.user));
      setUser(result.user);
      return { success: true };
    }
  }
  
  return { success: false, error: "Credenciales inválidas" };
};
```

### ¿Cómo se Validan las Credenciales?

**Método `authenticate` en MockDatabase:**
```typescript
authenticate(studentId: string, password: string) {
  // Busca un usuario con ese studentId
  const user = this.data.users.find(u => u.studentId === studentId);
  
  // Si existe, devuelve éxito (sin validar contraseña)
  if (user) {
    return { success: true, user };
  }
  
  // Si no existe, crea uno nuevo
  const newUser = {
    id: Date.now().toString(),
    studentId,
    name: `Usuario ${studentId}`,
    email: `${studentId}@udlap.mx`,
    career: "Carrera no especificada",
    semester: 1
  };
  
  this.data.users.push(newUser);
  return { success: true, user: newUser };
}
```

**En resumen:** El login acepta **cualquier matrícula y contraseña**, y si no existe el usuario, lo crea automáticamente.

### Uso en Componentes

```typescript
import { useAuth } from "./auth-provider";

export function Home() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <p>Bienvenido, {user?.name}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

---

## 🌍 Sistema de Traducciones

**Ubicación:** `app/constants/translations.ts`

### Estructura de Traducciones

```typescript
export const translations = {
  es: {          // Español
    nav: {
      home: "Inicio",
      faq: "Preguntas Frecuentes",
      // ...
    },
    faq: {
      title: "Preguntas Frecuentes",
      // ...
    },
    // ... (200+ claves traducidas)
  },
  en: {          // English
    nav: {
      home: "Home",
      faq: "FAQ",
      // ...
    },
    // ... (200+ claves traducidas)
  }
}
```

### ¿Cómo Funciona la Traducción?

**Función `translate`:**
```typescript
export function translate(language: "es" | "en", key: string): string {
  const keys = key.split(".");  // Ej: "nav.home" → ["nav", "home"]
  let value = translations[language];
  
  for (const k of keys) {
    value = (value as any)[k];
  }
  
  return value || key;  // Si no existe, devuelve la clave
}
```

### Uso en Componentes

```typescript
import { useAccessibility } from "./accessibility-provider";
import { translate } from "../constants/translations";

export function Home() {
  const { language } = useAccessibility();
  
  return (
    <h1>{translate(language, "home.title")}</h1>
    {/* Español: "Sistema de Prácticas Profesionales" */}
    {/* English: "Professional Internship System" */}
  );
}
```

### ¿Cómo Cambiar Idioma?

En la sección de Accesibilidad (`app/components/accessibility-settings.tsx`):

```typescript
const { language, setLanguage } = useAccessibility();

<button onClick={() => setLanguage("en")}>English</button>
<button onClick={() => setLanguage("es")}>Español</button>
```

El idioma se guarda en `localStorage` y persiste entre sesiones.

---

## 🎨 Sistema de Accesibilidad

**Ubicación:** `app/components/accessibility-provider.tsx`

### Parámetros Configurables

1. **Tema (Theme)**
   - `"light"` → Modo claro
   - `"dark"` → Modo oscuro
   - Se aplica agregando clase `dark` al `<html>`

2. **Idioma (Language)**
   - `"es"` → Español
   - `"en"` → English

3. **Tamaño de Fuente (FontSize)**
   - `"small"` → 14px
   - `"medium"` → 16px (por defecto)
   - `"large"` → 18px

### Almacenamiento

```typescript
localStorage.setItem("accessibility-theme", theme);
localStorage.setItem("accessibility-language", language);
localStorage.setItem("accessibility-fontSize", fontSize);
```

Al cargar la página, se restauran automáticamente:
```typescript
const theme = localStorage.getItem("accessibility-theme") || "light";
```

---

## 🛣️ Sistema de Rutas y Navegación

**Ubicación:** `app/routes.tsx` y `app/App.tsx`

### Estructura de Rutas

```typescript
<Routes>
  {/* Pública */}
  <Route path="/" element={<Login />} />
  
  {/* Protegidas */}
  <Route path="/dashboard" element={<ProtectedRoot />}>
    <Route index element={<Home />} />
    <Route path="preguntas-frecuentes" element={<FAQ />} />
    <Route path="empresas" element={<Companies />} />
    <Route path="guia" element={<Guide />} />
    <Route path="contactos" element={<Contacts />} />
    <Route path="accesibilidad" element={<AccessibilitySettings />} />
  </Route>
</Routes>
```

### Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Login | Página de inicio de sesión |
| `/dashboard` | Home | Página principal |
| `/dashboard/preguntas-frecuentes` | FAQ | Preguntas frecuentes |
| `/dashboard/empresas` | Companies | Listado de empresas |
| `/dashboard/guia` | Guide | Guía paso a paso |
| `/dashboard/contactos` | Contacts | Contactos de coordinación |
| `/dashboard/accesibilidad` | AccessibilitySettings | Configuración de accesibilidad |

### Protección de Rutas

**Componente `ProtectedRoute`:**
```typescript
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/" />;
  
  return children;
}
```

---

## 📦 Componentes Principales

### 1. **App.tsx** - Punto de entrada
Configura los Providers (contextos) principales:
```typescript
<AccessibilityProvider>  // Accesibilidad, idioma, tema
  <DatabaseProvider>     // Base de datos
    <AuthProvider>       // Autenticación
      <Routes>           // Rutas
    </AuthProvider>
  </DatabaseProvider>
</AccessibilityProvider>
```

### 2. **Login.tsx** - Autenticación
```typescript
- Formulario con matrícula y contraseña
- Validación básica
- Redirige a /dashboard si login es exitoso
```

### 3. **Home.tsx** - Panel principal
```typescript
- Avisos importantes
- Accesos rápidos
- Resumen del sistema
```

### 4. **Companies.tsx** - Listado de empresas
```typescript
- Tabla/tarjetas de empresas
- Filtros (ubicación, industria)
- Búsqueda
- Botón "Postular"
```

### 5. **FAQ.tsx** - Preguntas frecuentes
```typescript
- Filtrar por categoría
- Búsqueda
- Expandir/contraer preguntas
```

### 6. **Guide.tsx** - Guía paso a paso
```typescript
- 8 pasos del proceso
- Indicador de progreso
- Guardado automático en localStorage
```

### 7. **Contacts.tsx** - Contactos
```typescript
- Información general de la oficina
- Tarjetas de coordinadores
- Sistema de citas (calendar)
```

### 8. **AccessibilitySettings.tsx** - Configuración
```typescript
- Cambiar tema
- Cambiar idioma
- Cambiar tamaño de fuente
```

---

## 📊 Flujo de Datos (Data Flow)

```
┌─────────────────────────────────────┐
│     localStorage                    │
│  (preferencias del usuario)         │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│   Providers (Contextos)             │
│  - AccessibilityProvider            │
│  - AuthProvider                     │
│  - DatabaseProvider                 │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│   Componentes                       │
│  - Home, Companies, FAQ, etc        │
│  (usan hooks: useAccessibility,     │
│   useAuth, useDatabase)             │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│   UI Renderizado                    │
│  (HTML, CSS, Interacciones)         │
└─────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida de una Página

### Ejemplo: Página de Empresas

1. **Componente monta**
   ```typescript
   const db = useDatabase();  // Obtiene instancia de BD
   const { language } = useAccessibility();  // Obtiene idioma
   ```

2. **Obtiene datos**
   ```typescript
   const companies = db.getCompanies();  // Lee de memoria
   ```

3. **Renderiza elementos**
   ```typescript
   return companies.map(company => (
     <Card key={company.id}>
       <h3>{company.name}</h3>
       <p>{translate(language, "companies.location")}: {company.location}</p>
     </Card>
   ))
   ```

4. **Usuario interactúa**
   - Busca, filtra, postula
   - Los cambios se reflejan en tiempo real

5. **Desmonta**
   - Los datos persisten en memoria
   - Preferencias se guardan en `localStorage`

---

## 🚀 ¿Cómo Agregar Nuevas Traducciones?

### 1. Agregar clave en `translations.ts`

```typescript
export const translations = {
  es: {
    myFeature: {
      title: "Mi Título",
      description: "Mi descripción"
    },
    // ...
  },
  en: {
    myFeature: {
      title: "My Title",
      description: "My description"
    },
    // ...
  }
}
```

### 2. Usar en componente

```typescript
<h1>{translate(language, "myFeature.title")}</h1>
```

---

## 🛠️ ¿Cómo Agregar Nuevos Datos a la BD?

### En `database.ts`:

```typescript
// Agregar a mockCompanies array
export const mockCompanies: Company[] = [
  // ... existentes ...
  {
    id: '8',
    name: 'Mi Empresa',
    description: 'Descripción',
    location: 'Ciudad',
    industry: 'Tecnología',
    contactEmail: 'email@empresa.com',
    paid: true,
    positions: 3,
    hours: '40 hrs/semana',
    isActive: true,
    createdAt: '2024-02-20'
  }
];
```

---

## 📝 Resumen: Sin APIs, Todo es Local

| Aspecto | Detalles |
|--------|---------|
| **Backend** | ❌ No existe |
| **Base de Datos Externa** | ❌ No existe |
| **APIs REST** | ❌ No existen |
| **Almacenamiento** | ✅ Memoria + localStorage |
| **Autenticación** | ✅ Local (no valida realmente) |
| **Persistencia** | ✅ Parcial (solo localStorage) |
| **Traductores** | ✅ Sistema de i18n (internacionalización) |

---

## 🎯 Conclusión

Tu proyecto es un **prototipo/demostración** completamente funcional que:

✅ Simula un sistema completo de prácticas profesionales
✅ Tiene interfaz multiidioma (ES/EN)
✅ Soporta accesibilidad (temas, tamaños de fuente)
✅ Usa React Contexts para gestión de estado
✅ Todo funciona **sin necesidad de backend**
✅ Los datos están en memoria y localStorage

**Para que sea una aplicación real, necesitarías:**
- Backend (Node.js, Python, Java, etc.)
- Base de datos real (PostgreSQL, MongoDB, etc.)
- APIs REST/GraphQL
- Autenticación real (JWT, OAuth, etc.)

