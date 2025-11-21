"use client";

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className="container">
                <div className={styles.content}>
                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.imagePlaceholder}>
                            [Image Équipe / Installation]
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.text}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="section-title" style={{ textAlign: 'left' }}>Qui sommes-nous ?</h2>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-light)', marginBottom: '20px' }}>
                            Nalvia est une entreprise tunisienne nouvelle génération, dédiée à la démocratisation de l'énergie solaire.
                            Fondée sur des valeurs d'innovation et de durabilité, nous nous engageons à fournir des solutions énergétiques
                            propres et accessibles à tous les foyers et entreprises de Tunisie.
                        </p>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-light)' }}>
                            Notre équipe d'experts certifiés utilise les dernières technologies pour garantir des installations
                            performantes et esthétiques.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <h4>100%</h4>
                                <p>Satisfaction Client</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4>24/7</h4>
                                <p>Support Technique</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
