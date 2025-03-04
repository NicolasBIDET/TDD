# Poker Hand Evaluation

Ce projet implémente une évaluation des mains de poker en TypeScript, permettant de comparer différentes mains et de déterminer la main gagnante. Les tests sont réalisés avec Jest pour assurer la qualité du code.

## Table des matières

- [Installation](#installation)
- [Exécution des tests](#exécution-des-tests)
- [Fonctionnalités](#fonctionnalités)
- [Créateur](#créateur)

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
npm ci
```

Cela installera toutes les dépendances du projet spécifiées dans le fichier package-lock.json, garantissant une installation cohérente de toutes les versions des paquets.

## Exécution des tests

Pour exécuter les tests avec Jest, utilisez la commande suivante :

```bash
npm test
```

Jest s'occupera de lancer les tests unitaires et d'afficher un rapport sur le succès ou l'échec des tests.

## Fonctionnalités

Le projet inclut les fonctionnalités suivantes :

- Évaluation des mains de poker : Évalue et classe les mains en fonction de leur type (par exemple, "High Card", "Pair", "Full House", etc.).
- Comparaison de mains : Compare deux mains de poker pour déterminer laquelle est la meilleure.
- Tests avec Jest : Tests unitaires pour vérifier le bon fonctionnement des différentes fonctions.


Les combinaisons prises en charge sont :

- High Card
- One Pair
- Two Pair
- Three of a Kind
- Straight
- Flush
- Full House
- Four of a Kind
- Straight Flush
- Royal Flush

Les tests permettent également de valider les différents scénarios, y compris les égalités.

## Créateur

Ce projet a été développé par Nicolas BIDET