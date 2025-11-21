"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.css';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section id="home" className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        L'énergie solaire <br />
                        <span className={styles.highlight}>innovante</span> pour votre avenir
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Nalvia vous accompagne dans votre transition énergétique avec des solutions photovoltaïques sur mesure en Tunisie. Économisez et protégez la planète.
                    </motion.p>

                    <motion.div
                        className={styles.buttonGroup}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="#contact" className="btn btn-primary">
                            Commencer maintenant <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link href="#services" className="btn btn-secondary">
                            Nos Services
                        </Link>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={styles.heroImage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className={styles.imagePlaceholder} style={{
                    backgroundImage: 'url(/hero-solar.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                </div>
            </motion.div>
        </section>
    );
}
