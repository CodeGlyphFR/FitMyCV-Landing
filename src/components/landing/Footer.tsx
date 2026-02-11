import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="icons/logo.png" alt="FitMyCV" height={32} />
            <p>Votre CV, optimisé par l&apos;IA</p>
          </div>
          <div className="footer-col">
            <h4>Produit</h4>
            <Link href="/#howItWorks">Comment ça marche</Link>
            <Link href="/#features">Fonctionnalités</Link>
            <Link href="/#pricing">Tarifs</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/support">Support</Link>
          </div>
          <div className="footer-col">
            <h4>Légal</h4>
            <a href="/terms">CGU</a>
            <a href="/privacy">Vie privée</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:contact@fitmycv.io">contact@fitmycv.io</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 FitMyCV.io</p>
          <div className="footer-socials">
            <span aria-label="LinkedIn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </span>
            <span aria-label="X (Twitter)">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.3L20 4h-2l-5.2 6.3L8 4H4z" />
              </svg>
            </span>
            <span aria-label="GitHub">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
