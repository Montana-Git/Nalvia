"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import styles from './Navbar.module.css';
import { useTheme } from './context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                        <li>
                            <button
                                onClick={toggleTheme}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '8px' }}
                                aria-label="Toggle Theme"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </li>
                    </ul>

                    <Link href="#contact" className={`btn btn-primary ${styles.ctaButton}`}>
                        Devis Gratuit
                    </Link>

                    {/* Mobile Hamburger - Hidden on Desktop via CSS */}
                    <button
                        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>

                    {/* Mobile Menu Overlay - Hidden on Desktop via CSS */}
                    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                        <ul className={styles.mobileLinks}>
                            <li><Link href="#home" onClick={toggleMenu}>Accueil</Link></li>
                            <li><Link href="#about" onClick={toggleMenu}>À propos</Link></li>
                            <li><Link href="#services" onClick={toggleMenu}>Services</Link></li>
                            <li><Link href="#contact" onClick={toggleMenu}>Contact</Link></li>
                            <li>
                                <button
                                    onClick={() => { toggleTheme(); toggleMenu(); }}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}
                                >
                                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                                    {theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
                                </button>
                            </li>
                            <li>
                                <Link href="#contact" className="btn btn-primary" onClick={toggleMenu}>
                                    Devis Gratuit
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
