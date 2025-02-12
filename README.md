
# 🚧 Projet en Développement 🚧

⚠️ **Attention :** Ce code est encore brouillon, car je suis en plein développement. Des changements fréquents et des bugs sont à prévoir.

## 📦 Technologies utilisées
- [Electron](https://www.electronjs.org/) ⚡
- [React](https://react.dev/) (dans `/src/renderer`) ⚛️

## 🚀 Build du projet

### 1️⃣ Build de l'interface utilisateur (React)
Avant de générer l'application Electron, il faut d'abord compiler le projet React :

```sh
cd src/renderer
npm install
npm run build
```

### 2️⃣ Build de l'application Electron
Une fois le build React terminé, revenez à la racine du projet et générez l'application Electron :

```sh
cd ../../
npm install
npm run build
```

## 🛠️ Développement en cours
Ce projet est en cours d'amélioration et d'optimisation. N'hésitez pas à signaler les problèmes ou à proposer des suggestions ! 🚀

## 📜 Licence

Ce projet est proposé sous une **double licence** :

### 1. Licence pour usage non commercial  
**MIT License avec Commons Clause (Usage Non Commercial)**

```markdown
MIT License avec Commons Clause (Usage Non Commercial)

Copyright (c) 2025 

Permission est accordée, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de l'utiliser, le copier, le modifier, le fusionner, le publier, le distribuer, le sous-licencier et/ou le vendre, sous réserve des conditions suivantes :

-----------------------------
Commons Clause : Le Logiciel est fourni exclusivement pour un usage non commercial. Toute utilisation à des fins commerciales, notamment la vente du Logiciel ou son intégration dans un produit à but lucratif, est strictement interdite sans l'obtention préalable d'une licence commerciale distincte auprès du Concédant.
-----------------------------

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPLICITE OU IMPLICITE, NOTAMMENT SANS LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU TITULAIRES DU COPYRIGHT NE POURRONT ÊTRE TENUS RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QU'IL SOIT CONTRACTUEL, DÉLICTUEL OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC, L'UTILISATION OU LA PERFORMANCE DU LOGICIEL.
```
