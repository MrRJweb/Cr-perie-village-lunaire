# Le Bistro Indien — site web

Site vitrine bilingue (FR ⇄ EN) pour **Le Bistro Indien**, un bistro indien
authentique au cœur du Village, à Montréal. / Bilingual marketing site for
Le Bistro Indien, an authentic Indian bistro in Montréal's Village.

Design chaleureux et haut de gamme inspiré d'Amrit Palace : charbon foncé, or,
crème · serifs Playfair Display + sans Jost · animations calmes et cinématiques.

## Lancer / Run

Fichier unique, sans dépendance ni étape de build — ouvrez `index.html`, ou :

```bash
python3 -m http.server 8000   # puis / then visit http://localhost:8000
```

## Points clés / Highlights

- **Une seule page, un seul fichier** : HTML + CSS + JS en ligne, zéro framework.
- **Bilingue FR/EN** : bascule dans la navbar et le pied de page ; français par
  défaut, détection de `navigator.language` (`en-*` → anglais) ; `<html lang>` et
  `hreflang` mis à jour sans rechargement (Loi 96 / Québec).
- **Commande d'abord** : les CTA « Commander » ouvrent un sélecteur Uber Eats ·
  DoorDash · SkipTheDishes ; téléphone cliquable partout.
- **Contenu réel** : NAP identique sur tout le site, menu et prix réels
  (certains marqués `[[confirm]]`), signaux de confiance honnêtes et modifiables.
- **Sections** : navbar collante · héros · à propos · plats signature · menu à
  onglets · galerie + lightbox · ouvert tard/Village · avis (carrousel) ·
  réservation + contact · heures & carte · pied de page.
- **Accessibilité (WCAG AA)** : repères sémantiques, navigation clavier
  (onglets/carrousel/lightbox), focus visibles or, `prefers-reduced-motion`.
- **SEO** : JSON-LD `Restaurant`, meta + Open Graph/Twitter, hreflang, images
  `loading="lazy"` avec dimensions.

## Modifier le contenu / Editing content

Tout le contenu modifiable par le client est regroupé en **constantes de
configuration en haut du `<script>`** dans `index.html` :

| Constante | Contenu |
| --- | --- |
| `CONFIG` | Téléphone, liens de commande (Uber Eats / DoorDash / Skip), note & preuve sociale (honnêtes, modifiables) |
| `I18N` | Toutes les chaînes visibles, en FR et EN |
| `DISHES` | Les 6 plats signature (nom FR/EN, description, prix, image) |
| `MENU` | Catégories et items du menu (nom FR/EN, description, prix, étiquettes 🌱/🌶/Halal) |
| `REVIEWS` | Témoignages (citation FR/EN, prénom, plateforme) |
| `GALLERY` | Images de la galerie |
| `HOURS` / `DAYS` | Heures d'ouverture (jour courant surligné automatiquement) |

## À faire avant la mise en ligne / Before going live — `[[MR.RJ]]`

- Coller les **vraies URL** de commande Uber Eats / DoorDash / Skip dans `CONFIG.order`.
- Confirmer les **prix** marqués `[[confirm]]` / `[[$]]` et le statut **halal**
  (ajouter `'halal'` aux `tags` d'un item pour afficher le badge).
- Brancher les formulaires (réservation + contact) à Formspree / Web3Forms /
  Netlify Forms — actuellement en démonstration front-end (aucun envoi).
- Remplacer les images Unsplash par de vraies photos du restaurant.
- Mettre à jour l'URL canonique et les valeurs de `AggregateRating` (JSON-LD)
  avec des chiffres honnêtes.

## Coordonnées / NAP

**Le Bistro Indien** · 926 Rue Sainte-Catherine E, Montréal, QC H2L 2E5 ·
+1 (514) 315-3005 · Instagram [@le.bistro.indien](https://www.instagram.com/le.bistro.indien/)
Sun–Thu 11:00–23:00 · Fri–Sat 11:00–03:00
