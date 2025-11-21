import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.column}>
                        <Link href="/" className={styles.logo}>Nalvia</Link>
                        <p className={styles.description}>
                            Votre partenaire de confiance pour l'énergie solaire en Tunisie.
                            Innovation, qualité et durabilité.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Liens Rapides</h4>
                        <ul className={styles.links}>
                            <li><Link href="#home">Accueil</Link></li>
                            <li><Link href="#about">À propos</Link></li>
                            <li><Link href="#services">Services</Link></li>
                            <li><Link href="#contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Contact</h4>
                        <ul className={styles.links}>
                            <li>Tunis, Tunisie</li>
                            <li>contact@nalvia.tn</li>
                            <li>+216 00 000 000</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    &copy; {new Date().getFullYear()} Nalvia. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
