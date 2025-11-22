"use client";

import Link from 'next/link';
import styles from './Footer.module.css';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Sun } from 'lucide-react';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.watermark}>NALVIA</div>

            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3><Sun className="text-gradient" /> Nalvia</h3>
                        <p>
                            Leader de l'énergie solaire en Tunisie. Nous transformons chaque rayon de soleil en opportunité durable pour votre avenir.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
                            <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
                            <a href="#" className={styles.socialIcon}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>Navigation</h4>
                        <ul className={styles.links}>
                            <li><Link href="#home">Accueil</Link></li>
                            <li><Link href="#services">Services</Link></li>
                            <li><Link href="#about">À Propos</Link></li>
                            <li><Link href="#contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Services</h4>
                        <ul className={styles.links}>
                            <li><a href="#">Installation Solaire</a></li>
                            <li><a href="#">Maintenance</a></li>
                            <li><a href="#">Étude de Projet</a></li>
                            <li><a href="#">Pompage Solaire</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Contact</h4>
                        <ul className={styles.links}>
                            <li><a href="tel:+21600000000"><Phone size={16} style={{ marginRight: '8px', display: 'inline' }} /> +216 00 000 000</a></li>
                            <li><a href="mailto:contact@nalvia.tn"><Mail size={16} style={{ marginRight: '8px', display: 'inline' }} /> contact@nalvia.tn</a></li>
                            <li><span><MapPin size={16} style={{ marginRight: '8px', display: 'inline' }} /> Tunis, Tunisie</span></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Nalvia. Tous droits réservés.</p>
                    <p>Designed for the Future.</p>
                </div>
            </div>
        </footer>
    );
}
