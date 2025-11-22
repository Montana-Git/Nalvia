"use client";

import { motion } from 'framer-motion';
import styles from './Services.module.css';
import { Zap, Wrench, ClipboardCheck } from 'lucide-react';

const services = [
    {
        icon: <Zap size={32} />,
        title: "Installation Solaire",
        description: "Solutions clés en main pour résidences et entreprises. Panneaux haute performance garantissant un rendement optimal."
    },
    {
        icon: <Wrench size={32} />,
        title: "Maintenance & Nettoyage",
        description: "Assurez la longévité de votre installation avec nos services de maintenance préventive et de nettoyage professionnel."
    },
    {
        icon: <ClipboardCheck size={32} />,
        title: "Étude de Projet",
        description: "Analyse personnalisée de vos besoins énergétiques et dimensionnement précis pour un retour sur investissement maximal."
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Services() {
    return (
        <section id="services" className={`section ${styles.services}`}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Nos <span className="text-gradient">Services</span></h2>
                    <p className="section-subtitle">
                        Une expertise complète pour vous accompagner à chaque étape de votre projet solaire.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {services.map((service, index) => (
                        <motion.div key={index} className={`${styles.card} glass-panel`} variants={item}>
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
