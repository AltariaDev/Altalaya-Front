# Types Centralisés - Altalaya Frontend

Ce dossier contient tous les types TypeScript centralisés pour l'application Altalaya.

## Structure

```
src/types/
├── interfaces.ts  # Tous les types organisés par catégorie
├── index.ts       # Export centralisé
└── README.md      # Cette documentation
```

## Organisation des Types

### 🔐 Authentication Types

- `LoginData` - Données de connexion
- `RegisterData` - Données d'inscription
- `AuthResponse` - Réponse d'authentification

### 👤 User Types

- `User` - Modèle utilisateur complet
- `UpdateProfileData` - Données de mise à jour du profil
- `FollowData` - Données de suivi
- `UserSearchParams` - Paramètres de recherche d'utilisateurs

### 🏔️ Mirador Types

- `Mirador` - Modèle mirador principal
- `MiradorType` - Type legacy (deprecated)
- `CreateMiradorData` - Données de création de mirador
- `UpdateMiradorData` - Données de mise à jour de mirador

### 💬 Comment Types

- `Comment` - Modèle commentaire
- `CreateCommentData` - Données de création de commentaire

### 🔔 Notification Types

- `Notification` - Modèle notification
- `NotificationUser` - Utilisateur de notification
- `NotificationPost` - Post de notification

### 🔍 Search & Pagination Types

- `PaginationParams` - Paramètres de pagination
- `SearchParams` - Paramètres de recherche
- `NearbyParams` - Paramètres de recherche proche
- `PaginatedResponse<T>` - Réponse paginée générique
- `SearchType` - Type de recherche ("miradores" | "users")

### 📤 Upload Types

- `UploadResponse` - Réponse d'upload

### 📍 Location Types

- `LocationState` - État de localisation
- `UseLocationReturn` - Retour du hook useLocation

### 🧩 Component Props Types

Tous les props des composants sont centralisés ici :

- `AuthGuardProps`
- `ModalProps`
- `AnimatedButtonProps`
- `SkeletonLoaderProps`
- Et bien d'autres...

### ⚙️ Settings Types

- `SettingItem` - Élément de paramètre
- `SettingSection` - Section de paramètres

### 🏪 Store Types

- `AppState` - État global de l'application
- `AuthState` - État d'authentification
- `UserStore` - Store utilisateur
- `MiradoresState` - Store miradores

### 🛠️ Utility Types

- `ErrorInfo` - Informations d'erreur
- `WebSocketMessage` - Message WebSocket
- `WebSocketCallbacks` - Callbacks WebSocket

## Utilisation

### Import des Types

```typescript
// Import d'un type spécifique
import { User, Mirador } from "@/types";

// Import de plusieurs types
import { LoginData, RegisterData, AuthResponse } from "@/types";

// Import de tous les types (non recommandé)
import * as Types from "@/types";
```

### Bonnes Pratiques

1. **Toujours importer depuis `@/types`** au lieu de définir des interfaces locales
2. **Utiliser des interfaces locales uniquement** pour les types spécifiques à un composant qui ne sont pas réutilisables
3. **Organiser les types par catégorie** dans `interfaces.ts`
4. **Documenter les types complexes** avec des commentaires

### Migration

Si vous trouvez des interfaces locales dans le code :

1. Vérifiez si le type existe déjà dans `@/types`
2. Si non, ajoutez-le dans la section appropriée de `interfaces.ts`
3. Remplacez l'interface locale par un import
4. Supprimez l'interface locale

### Exemple de Migration

**Avant :**

```typescript
// Dans un composant
interface UserCardProps {
  user: User;
  onPress: () => void;
}
```

**Après :**

```typescript
// Dans interfaces.ts
export interface UserCardProps {
  user: User;
  onPress: () => void;
}

// Dans le composant
import { UserCardProps } from "@/types";
```

## Maintenance

- Ajoutez de nouveaux types dans la section appropriée de `interfaces.ts`
- Maintenez l'organisation par catégorie
- Mettez à jour cette documentation quand vous ajoutez de nouveaux types
- Utilisez des noms descriptifs et cohérents pour les types
