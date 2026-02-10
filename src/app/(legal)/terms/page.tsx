import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — FitMyCV",
};

export default function TermsPage() {
  return (
    <>
      <h1>Conditions Générales de Vente</h1>
      <p className="legal-date">Dernière mise à jour : 10 février 2025</p>

      <div className="legal-section">
        <h2>1. Acceptation des CGV</h2>
        <p>
          En utilisant FitMyCV.io et en effectuant un achat de crédits, vous
          acceptez sans réserve les présentes Conditions Générales de Vente
          (CGV).
        </p>
        <p>
          Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser
          nos services payants.
        </p>
        <p>
          L&apos;utilisation de FitMyCV.io est réservée aux personnes de 16 ans
          et plus.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Description des services</h2>
        <p>
          FitMyCV.io est une plateforme de création et d&apos;optimisation de CV
          utilisant l&apos;intelligence artificielle.
        </p>

        <h3>2.1. Services gratuits</h3>
        <ul>
          <li>Création manuelle de CV illimitée</li>
          <li>Édition illimitée de CV</li>
          <li>Stockage des CV dans votre espace personnel</li>
        </ul>

        <h3>2.2. Services consommant des crédits</h3>
        <ul>
          <li>Export PDF et DOCX</li>
          <li>Génération et adaptation de CV par IA</li>
          <li>Import et extraction de CV depuis PDF</li>
          <li>Traduction automatique de CV</li>
          <li>Optimisation de CV pour les offres d&apos;emploi</li>
          <li>Score de compatibilité CV/offre</li>
        </ul>

        <h3>2.3. Système de crédits</h3>
        <p>
          À la création de votre compte, vous recevez un nombre de crédits par
          défaut vous permettant de tester les fonctionnalités de la plateforme.
        </p>
        <p>
          Chaque fonctionnalité consomme un nombre de crédits variable selon un
          barème défini. Le coût en crédits de chaque fonctionnalité est affiché
          avant son utilisation.
        </p>
        <p>
          Les crédits n&apos;ont pas de date d&apos;expiration et restent
          valables tant que votre compte est actif.
        </p>
        <p>
          Lorsque vos crédits sont épuisés, vous pouvez en acheter depuis la
          page{" "}
          <a href="https://app.fitmycv.io/account/subscriptions?tab=credits">
            Gestion des crédits
          </a>
          .
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Tarifs et paiements</h2>
        <p>
          Tous les prix sont affichés en euros (EUR). L&apos;éditeur n&apos;est
          pas assujetti à la TVA conformément à l&apos;article 293 B du Code
          Général des Impôts.
        </p>
        <p>
          Les paiements sont sécurisés par Stripe et acceptent les cartes
          bancaires, Apple Pay, Google Pay et d&apos;autres moyens de paiement
          selon votre localisation.
        </p>
        <p>
          Les tarifs des packs de crédits sont disponibles sur la page{" "}
          <a href="https://app.fitmycv.io/account/subscriptions?tab=credits">
            Gestion des crédits
          </a>
          .
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Droit de rétractation</h2>
        <p>
          Conformément à l&apos;article L.221-28 du Code de la consommation,
          l&apos;Utilisateur reconnaît et accepte que l&apos;exécution des
          Services commence immédiatement après la validation de sa commande.
        </p>
        <p>
          En conséquence, l&apos;Utilisateur renonce expressément à son droit de
          rétractation pour tout achat de crédits.
        </p>
        <div className="legal-highlight highlight-warning">
          <strong>Important :</strong>
          La validation de la commande, après avoir coché la case de
          renonciation au droit de rétractation, vaut renonciation expresse à ce
          droit.
        </div>
      </div>

      <div className="legal-section">
        <h2>5. Politique de remboursement</h2>
        <p>
          Tout achat de crédits est définitif une fois le service utilisé
          (génération de CV, export, traduction, etc.). En effectuant un achat,
          vous reconnaissez avoir pris connaissance de cette clause et
          l&apos;accepter.
        </p>
        <p>
          En cas de problème technique empêchant l&apos;utilisation du service,
          contactez notre support à{" "}
          <a href="mailto:support@fitmycv.io">support@fitmycv.io</a>. Nous
          étudierons votre situation individuellement.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Chargebacks et litiges bancaires</h2>
        <p>
          En cas de chargeback (contestation de paiement auprès de votre banque)
          après utilisation du service :
        </p>
        <ul>
          <li>
            Le montant des crédits contestés sera retiré de votre balance, qui
            peut devenir négative.
          </li>
          <li>
            Vous devrez recharger votre compte pour continuer à utiliser les
            services consommant des crédits.
          </li>
        </ul>
        <div className="legal-highlight highlight-warning">
          <strong>Attention :</strong>
          Les chargebacks abusifs peuvent entraîner la suspension définitive de
          votre compte.
        </div>
      </div>

      <div className="legal-section">
        <h2>7. Intelligence artificielle</h2>
        <p>
          FitMyCV.io agit en qualité de « déployeur » d&apos;un système
          d&apos;intelligence artificielle au sens du règlement européen
          2024/1689 (AI Act).
        </p>

        <h3>7.1. Fonctionnalités utilisant l&apos;IA</h3>
        <ul>
          <li>Génération et adaptation de CV</li>
          <li>Optimisation de CV</li>
          <li>Extraction d&apos;offres d&apos;emploi</li>
          <li>Calcul du score de compatibilité</li>
          <li>Traduction de CV</li>
          <li>Import et extraction de CV depuis PDF</li>
        </ul>

        <h3>7.2. Nature des résultats</h3>
        <p>
          Les résultats générés par l&apos;IA sont des suggestions et ne
          constituent en aucun cas des recommandations contraignantes.
          L&apos;utilisateur conserve le contrôle total sur le contenu final de
          ses CV.
        </p>

        <h3>7.3. Fournisseur d&apos;IA</h3>
        <p>
          Les fonctionnalités d&apos;IA sont fournies par OpenAI (États-Unis).
          Les données transmises à OpenAI ne sont pas utilisées pour entraîner
          leurs modèles conformément à leur politique API.
        </p>
        <div className="legal-highlight highlight-info">
          <strong>Transparence IA :</strong>
          L&apos;utilisateur est informé que les contenus générés proviennent
          d&apos;un système d&apos;intelligence artificielle. Ces contenus
          doivent être vérifiés avant utilisation.
        </div>
      </div>

      <div className="legal-section">
        <h2>8. Propriété intellectuelle</h2>
        <p>
          Les CV que vous créez via FitMyCV.io vous appartiennent. Vous
          conservez tous les droits sur le contenu que vous fournissez.
        </p>
        <p>
          L&apos;interface, le code source, les algorithmes et tous les éléments
          de FitMyCV.io sont la propriété exclusive de l&apos;éditeur et sont
          protégés par le droit d&apos;auteur.
        </p>
      </div>

      <div className="legal-section">
        <h2>9. Limitation de responsabilité</h2>
        <p>
          Les services sont fournis « en l&apos;état », sans garantie
          d&apos;aucune sorte, expresse ou implicite.
        </p>
        <p>FitMyCV.io ne garantit pas :</p>
        <ul>
          <li>
            La disponibilité continue et ininterrompue du service
          </li>
          <li>L&apos;absence d&apos;erreurs techniques ou de bugs</li>
          <li>
            La compatibilité des CV générés avec tous les systèmes ATS
            (Applicant Tracking Systems)
          </li>
          <li>
            L&apos;obtention d&apos;un entretien ou d&apos;un emploi suite à
            l&apos;utilisation du service
          </li>
          <li>
            L&apos;exactitude ou la pertinence des contenus générés par
            l&apos;IA
          </li>
        </ul>
        <p>
          Des opérations de maintenance peuvent être effectuées sans préavis,
          entraînant une interruption temporaire du service.
        </p>
        <p>
          Notre responsabilité est limitée au montant que vous avez payé pour le
          service au cours des 12 derniers mois.
        </p>
      </div>

      <div className="legal-section">
        <h2>10. Comportements interdits</h2>
        <p>Sont strictement interdits :</p>
        <ul>
          <li>La revente ou la redistribution des services</li>
          <li>Toute tentative d&apos;intrusion dans les systèmes</li>
          <li>L&apos;usurpation d&apos;identité</li>
          <li>
            L&apos;extraction automatisée de données (scraping)
          </li>
          <li>
            L&apos;utilisation de bots ou scripts automatisés
          </li>
          <li>
            Tout usage contraire aux bonnes mœurs ou à l&apos;ordre public
          </li>
          <li>
            La création de contenus illégaux, diffamatoires ou portant atteinte
            aux droits des tiers
          </li>
        </ul>
        <div className="legal-highlight highlight-danger">
          <strong>Sanctions :</strong>
          En cas de violation, FitMyCV.io se réserve le droit de suspendre ou
          supprimer le compte sans préavis ni remboursement.
        </div>
      </div>

      <div className="legal-section">
        <h2>11. Résiliation et suppression de compte</h2>
        <p>
          Vous pouvez supprimer votre compte à tout moment depuis les paramètres
          de votre espace personnel ou en nous contactant à{" "}
          <a href="mailto:support@fitmycv.io">support@fitmycv.io</a>.
        </p>
        <p>
          La suppression du compte entraîne la suppression définitive de toutes
          vos données (CV, offres d&apos;emploi, historique) conformément à
          notre <Link href="/privacy">politique de confidentialité</Link>.
        </p>
        <div className="legal-highlight highlight-warning">
          <strong>Crédits non utilisés :</strong>
          Les crédits restants sur votre compte sont perdus lors de la
          suppression et ne peuvent être ni remboursés ni transférés.
        </div>
      </div>

      <div className="legal-section">
        <h2>12. Modification des CGV</h2>
        <p>
          Nous nous réservons le droit de modifier ces CGV à tout moment. Les
          modifications seront publiées sur cette page avec la date de mise à
          jour. La poursuite de l&apos;utilisation du service après modification
          vaut acceptation des nouvelles conditions.
        </p>
      </div>

      <div className="legal-section">
        <h2>13. Médiation de la consommation</h2>
        <p>
          Conformément aux articles L.616-1 et R.616-1 du Code de la
          consommation, en cas de litige, l&apos;Utilisateur peut recourir
          gratuitement à un médiateur de la consommation.
        </p>
        <p>
          Le nom et les coordonnées du médiateur compétent seront communiqués
          sur simple demande à{" "}
          <a href="mailto:contact@fitmycv.io">contact@fitmycv.io</a>.
        </p>
        <div className="legal-highlight highlight-info">
          <strong>Plateforme ODR :</strong>
          Vous pouvez également utiliser la plateforme de règlement en ligne des
          litiges de la Commission européenne :{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
        </div>
      </div>

      <div className="legal-section">
        <h2>14. Droit applicable et juridiction</h2>
        <p>Les présentes CGV sont régies par le droit français.</p>
        <p>
          En cas de litige, et après tentative de résolution amiable, les
          tribunaux de Paris seront seuls compétents.
        </p>
      </div>

      <div className="legal-section">
        <h2>15. Informations légales</h2>
        <p>Éditeur du service FitMyCV.io :</p>
        <div className="legal-infobox">
          Codeglyph
          {"\n"}SIRET : 995 375 862 00019
          {"\n"}200 rue de la Croix Nivert, 75015 Paris
          {"\n"}Email :{" "}
          <a href="mailto:contact@codeglyph.fr">contact@codeglyph.fr</a>
          {"\n\n"}Non assujetti à la TVA (article 293 B du CGI)
        </div>

        <h3>Hébergement</h3>
        <p>Le service est auto-hébergé par l&apos;éditeur.</p>

        <h3>Protection des données</h3>
        <p>
          Pour en savoir plus sur le traitement de vos données personnelles,
          consultez notre{" "}
          <Link href="/privacy">politique de confidentialité</Link>.
        </p>
        <p>
          Pour toute question concernant ces CGV, contactez-nous à{" "}
          <a href="mailto:contact@fitmycv.io">contact@fitmycv.io</a>.
        </p>
      </div>
    </>
  );
}
