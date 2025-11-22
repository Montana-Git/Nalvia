"use client";

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.css';
import { ArrowRight, Sun } from 'lucide-react';

export default function Hero() {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Reverse for natural feel
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="home" className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        L'énergie solaire <br />
                        <span className="text-gradient">réinventée</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Transformez votre avenir énergétique avec Nalvia.
                        Technologie de pointe, design premium et performance inégalée pour la Tunisie de demain.
                    </motion.p>

                    <motion.div
                        className={styles.buttonGroup}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link href="#contact" className="btn btn-primary">
                            Commencer <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link href="#services" className="btn btn-secondary">
                            Découvrir
                        </Link>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={styles.heroImageWrapper}
                initial={{ opacity: 0, x: 200, rotateY: -20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className={styles.heroImage}
                    style={{ rotateX, rotateY }}
                >
                    <div className={styles.imagePlaceholder} style={{
                        backgroundImage: 'url(/hero-solar.png)',
                    }}>
                    </div>

                    <motion.div
                        className={styles.badge}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                        style={{ translateZ: 60 }} // 3D Float
                    >
                        <div className={styles.badgeIcon}>
                            <Sun size={28} />
                        </div>
                        <div className={styles.badgeText}>
                            <h4>Énergie Verte</h4>
                            <p>100% Renouvelable</p>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
