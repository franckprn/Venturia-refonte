# Provenance des skills

Tous copiés depuis un clone relu (SKILL.md, references/, scripts/) le
2026-10-25. Pour mettre à jour : recloner, relire le diff, recopier, mettre à
jour cette table.

| Skill (dossier) | Dépôt | Commit | Date | Modifications locales |
|---|---|---|---|---|
| emil-design-eng | github.com/emilkowalski/skills (`skills/emil-design-eng`) | `2d228630ba1446365f614a108cb8252f1feda202` | 2026-10-25 | LICENSE ajoutée |
| gsap-core, gsap-frameworks, gsap-performance, gsap-plugins, gsap-react, gsap-scrolltrigger, gsap-timeline, gsap-utils | github.com/greensock/gsap-skills (`skills/`) | `aed9cfd3277740755f6bfc1155c7aa645403b760` | 2026-10-25 | LICENSE du dépôt copiée dans `gsap-core/LICENSE.gsap-skills` |
| web-design-guidelines | github.com/vercel-labs/agent-skills (`skills/web-design-guidelines`) | `063bee94c3f4df8453406c830b0a7df0f2860278` | 2026-10-25 | SKILL.md réécrit pour lire `command.md` en local, plus aucune lecture distante |
| web-design-guidelines/command.md | github.com/vercel-labs/web-interface-guidelines (`command.md`) | `434b7f91364665f2f733b310ec54809bf8f37937` | 2026-10-25 | Aucune (copie à l'identique, LICENSE en `LICENSE.guidelines`) |
| ui-ux-pro-max | github.com/nextlevelbuilder/ui-ux-pro-max-skill (`.claude/skills/ui-ux-pro-max`) | `d14efff8ed1faa4187f004f79926f428c8074ec7` | 2026-10-25 | Chemins `${CLAUDE_PLUGIN_ROOT}/…` remplacés par `$(git rev-parse --show-toplevel)/…` et `python` par `python3` dans SKILL.md ; LICENSE ajoutée |
| task-observer | github.com/rebelytics/one-skill-to-rule-them-all (racine : SKILL.md, references/, scripts/, LICENSE) | `ac00bed07526475a6679a3dc018e145f5e0a672f` | 2026-10-25 | Aucune ; bloc d'activation (template v3.8.0) ajouté à CLAUDE.md |
| design-taste-frontend | Taste (Leonxlnx), ancienne version à curseurs — déjà présente, commitée dans `7968ed8` (2026-09-11) | inconnu (non tracé à l'époque) | 2026-09-11 | Aucune sur `shell-fluide-et-suite` ; curseurs 8/4/3 réglés sur la branche `ab-taste` uniquement (non commité) |

Non installés ici (test A/B, worktrees `~/Dev/venturia-ab-*`, non commités) :

| Skill | Dépôt | Commit |
|---|---|---|
| impeccable | github.com/pbakaus/impeccable (`.claude/skills/impeccable`) | `936867543ac2576920d663cc9803597f6044f3ac` — dossier seul : lanceur, binaire, hooks et mode live interdits |
