# Sistema de Notificaciones - Altalaya Frontend

## 📋 Resumen

Se ha implementado un sistema completo de notificaciones en el frontend de Altalaya que se integra con el backend para manejar notificaciones en tiempo real.

## 🏗️ Arquitectura

### Tipos de Notificación

- **Like**: Cuando alguien da like a un mirador
- **Comment**: Cuando alguien comenta en un mirador
- **Follow**: Cuando alguien sigue a un usuario

### Estructura de Datos

```typescript
interface Notification {
  id: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatarUrl?: string;
  };
  type: "like" | "comment" | "follow";
  from_user: {
    id: string;
    username: string;
    name: string;
    avatarUrl?: string;
  };
  mirador?: {
    id: string;
    title: string;
    imageUrl: string;
  };
  read: boolean;
  created_at: string;
}
```

## 📁 Archivos Implementados

### Servicios

- `src/services/notifications.ts` - API endpoints para notificaciones
- `src/store/index.ts` - Estado global de notificaciones con Zustand
- `src/hooks/useNotifications.ts` - Hook personalizado para notificaciones

### Componentes

- `src/screens/NotificationsScreen.tsx` - Pantalla principal de notificaciones
- `src/Layout/NavigationBar.tsx` - Barra de navegación con badge de notificaciones
- `src/components/AuthGuard.tsx` - Inicialización automática de notificaciones
- `src/components/NotificationTest.tsx` - Componente de prueba para desarrollo

### Utilidades

- `src/utils/notifications.ts` - Funciones helper para notificaciones
- `src/types/interfaces.ts` - Tipos TypeScript actualizados

### Internacionalización

- `src/i18n/locales/es.json` - Traducciones en español
- `src/i18n/locales/en.json` - Traducciones en inglés

## 🔧 Funcionalidades

### ✅ Implementadas

1. **Listado de Notificaciones**

   - Carga automática al autenticarse
   - Pull-to-refresh
   - Estados de carga y error

2. **Gestión de Estado**

   - Marcar como leída individual
   - Marcar todas como leídas
   - Contador de no leídas
   - Persistencia local

3. **UI/UX**

   - Badge en navegación
   - Indicadores visuales de no leídas
   - Formato de tiempo relativo
   - Diseño responsive

4. **Internacionalización**
   - Soporte completo para español e inglés
   - Textos dinámicos según tipo de notificación

### 🔄 Endpoints Utilizados

```typescript
// GET /notifications
// Obtiene todas las notificaciones del usuario

// PUT /notifications/:id/read
// Marca una notificación como leída

// PUT /notifications/mark-all-read
// Marca todas las notificaciones como leídas
```

## 🚀 Uso

### Inicialización Automática

Las notificaciones se cargan automáticamente cuando el usuario se autentica:

```typescript
// En AuthGuard.tsx
useEffect(() => {
  if (isAuthenticated) {
    fetchNotifications();
  }
}, [isAuthenticated]);
```

### Hook Personalizado

```typescript
import { useNotificationsHook } from "../hooks/useNotifications";

const { notifications, unreadCount, refreshNotifications } =
  useNotificationsHook();
```

### Acciones del Store

```typescript
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../store";

// Cargar notificaciones
await fetchNotifications();

// Marcar como leída
await markNotificationAsRead(notificationId);

// Marcar todas como leídas
await markAllNotificationsAsRead();
```

## 🧪 Testing

Para probar el sistema durante desarrollo, usar el componente `NotificationTest`:

```typescript
import NotificationTest from "../components/NotificationTest";

// Agregar temporalmente a cualquier pantalla
<NotificationTest />;
```

## 🔮 Próximas Mejoras

1. **WebSocket Integration**

   - Notificaciones en tiempo real
   - Actualizaciones automáticas

2. **Push Notifications**

   - Notificaciones push nativas
   - Configuración de permisos

3. **Filtros y Búsqueda**

   - Filtrar por tipo de notificación
   - Búsqueda en notificaciones

4. **Configuración Avanzada**
   - Preferencias por tipo de notificación
   - Horarios de silencio

## 📱 Compatibilidad

- ✅ React Native
- ✅ Expo
- ✅ TypeScript
- ✅ Zustand (State Management)
- ✅ React i18next (Internacionalización)
- ✅ AsyncStorage (Persistencia)

## 🔗 Integración Backend

El sistema está diseñado para trabajar con el backend que implementa:

- Creación automática de notificaciones en:

  - `likes.service` → al dar like
  - `comments.service` → al comentar
  - `users.service` → al seguir

- Endpoints REST para gestión de notificaciones
- Estructura de datos compatible
