---
description: Fin de session — passe en revue les observations de task-observer, applique celles que Franck valide, commit si demandé.
---

# /fin — clôture de session

Suis ces étapes dans l'ordre. Ne saute aucune étape, n'en ajoute aucune.

## 1. Lister les observations de la session

Charge le skill `task-observer` s'il ne l'est pas déjà. Liste les fichiers
d'observation écrits PENDANT CETTE SESSION, en les lisant sur le disque (jamais
de mémoire) :

```bash
find "/Users/franckperrin/Desktop/Venturia/venturia-site/skill-observations/observation-log" -maxdepth 1 -name '*.md' \
  -exec grep -l -E "^date: $(date +%F)$" {} + 2>/dev/null \
  | xargs grep -l '^status: open$' 2>/dev/null
```

Croise ce résultat avec les observations que tu as effectivement écrites
pendant cette session (ids cités dans tes résumés de fin de tâche). Si
plusieurs sessions ont eu lieu aujourd'hui et qu'un fichier ne vient pas de
celle-ci, signale-le au lieu de le lister comme tien.

Affiche-les numérotées, UNE ligne par observation :

```
1. <id> — <titre court> → modification proposée : <fichier visé> : <changement en une phrase>
2. …
```

Si aucune observation n'a été écrite : dis-le (« Aucune observation pendant
cette session »), puis passe directement à l'étape 4.

## 2. S'ARRÊTER

Termine ton message par :

> Quels numéros valides-tu ? (ex. « 1, 3 », « aucun ») — et veux-tu un commit ?

N'applique RIEN, ne modifie AUCUN fichier, ne lance AUCUNE commande
d'écriture avant la réponse de Franck. Attends sa réponse.

## 3. Appliquer uniquement les numéros validés

- Applique seulement les modifications dont Franck a donné le numéro. Les
  autres restent `open` dans le journal, inchangées.
- Si une modification touche `CLAUDE.md` ou un fichier sous `.claude/skills/` :
  montre le diff (`git diff -- <fichier>`) après l'avoir appliquée.
- Marque chaque observation appliquée comme traitée, selon la procédure du
  skill task-observer (jamais en éditant l'en-tête à la main si le skill
  fournit un script).

## 4. Commit — seulement si Franck l'a validé

Si, et seulement si, Franck a demandé un commit :

```bash
git add <les fichiers modifiés à l'étape 3>
git commit -m "<message court en français>"
git push
git status -sb
```

`skill-observations/` et `skill-updates/` sont dans `.gitignore` : ne les
force jamais dans un commit. Sans accord explicite : aucun commit, aucun push.

## 5. Conclure

Termine par cette phrase exacte, seule sur sa ligne :

Tu peux taper /clear
