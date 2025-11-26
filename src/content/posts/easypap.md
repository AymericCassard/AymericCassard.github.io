---
title: 'EasyPap - Jeu de la vie'
description: "De janvier a mai 2024, j'ai travaillé sur une modélisation du jeu de la vie de Conway via EasyPaP, un logiciel développé par des enseignants de l'université de de Bordeaux ayant pour but de faciliter l'enseignement de développement de code optimisé et parallèle."
pubDate: 2025-05-31
author: 'Aymeric Cassard'
tags: []
---

De janvier a mai 2024, j'ai travaillé sur une implementation a haute performances du jeu de la vie de Conway via le logiciel EasyPap. Ce projet fut une bonne porte d'entrée pour mettre en pratique les techniques d'optimisation de code vues en cours (OpenMP, MPI, OpenCL, instructions SIMD...).

Le <a href="https://fr.wikipedia.org/wiki/Jeu_de_la_vie">jeu de la vie de Conway</a> simule une forme très basique d’évolution d’un ensemble de cellules en partant de deux principes simples : pour pouvoir vivre, il faut avoir des voisins; mais quand il y en a trop, on étouffe.

<figure>
  <img style="margin-left: 30px" src="/img/easypap/glider.gif" alt="Jeu de la vie en action">
  <figcaption>
    <p>Le jeu de la vie en action dans EasyPap, ici une configuration de cellules connue: le glider</p>
  </figcaption>
</figure>

## Règles

Le monde est ici un grand damier de cellules vivantes ou mortes, chaque cellule étant entourée par huit voisines. Pour faire évoluer le monde on découpe le temps en étapes discrètes et, pour passer d’une étape à la suivante, on compte pour chaque cellule le nombre de cellules vivantes parmi ses huit voisines puis on applique les règles suivantes :

* Une cellule morte devient vivante si elle a exactement 3 cellules voisines vivantes autrement elle reste morte. 
* Une cellule vivante reste vivante si elle est entourée de 2 ou 3 cellules vivantes — autrement elle meurt.

Cet ensemble de règles est communément appelé « **B3/S23** » (BIRTH if 3 neighbors / SURVIVE if 2 or 3 neighbors). 
La simulation est synchrone : à chaque étape, l’état d’une cellule dépend uni-
quement des états de ses voisines à l’étape précédente.

## EasyPap

<a href="https://gforgeron.gitlab.io/easypap/">EasyPap</a> est un logiciel developpé par des enseignants chercheurs de l'Université de Bordeaux, ayant pour but de faciliter la visualisation de performances de programmes parallèles. Il offre une interface graphique permettant de facilement vérifier si son algorithme est correct.
Une version du jeu de la vie séquentielle était déjà incluse dans le logiciel, l'objectif ici n'étant pas de développer le jeu de la vie, mais d'optimiser ce code existant pour en ameliorer les performances.

## Optimisations

La parallélisation du jeu de la vie obéit aux règles d'un stencil 2D classique, ce qui permet d'appliquer des méhodes de parallélisation du calcul, sur plusieurs coeurs CPU, ou même sur GPU.
Des optimisations d'instructions et algorithmiques ont aussi été mises en place.

### Parallélisation du code via OpenMP

La première optimisation fut d'utiliser les instructions OpenMP pour repartir les zones de calculs entre les différents coeurs de la machine

### Instructions SIMD

### Parallélisation du code via MPI

### Parallélisation du code via OpenCL
