# Ninja Library API

Ce projet est une API CRUD permettant de gérer les **ninjas**, les **emprunts** de rouleaux de jutsus, ainsi que les **rouleaux de jutsus** eux-mêmes. L'API est construite avec Node.js et Express.js, et utilise MongoDB pour la gestion des données.

## Fonctionnalités

- **CRUD des ninjas** : Ajout, modification, récupération et suppression de ninjas.
- **CRUD des rouleaux de jutsus** : Gestion des rouleaux de jutsus (jutsuScrolls).
- **CRUD des emprunts** : Gestion des emprunts des rouleaux par les ninjas.
- **Sécurité** : Mise en place de plusieurs mesures de sécurité (validation des entrées, gestion des erreurs, protection contre les injections NoSQL, etc.).
- **Documentation API** : Utilisation de Swagger pour générer la documentation à l'adresse [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
- **Pagination, tri et filtrage** : Support pour paginer, trier et filtrer les résultats dans les requêtes GET (pour les ninjas).
- **Système de gestion d'erreurs** : Toutes les erreurs sont gérées globalement dans le middleware `errorHandler`.
- **Système de versioning** : L'API est versionnée (v1), permettant une extension future vers une v2 sans affecter l'existant.

---

## Installation et Exécution

1. **Cloner le projet** :
    ```
   git clone https://github.com/ClaudioEnsitech/Ninjas_project.git
   cd <Emplacement de votre projet>
    ``` 
2. **Installer les dépendances** :
    ```
    npm install
    ```
3. **Configurer MongoDB** : Par défaut, l'API se connecte à une base MongoDB locale via `mongodb://localhost:27017/ninja_library`. Vous pouvez modifier cette configuration dans le fichier `config/database.js`.

4. **Exécuter le serveur**:
    ```
    npm start
    ```

L'API sera disponible sur http://localhost:3000.


## Structure des Données

Voici les structures de données que vous pouvez utiliser pour tester les différentes fonctionnalités de l'API.

1. **Ninjas**

Exemple JSON pour créer un ninja :

```
{
  "name": "Madara Uchiha",
  "rank": "Kage",
  "jutsus_maîtrisés": [
    "Rinnegan", 
    "Susanoo",
    "Fire Style: Fireball Jutsu"
  ],
  "clan": "Uchiha",
  "spécialité": "Ninjutsu"
}
```

2. **Rouleau de jutsus (Jutsu Scrolls)**

Exemple JSON pour créer un rouleau de jutsu :

```
{
  "nom": "Limbo: Border Jail",
  "créateur": "Madara Uchiha",
  "rang": "S",
  "quantité": 3,
  "description": "Une technique qui permet de créer des clones invisibles qui attaquent l'adversaire.",
  "catégorie": "Ninjutsu",
  "techniques_associées": [
    "Limbo: Holding"
  ]
}
```
3. **Emprunts**

Exemple JSON pour créer un emprunt :

```
{
  "ninjaId": "651fc12909d6ac0012345678",
  "jutsuScrollId": "652fc12909d6ac0012345678",
  "dateEmprunt": "2024-09-27T13:10:27.834Z",
  "dateRetourPrévue": "2024-10-04T13:10:27.834Z",
  "statut": "En cours",
  "notes": "Emprunt pour la formation"
}
```
***

## Sécurité et Validation

1. **Gestion des erreurs** : Les erreurs sont capturées et renvoyées sous forme de réponse JSON détaillée grâce au middleware `errorHandler` situé dans `middleware/errorHandler.js`.

2. **Validation des données** : La validation et la sanitization des entrées utilisateurs sont gérées avec la bibliothèque **Joi**. Chaque entrée est validée avant d'être insérée dans la base de données, ce qui garantit l'intégrité des données. 

3. **Sécurité** : 
* **Protection contre les injections NoSQL** : Utilisation de `express-mongo-sanitize` pour nettoyer les entrées et empêcher les injections NoSQL. 
* **Rate Limiting** : Un **limiteur de requêtes** est mis en place pour prévenir les abus en limitant les requêtes par utilisateur. 
* **Swagger** : La documentation interactive de l'API est disponible à l'adresse [http://localhost:3000/api\-docs](http://localhost:3000/api-docs).


## API CRUD (Ninjas, Emprunts, Rouleaux de Jutsus) 

Toutes les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sont disponibles pour les ninjas, les rouleaux de jutsus et les emprunts. 

### Exemples de Routes : 
* **GET** `/api/v1/ninjas` : Récupérer tous les ninjas. 
* **POST** `/api/v1/ninjas` : Créer un nouveau ninja. 
* **PUT** `/api/v1/ninjas/:id` : Mettre à jour un ninja existant. 
* **DELETE** `/api/v1/ninjas/:id` : Supprimer un ninja. De la même manière, vous pouvez gérer les **emprunts** et les **rouleaux de jutsus**.

## Gestion des Versions 

L'API est versionnée avec un préfixe `v1` dans les routes. Cela permet d'introduire une nouvelle version (`v2`, etc.) à l'avenir sans perturber les fonctionnalités de la version précédente. 
Par exemple : 
* **Ninjas** : `/api/v1/ninjas` 
* **Emprunts** : `/api/v1/emprunts` 
* **Rouleaux de Jutsus** : `/api/v1/jutsuScrolls`

## À Tester 

Voici quelques suggestions pour tester l'API : 

1. **Créer un ninja** : Utiliser le JSON des ninjas dans un outil comme Postman. 

2. **Créer un rouleau de jutsus** : Ajouter un rouleau avec le JSON fourni. 

3. **Créer un emprunt** : Emprunter un rouleau pour un ninja. 

4. **Consulter la documentation** : Ouvrir [http://localhost:3000/api\-docs](http://localhost:3000/api-docs) pour visualiser et tester l'API via Swagger.

\
\
Si vous avez des questions ou souhaitez des informations supplémentaires sur certains aspects du projet, n'hésitez pas à demander.

---

Profitez de l'exploration du monde des ninjas et jutsus avec cette API ! 🥷📜








