'use client';

import styles from './Partners.module.css';

const partners = [
    { name: 'Partner 1', logo: '/partners/9161fedceb5a779bfb12717ae99814d1.png' },
    { name: 'Partner 2', logo: '/partners/images (1).png' },
    { name: 'Partner 3', logo: '/partners/images (2).png' },
    { name: 'Partner 4', logo: '/partners/logoslogan.png' },
    { name: 'Partner 5', logo: '/partners/steg.jpg' },
];

export default function Partners() {
    // Quadruple the partners list to ensure it covers wide screens and loops smoothly
    // We scroll -50% of the track, so we need 2 full sets to be visible + buffer.
    // Actually, if we scroll -50%, we are scrolling the width of half the content.
    // So if we have [A, B, A, B], scrolling -50% moves us to the second A.
    // This is a perfect loop.
    const allPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className={styles.partnersSection}>
            <h2 className={styles.title}>Ils nous font confiance</h2>
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeTrack}>
                    {allPartners.map((partner, index) => (
                        <div key={index} className={styles.logoWrapper}>
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={styles.logo}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
