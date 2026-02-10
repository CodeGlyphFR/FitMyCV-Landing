import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — FitMyCV",
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p className="legal-date">Dernière mise à jour : 10 février 2025</p>

      <div className="legal-section">
        <h2>1. Responsable du traitement</h2>
        <p>
          La société Codeglyph édite le site FitMyCV.io et, à ce titre,
          collecte et traite des données personnelles vous concernant.
        </p>
        <div className="legal-infobox">
          Codeglyph
          {"\n"}SIRET : 995 375 862 00019
          {"\n"}200 rue de la Croix Nivert, 75015 Paris
          {"\n"}Email :{" "}
          <a href="mailto:contact@codeglyph.fr">contact@codeglyph.fr</a>
        </div>
      </div>

      <div className="legal-section">
        <h2>2. Âge minimum</h2>
        <p>
          FitMyCV.io est destiné aux personnes de 16 ans et plus. En utilisant
          ce service, vous confirmez avoir l&apos;âge requis.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li>
            <strong>Accès :</strong> consulter les données personnelles que nous
            détenons sur vous
          </li>
          <li>
            <strong>Rectification :</strong> corriger des données inexactes ou
            incomplètes
          </li>
          <li>
            <strong>Effacement :</strong> demander la suppression de vos données
            (« droit à l&apos;oubli »)
          </li>
          <li>
            <strong>Limitation :</strong> restreindre le traitement de vos
            données
          </li>
          <li>
            <strong>Portabilité :</strong> récupérer vos données dans un format
            structuré
          </li>
          <li>
            <strong>Opposition :</strong> vous opposer au traitement pour des
            motifs légitimes
          </li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:contact@codeglyph.fr">contact@codeglyph.fr</a>. Nous
          répondrons dans un délai de 30 jours.
        </p>
        <p>
          En cas de litige, vous pouvez déposer une réclamation auprès de la{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            CNIL
          </a>
          .
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Données collectées</h2>
        <h3>4.1 Données d&apos;identification</h3>
        <ul>
          <li>Nom, adresse email, mot de passe (chiffré)</li>
          <li>
            Photo de profil (si connexion via Google, Apple ou GitHub)
          </li>
        </ul>
        <h3>4.2 Données de CV</h3>
        <ul>
          <li>
            Informations professionnelles : expériences, formations, compétences
          </li>
          <li>
            Coordonnées : téléphone, adresse, liens professionnels
          </li>
          <li>
            Documents importés (PDF) : non conservés, transmis à OpenAI pour
            extraction puis supprimés immédiatement
          </li>
          <li>Historique des versions de vos CV</li>
        </ul>
        <h3>4.3 Données de navigation</h3>
        <ul>
          <li>Adresse IP, type de navigateur</li>
          <li>Pages visitées, données de session</li>
        </ul>
        <h3>4.4 Données de paiement</h3>
        <ul>
          <li>Historique des abonnements et transactions</li>
          <li>
            Aucune donnée bancaire stockée (gérées exclusivement par Stripe)
          </li>
        </ul>
        <h3>4.5 Données d&apos;utilisation</h3>
        <ul>
          <li>
            Événements d&apos;utilisation (création de CV, imports, générations)
          </li>
          <li>Métriques de performance des appels IA</li>
          <li>Logs d&apos;erreurs pour diagnostic</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>5. Finalités et bases légales</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fourniture du service (création et génération de CV)</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Gestion des paiements et abonnements</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Amélioration du service, correction de bugs</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Sécurité et prévention des abus</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Conservation des données de facturation</td>
              <td>Obligation légale</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="legal-section">
        <h2>6. Durées de conservation</h2>
        <table className="legal-table">
          <thead>
            <tr>
              <th>Type de données</th>
              <th>Durée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compte actif</td>
              <td>Tant que le compte existe</td>
            </tr>
            <tr>
              <td>Compte supprimé</td>
              <td>Suppression immédiate</td>
            </tr>
            <tr>
              <td>Compte inactif</td>
              <td>
                3 ans après dernière connexion (notification 30j avant
                suppression)
              </td>
            </tr>
            <tr>
              <td>Données de facturation</td>
              <td>5 ans (obligation légale)</td>
            </tr>
            <tr>
              <td>Logs emails</td>
              <td>12 mois</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="legal-section">
        <h2>7. Hébergement</h2>
        <p>Les données sont hébergées en France.</p>
      </div>

      <div className="legal-section">
        <h2>8. Fournisseurs d&apos;IA tiers</h2>
        <p>
          FitMyCV.io utilise l&apos;intelligence artificielle pour générer et
          optimiser vos CV. Les données de vos CV (expériences, compétences,
          formations) sont transmises à :
        </p>
        <ul>
          <li>
            <a
              href="https://openai.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI
            </a>{" "}
            (États-Unis)
          </li>
        </ul>
        <p>
          OpenAI affirme ne pas utiliser les données transmises via son API pour
          entraîner ses modèles.
        </p>
        <h3>Décisions automatisées</h3>
        <p>
          L&apos;IA est utilisée pour calculer des scores de compatibilité
          CV-offre, classifier vos compétences et suggérer des améliorations.
          Ces traitements sont des aides à la décision : vous conservez le
          contrôle total sur le contenu final de vos CV.
        </p>
      </div>

      <div className="legal-section">
        <h2>9. Traitement des paiements</h2>
        <p>
          Les paiements sont traités par Stripe Payments Europe, Ltd. (Irlande).
          FitMyCV.io ne stocke jamais les numéros de carte bancaire complets.
        </p>
        <p>
          <a
            href="https://stripe.com/fr/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité Stripe
          </a>
        </p>
      </div>

      <div className="legal-section">
        <h2>10. Envoi d&apos;emails</h2>
        <p>
          Les emails transactionnels (vérification, réinitialisation de mot de
          passe, confirmations) sont envoyés via Resend.
        </p>
        <p>
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité Resend
          </a>
        </p>
      </div>

      <div className="legal-section">
        <h2>11. Cookies</h2>
        <p>
          FitMyCV.io utilise des cookies essentiels au fonctionnement du site
          (session, authentification, protection anti-spam). Aucun cookie
          publicitaire n&apos;est utilisé.
        </p>
      </div>

      <div className="legal-section">
        <h2>12. Sécurité</h2>
        <p>
          Nous mettons en œuvre les mesures suivantes pour protéger vos données :
        </p>
        <ul>
          <li>Communication HTTPS (SSL/TLS)</li>
          <li>Mots de passe chiffrés (bcrypt)</li>
          <li>Protection CSRF et cookies sécurisés</li>
          <li>Protection anti-spam via Google reCAPTCHA v3</li>
        </ul>
        <p>
          reCAPTCHA collecte des données techniques (adresse IP, cookies,
          comportement de navigation) pour distinguer les humains des robots. La{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité
          </a>{" "}
          et les Conditions d&apos;utilisation de Google s&apos;appliquent.
        </p>
      </div>

      <div className="legal-section">
        <h2>13. Transferts internationaux</h2>
        <p>
          Certaines données peuvent être transférées hors de l&apos;Union
          Européenne (OpenAI, Resend aux États-Unis). Ces transferts sont
          encadrés par des clauses contractuelles types approuvées par la
          Commission européenne.
        </p>
      </div>

      <div className="legal-section">
        <h2>14. Modifications</h2>
        <p>
          Cette politique peut être modifiée à tout moment. Les modifications
          seront publiées sur cette page avec la date de mise à jour. En cas de
          modification substantielle, vous serez informé par email.
        </p>
      </div>
    </>
  );
}
