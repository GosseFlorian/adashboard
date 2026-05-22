# Adashboard

Un tableau de bord personnel pour suivre sa progression dans l'apprentissage de compétences techniques. Les compétences sont organisées par thèmes (JavaScript, React, PostgreSQL, etc.) et peuvent être marquées comme acquises ou en cours.

## Aperçu

Adashboard est une application fullstack permettant de :

- Visualiser ses compétences regroupées par thème sous forme de cartes
- Ajouter de nouvelles compétences à un thème existant
- Marquer une compétence comme acquise ou non (toggle)
- Supprimer une compétence
- Suivre sa progression grâce à une barre de progression par thème

## Stack technique

**Frontend**

- React 19 + Vite
- TypeScript
- Zustand (gestion d'état global)
- @ramonak/react-progress-bar

**Backend**

- Node.js + Express 5
- TypeScript (exécution via `tsx`)
- PostgreSQL (driver `pg`)
- dotenv, cors

## Structure du projet

```
adashboard/
├── backend/
│   ├── controllers/
│   │   ├── skills.controller.ts
│   │   └── themes.controller.ts
│   ├── db/
│   │   └── client.ts
│   ├── routes/
│   │   ├── skills.routes.ts
│   │   └── themes.routes.ts
│   ├── SQL/
│   │   ├── db_up.sql     # Création des tables
│   │   └── seed.sql      # Données initiales
│   ├── types.ts
│   └── index.ts
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── card-list/
    │   │   ├── cards/
    │   │   ├── form-add-skills/
    │   │   ├── skills/
    │   │   └── skills-list/
    │   ├── types.ts
    │   └── App.tsx
    └── store/
        └── useAppStore.ts
```

## Prérequis

- Node.js ≥ 18
- PostgreSQL ≥ 14
- npm

## Installation et lancement

### 1. Base de données

Créer une base de données PostgreSQL, puis exécuter les scripts SQL dans l'ordre :

```sql
-- Création des tables
\i backend/SQL/db_up.sql

-- Données de départ (optionnel)
\i backend/SQL/seed.sql
```

### 2. Backend

```bash
cd backend
```

Créer un fichier `.env` à la racine du dossier `backend` :

```env
PORT=3000
PGHOST=localhost
PGPORT=5432
PGUSER=votre_utilisateur
PGPASSWORD=votre_mot_de_passe
PGDATABASE=votre_base
```

Installer les dépendances et démarrer :

```bash
npm install
npm run dev
```

Le serveur écoute sur `http://localhost:3000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Scripts disponibles

**Backend**

| Commande        | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `npm run dev`   | Lance le serveur avec rechargement automatique (`tsx watch`) |
| `npm run build` | Compile le projet en JavaScript dans `dist/`                 |
| `npm start`     | Lance le JS compilé (production)                             |

**Frontend**

| Commande        | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Lance le serveur de développement Vite |
| `npm run build` | Compile le projet pour la production   |

## API

### Thèmes

| Méthode | Route       | Description               |
| ------- | ----------- | ------------------------- |
| GET     | /themes     | Récupérer tous les thèmes |
| GET     | /themes/:id | Récupérer un thème        |
| POST    | /themes     | Créer un thème            |
| PATCH   | /themes/:id | Modifier un thème         |
| DELETE  | /themes/:id | Supprimer un thème        |

### Compétences

| Méthode | Route       | Description                      |
| ------- | ----------- | -------------------------------- |
| GET     | /skills     | Récupérer toutes les compétences |
| GET     | /skills/:id | Récupérer une compétence         |
| POST    | /skills     | Ajouter une compétence           |
| PATCH   | /skills/:id | Modifier une compétence          |
| DELETE  | /skills/:id | Supprimer une compétence         |

> La suppression d'un thème entraîne la suppression en cascade de ses compétences associées.

## Perspectives d'amélioration

- Ajout de boutons pour créer et supprimer des thèmes directement depuis l'interface
