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
                        transition={{ duration: 0.8 }}
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
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="section-title" style={{ textAlign: 'left' }}>L'Innovation <br /><span className="text-gradient">Au Service du Durable</span></h2>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.1rem' }}>
                            Nalvia redéfinit les standards de l'énergie solaire en Tunisie.
                            Nous ne posons pas seulement des panneaux ; nous concevons des écosystèmes énergétiques intelligents.
                        </p>
                        <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                            Alliant esthétique premium et performance maximale, nos solutions s'intègrent harmonieusement à votre architecture tout en réduisant drastiquement votre empreinte carbone.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <h4>100%</h4>
                                <p>Satisfaction</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4>24/7</h4>
                                <p>Monitoring</p>
                            </div>
                            <div className={styles.statItem}>
                                <h4>10ans</h4>
                                <p>Garantie</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
