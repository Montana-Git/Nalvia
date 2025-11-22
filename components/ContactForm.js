"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('message', formData.message);

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors'
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className={styles.contactSection}>
            <div className="container">
                <div className={styles.container}>
                    <motion.div
                        className={styles.formWrapper}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.title}>Contactez-nous</h2>
                        <p className={styles.subtitle}>Prêt à passer au solaire ? Demandez votre devis gratuit.</p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>Nom complet</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="Votre nom"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="+216 00 000 000"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className={styles.textarea}
                                    placeholder="Détails de votre projet..."
                                />
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
                                {status === 'loading' ? (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <Loader2 className="animate-spin" size={20} /> Envoi...
                                    </span>
                                ) : (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        Envoyer la demande <Send size={20} />
                                    </span>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    className={`${styles.message} ${styles.success}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    Message envoyé avec succès ! Nous vous recontacterons bientôt.
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    className={`${styles.message} ${styles.error}`}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
