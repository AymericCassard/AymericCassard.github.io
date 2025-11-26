---
title: 'Firstbot'
description: 'Entre le 23/09 et le 03/10, j’ai participé au projet Firstbot à l’ENSEIRB, au cours duquel j’ai pu apprendre à concevoir un robot complet, de la structure mécanique à la partie embarquée, en groupe avec des élèves ingénieurs.'
pubDate: 2025-10-03
author: 'Aymeric Cassard'
tags: []
---

Les ressources ainsi que les consignes sont disponibles en <a href="https://gregwar.com/firstbot/">ligne</a>

Les objectifs du projet furent:

* **Suivi de ligne** : le robot doit être capable de suivre une ligne colorée et d’enchaîner automatiquement sur la suivante une fois la fin du tracé atteinte.
* **Navigation vers une position donnée** : à partir d’une position initiale connue, le robot doit se déplacer pour atteindre une position et une orientation cibles exprimées en mètres et radians.
* **Odométrie** : le robot doit estimer sa position et son orientation à partir des données de ses servomoteurs, après avoir été déplacé manuellement.
* **Cartographie** : à l’issue du suivi de ligne, le robot doit générer une carte vue du dessus représentant le parcours suivi.

## Mécanique du robot

La premiere etape du projet fut d’assembler les differents elements pour obtenir un robot roulant, voici la liste des differents elements que nous avions :
* 2 servomoteurs dynamixels
* Raspberry pi 3 modele B
* Lipo 3s 11.1v 4000mah
* Camera Logitech 720p

Il a donc fallu assembler un chassis pouvant supporter tous ces elements. Le Fablab de l’Enseirb met a disposition des imprimantes 3d, ainsi qu’une decoupeuse laser.
Nous avons modelise ces differentes pieces en utilisant le logiciel de CAD collaboratif en ligne Onshape.

### Vue du modèle sur Onshape

![Vue de face du modèle](/img/firstbot/onshape_front.png)
![Vue de côté du modèle](/img/firstbot/onshape_side.png)

Le grand pied de camera est legerement excentre, pour centrer l’objectif avec le centre du robot.
Le pied arriere touche le sol et fournit de l’appui au robot lorsqu’il roule, pour cette raison de la feutrine a etee attachee.
La plaque principale du chassis est du bois composite decoupe par decoupeuse laser.
Les autres elements ont ete imprime en 3d.

## Suivi de ligne

La partie du projet sur lequel j’ai travaille fut le suivi de ligne du robot et sa correction de trajectoire.
Le trajet est constitue de 3 parcours, represente par du scotch de couleurs differentes, avec differents niveaux de difficulte, jaune le plus facile, bleu moyen et rouge difficile.

![Scotch rouge](/img/firstbot/rouge1.png)
![Scotch jaune](/img/firstbot/jaune1.png)
![Scotch bleu](/img/firstbot/bleu1.png)
![Parcours entier](/img/firstbot/parcours.png)

Pour realiser cela, le travail a ete decoupe en 3 e’tapes, d’abord identifier la ligne sur l’image.
Des plages HSV ont ete definies pour chaque couleur, si un pixel de l’image est dans la plage, alors il est compte comme etant de la couleur. 
Ensuite, les pixels de chaque couleurs sont comptes, et une position moyenne du pixel de couleur est determinee dans l’image, sur un axe x.
La difference entre la valeur x de ce point moyen et le centre de l’image est ensuite utilisee comme fonction de correction et directement envoye au servomoteurs pour suivre le trace.
Un gain proportionnel (kp) a ete determine par tatonnement.
Le code est disponible dans un <a href="https://github.com/AymericCassard/firstbot_g4">depot github</a>.
L’utilisation des plages HSV est visible dans le fichier final/couleur.py et son utilisation dans la fonction de correction de trajectoire est dans le fichier final/suivi_ligne.py
La description haut niveau de l'algorithme est la suivante:<br>
Suivre la ligne jaune > detecter le marron > suivre la ligne bleue > detecter le marron > suivre la ligne rouge

### Difficultes rencontrees

**Detection de la couleur marron**: Nous avons eu beaucoup de mal a trouver une plage qui correspondait a la couleur marron. Cela semblait etre cause par la difference de couleur percue du au changement de luminosite durant la journee, et le probleme etait accentue par la distance elevee de la camera avec le sol.

**Comportement lorsque l’on ne detecte aucune ligne sur l’image**: ce qui arrive lorsque l’on est dans un virage assez serre. Dans ce cas nous avons mis en place une rotation sur soi-meme assez lente, en se dirigeant vers la derniere position de ligne detectee

### Résultats

Le suivi de ligne s’est averé plutot fiable, parfois le robot perdait la ligne durant certains virages, mais tourner sur soi meme permettait de retrouver le trajet dans la plupart des cas.

Le trajet rouge a ete un echec par contre, car le robot percevait dans sa camera un bout du trajet suivant ce qui le faisait « derailler » et partir trop en avance sur le trajet.

Cropper le centre de l’image permettait de resoudre ce probleme, mais dans ce cas le suivi etait trop difficile dans certains virages.
La detection hasardeuse du marron a aussi entraine le fait de coder un changement de trajet manuel au lieu d’automatique.
