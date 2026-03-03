---
title: "Comment formater un CV compatible ATS : structure, polices et modèle"
description: "Guide pratique pour créer un CV au format compatible ATS : choix du fichier, structure des sections, polices recommandées et éléments à éviter."
date: "2026-03-03"
translationKey: "ats-format"
tags: ["ATS", "CV", "format", "mise en page", "modèle"]
---

## Pourquoi le format est aussi important que le contenu

Vous avez les bonnes compétences, les bonnes expériences, les bons mots-clés — et pourtant votre CV est rejeté. Le coupable ? Son format.

Avant d'analyser le contenu de votre CV, un ATS doit d'abord **extraire sa structure** : identifier les sections, parser les dates, isoler les compétences. Si cette première étape échoue à cause d'un format incompatible, le contenu — aussi pertinent soit-il — n'est jamais analysé.

Pour comprendre en détail comment fonctionne ce processus de parsing, consultez [notre guide complet sur les CV ATS](/blog/cv-ats-guide-complet).

## Le format de fichier idéal

### Word (.docx) vs PDF : lequel choisir ?

| Critère | .docx | PDF texte | PDF scanné |
|---------|-------|-----------|------------|
| **Compatibilité ATS** | Excellente | Très bonne | Aucune |
| **Préservation mise en page** | Variable selon la version de Word | Parfaite | N/A |
| **Universel** | Nécessite Word/compatible | Tout appareil | N/A |
| **Recommandation** | Si l'offre le demande | Choix par défaut | À éviter absolument |

**Notre recommandation :** Le PDF texte est le meilleur compromis. Il préserve votre mise en page et est lu par 95 % des ATS du marché. Si l'offre demande explicitement un .docx, fournissez-le.

**Le test du PDF texte :** Ouvrez votre PDF → Ctrl+A (tout sélectionner) → Ctrl+C (copier) → collez dans le Bloc-notes. Si le texte apparaît proprement et dans le bon ordre, votre PDF est compatible.

### Encodage et nommage du fichier

- **Encodage :** Sauvegardez toujours en UTF-8 pour garantir la bonne lecture des accents et caractères spéciaux.
- **Nom du fichier :** Utilisez un format clair et professionnel : `Prenom_Nom_CV.pdf`. Évitez les espaces, les accents dans le nom de fichier et les noms génériques comme `CV_final_v3.pdf`.

## La structure idéale d'un CV compatible ATS

### L'ordre des sections recommandé

1. **Informations de contact** — Nom, email, téléphone, ville, LinkedIn (dans le corps du document, jamais en en-tête Word)
2. **Titre du poste visé** — Reprenez l'intitulé exact de l'offre
3. **Résumé professionnel** — 3-4 lignes synthétisant votre valeur ajoutée avec les mots-clés principaux
4. **Compétences** — Liste groupée par catégorie
5. **Expérience professionnelle** — Ordre antéchronologique
6. **Formation** — Diplômes, Grandes Écoles, Titres RNCP
7. **Certifications** — PMP, AWS, Google, TOEIC…
8. **Langues** — Avec niveau (B2, C1, bilingue)

### Ce qui doit figurer dans chaque section

**Expérience professionnelle** — Pour chaque poste :
```
Intitulé du poste | Nom de l'entreprise | Ville
Mois/Année – Mois/Année (ou Présent)

• Verbe d'action + mission + résultat chiffré
• Piloté la migration CRM Salesforce pour 500 utilisateurs (+30 % de productivité)
• Réduit le temps de traitement des commandes de 45 % via l'automatisation RPA
```

**Compétences** — Groupez par catégorie pour faciliter le parsing :
```
Techniques : Python, SQL, Power BI, Tableau
Métier : Gestion de projet, analyse financière, conduite du changement
Outils : Salesforce, SAP, Jira, Confluence
```

L'IA peut vous aider à identifier les compétences les plus pertinentes à mettre en avant pour chaque offre. Découvrez comment dans [notre article sur l'optimisation ATS par l'IA](/blog/adapter-cv-ats-ia).

## Les règles typographiques

### Polices recommandées

| Police | Type | Compatibilité ATS | Lisibilité écran |
|--------|------|-------------------|-----------------|
| Calibri | Sans-serif | Excellente | Excellente |
| Arial | Sans-serif | Excellente | Très bonne |
| Garamond | Serif | Très bonne | Bonne |
| Times New Roman | Serif | Excellente | Bonne |
| Helvetica | Sans-serif | Très bonne | Excellente |

**Règles à suivre :**
- **1 à 2 polices maximum** — Une pour les titres, une pour le corps (ou la même partout)
- **10-12 pt pour le corps du texte** — En dessous de 10 pt, certains ATS ont du mal à parser
- **12-14 pt pour les titres** — Suffisant pour créer une hiérarchie visuelle

### Marges et espacement

- **Marges :** 1,5 à 2,5 cm sur les quatre côtés. Des marges trop étroites (< 1 cm) peuvent être tronquées lors du parsing.
- **Interligne :** 1,0 à 1,15. Un interligne de 1,5 gaspille de l'espace précieux.
- **Longueur :** 1 page pour les profils juniors (0-5 ans), 2 pages maximum pour les profils seniors. Au-delà, les recruteurs ne lisent plus — et certains ATS tronquent.

### Mise en forme à utiliser vs éviter

| À utiliser | À éviter |
|-----------|----------|
| **Gras** pour les titres et mots-clés | Zones de texte flottantes |
| Puces simples (•, –) | Icônes et emojis |
| Traits horizontaux simples | Filigrane ou arrière-plan |
| Italique avec modération | Texte en image |
| Majuscules pour les titres | Cadres et bordures complexes |

## Éléments à bannir de votre CV

Certains éléments, même courants, sont invisibles ou problématiques pour les ATS :

- **Photos** — Ignorées par l'ATS, elles occupent de l'espace utile. En France, elles ne sont pas obligatoires.
- **En-têtes et pieds de page** — La plupart des ATS les ignorent complètement. Ne placez jamais vos coordonnées ici.
- **Zones de texte** — Traitées comme des objets flottants, leur contenu est souvent ignoré ou mal positionné.
- **Formes et SmartArt** — Totalement invisibles pour les ATS.

Pour la liste complète des erreurs courantes, consultez [les 10 erreurs qui font rejeter votre CV par les ATS](/blog/erreurs-cv-ats).

## FAQ

**Les templates Canva sont-ils compatibles ATS ?**
La majorité ne le sont pas. Canva exporte des PDF basés sur des éléments graphiques, pas sur une structure de texte. Si vous tenez à utiliser Canva, faites le test Ctrl+A → Ctrl+C sur le PDF exporté. Si le texte est mélangé ou incomplet, le template n'est pas compatible.

**Mon CV doit-il tenir sur une seule page ?**
Pas nécessairement. Pour un profil junior (moins de 5 ans d'expérience), une page suffit. Pour un profil senior, deux pages sont acceptables. L'important est que chaque ligne apporte de la valeur.

**Les couleurs posent-elles un problème pour les ATS ?**
Non, les ATS ignorent les couleurs — elles ne gênent pas le parsing. Mais attention : un texte gris clair sur fond blanc peut être difficile à lire pour le recruteur qui consulte votre CV après le filtre ATS. Privilégiez un contraste élevé.

## Passez à l'action

Un CV bien formaté, c'est la base. Un CV adapté à chaque offre, c'est ce qui fait la différence. FitMyCV analyse la compatibilité de votre CV avec l'offre d'emploi et vous guide pour l'optimiser.

[Analyser mon CV →](https://app.fitmycv.io) | [Voir les tarifs →](/pricing)
