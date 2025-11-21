"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>
                        <Sun size={32} color="#FDB813" fill="#FDB813" />
                        Nalvia
                    </Link>

                    <ul className={styles.navLinks}>
                        <li><Link href="#home" className={styles.navLink}>Accueil</Link></li>
                        <li><Link href="#about" className={styles.navLink}>À propos</Link></li>
                        <li><Link href="#services" className={styles.navLink}>Services</Link></li>
                        <li><Link href="#contact" className={styles.navLink}>Contact</Link></li>
                    </ul>

                    <Link href="#contact" className={`btn btn-primary ${styles.ctaButton}`}>
                        Devis Gratuit
                    </Link>
                </div>
            </div>
        </nav>
    );
}
