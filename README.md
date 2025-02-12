
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

Copyright (c) [Année] [Votre Nom]

Permission est accordée, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), de l'utiliser, le copier, le modifier, le fusionner, le publier, le distribuer, le sous-licencier et/ou le vendre, sous réserve des conditions suivantes :

-----------------------------
Commons Clause : Le Logiciel est fourni exclusivement pour un usage non commercial. Toute utilisation à des fins commerciales, notamment la vente du Logiciel ou son intégration dans un produit à but lucratif, est strictement interdite sans l'obtention préalable d'une licence commerciale distincte auprès du Concédant.
-----------------------------

LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPLICITE OU IMPLICITE, NOTAMMENT SANS LES GARANTIES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU TITULAIRES DU COPYRIGHT NE POURRONT ÊTRE TENUS RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGE OU AUTRE RESPONSABILITÉ, QU'IL SOIT CONTRACTUEL, DÉLICTUEL OU AUTRE, DÉCOULANT DE, OU EN RELATION AVEC, L'UTILISATION OU LA PERFORMANCE DU LOGICIEL.
```

### 2. Licence commerciale  
**Accord de Licence Commerciale pour [Nom du Projet]**

```markdown
Accord de Licence Commerciale pour [Nom du Projet]

Copyright (c) [Année] [Votre Nom]

Cet Accord de Licence Commerciale ("Accord") est conclu entre [Votre Nom] (le "Concédant") et l'entité ou la personne ("Licencié") qui obtient une copie du Logiciel. En utilisant le Logiciel à des fins commerciales, le Licencié accepte d'être lié par les termes du présent Accord.

1. **Octroi de licence**  
   Sous réserve du respect par le Licencié des termes du présent Accord, le Concédant accorde au Licencié une licence non-exclusive, non-transférable, pour utiliser, modifier, distribuer et intégrer le Logiciel dans des produits commerciaux.

2. **Modalités financières**  
   L'utilisation commerciale du Logiciel est soumise au paiement d'une redevance de licence, dont le montant et les conditions seront définis au cas par cas dans un avenant écrit à cet Accord.

3. **Restrictions**  
   Le Licencié s'engage à ne pas redistribuer ou sous-licencier le Logiciel à des tiers sans l'accord écrit préalable du Concédant.

4. **Exclusion de garantie**  
   LE LOGICIEL EST FOURNI "TEL QUEL", SANS AUCUNE GARANTIE, EXPLICITE OU IMPLICITE.

5. **Limitation de responsabilité**  
   EN AUCUN CAS, LE CONCÉDANT NE POURRAIT ÊTRE TENU RESPONSABLE DE TOUT DOMMAGE DIRECT, INDIRECT, ACCESSOIRE, SPÉCIAL OU CONSÉCUTIF DÉCOULANT DE L'UTILISATION OU DE L'INCAPACITÉ D'UTILISER LE LOGICIEL.

Pour obtenir une licence commerciale, merci de contacter : srko.dj@gmail.com.
```
