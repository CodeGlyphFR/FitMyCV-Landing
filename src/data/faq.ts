export interface FaqItem {
  question: string;
  answer: string;
  landing: boolean;
}

export const faqItems: FaqItem[] = [
  // ── Landing questions (6) ──
  {
    question: 'L\u2019IA va-t-elle remplacer mon contenu ?',
    answer:
      'Non. L\u2019IA ne fabrique ni compétences ni expériences. Elle travaille exclusivement à partir des informations que vous fournissez : elle reformule, réorganise et optimise le contenu en tenant compte du format ATS. Le mode révision vous permet de valider chaque modification, et l\u2019éditeur en ligne vous donne un contrôle complet sur le résultat final.',
    landing: true,
  },
  {
    question: 'Mon CV sera-t-il compatible ATS ?',
    answer:
      'Oui. La structure du CV, le choix des mots-clés et la hiérarchie des sections sont conçus pour être correctement lus par les systèmes de suivi des candidatures (ATS). Lorsque votre profil le justifie, l\u2019IA intègre les termes pertinents de l\u2019offre d\u2019emploi pour renforcer la correspondance avec les filtres des recruteurs.',
    landing: true,
  },
  {
    question: 'Mes données sont-elles protégées ?',
    answer:
      'Vos CV et données personnelles sont chiffrés et ne sont jamais partagés avec des tiers ni utilisés pour entraîner des modèles d\u2019IA. Vous pouvez supprimer votre compte et l\u2019ensemble de vos données à tout moment. FitMyCV est conforme au RGPD.',
    landing: true,
  },
  {
    question: 'Y a-t-il un essai gratuit ?',
    answer:
      'Oui. Vous recevez 15 crédits gratuits à la création de votre compte, sans carte bancaire requise. Cela vous permet de générer plusieurs CV et de tester l\u2019ensemble des fonctionnalités avant d\u2019acheter des crédits supplémentaires.',
    landing: true,
  },
  {
    question: 'Quelles plateformes d\u2019emploi sont compatibles ?',
    answer:
      'FitMyCV fonctionne avec toute offre d\u2019emploi accessible publiquement, sans authentification requise : Indeed, Welcome to the Jungle, Pôle Emploi, et de nombreuses autres plateformes. Il suffit de coller l\u2019URL de l\u2019offre. Pour les sites nécessitant une connexion (LinkedIn, etc.), une extension navigateur est en cours de développement — elle permettra de générer un CV directement depuis la page de l\u2019offre, à partir du CV source de votre choix.',
    landing: true,
  },
  {
    question: 'En quoi FitMyCV est différent de ChatGPT ?',
    answer:
      'Si vous demandez à ChatGPT d\u2019adapter votre CV à une offre, il va souvent inventer : une compétence que vous n\u2019avez pas, une tâche que vous n\u2019avez jamais réalisée, juste pour coller au poste. Vous vous en rendez compte à la relecture — ou pire, en entretien. Ensuite il faut corriger, relancer, revérifier… à chaque candidature. FitMyCV s\u2019appuie exclusivement sur votre parcours réel et vous montre chaque modification avant validation. Résultat : un CV fidèle, optimisé et prêt à envoyer — en quelques minutes, pas en quelques heures.',
    landing: true,
  },

  // ── Support-only questions (5) ──
  {
    question: 'Quels formats sont supportés ?',
    answer:
      'Vous pouvez importer un CV existant en PDF par glisser-déposer. Après génération ou modification, l\u2019export est disponible en PDF et en Word (.docx), prêts à être joints à une candidature ou chargés sur une plateforme d\u2019emploi.',
    landing: false,
  },
  {
    question: 'Combien de CV puis-je créer ?',
    answer:
      'Il n\u2019y a pas de limite. Chaque génération de CV consomme des crédits. À l\u2019inscription, vous recevez 15 crédits gratuits pour tester l\u2019outil. Ensuite, vous achetez des crédits à la demande selon vos besoins — sans abonnement ni engagement.',
    landing: false,
  },
  {
    question: 'En combien de langues puis-je créer mon CV ?',
    answer:
      'L\u2019interface et la traduction de CV sont actuellement disponibles en 4 langues : français, anglais, espagnol et allemand. D\u2019autres langues seront ajoutées progressivement. Vous pouvez traduire un CV existant vers une autre langue en un clic, en conservant la mise en page et le contenu.',
    landing: false,
  },
  {
    question: 'Puis-je modifier le CV après génération ?',
    answer:
      'Oui. L\u2019éditeur en ligne vous permet de modifier chaque section directement dans le navigateur. Le mode révision affiche les suggestions de l\u2019IA sous forme de propositions que vous pouvez accepter ou rejeter individuellement avant de finaliser votre CV.',
    landing: false,
  },
  {
    question: 'Qu\u2019est-ce que le score de correspondance ?',
    answer:
      'C\u2019est un indicateur en pourcentage qui mesure l\u2019adéquation entre votre CV et une offre d\u2019emploi. L\u2019algorithme compare les compétences, l\u2019expérience et les mots-clés de votre profil avec les exigences du poste. En plus du score, des recommandations ciblées vous indiquent comment améliorer la correspondance.',
    landing: false,
  },
];
