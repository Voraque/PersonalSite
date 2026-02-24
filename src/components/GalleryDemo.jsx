import { motion } from 'framer-motion';
import './GalleryDemo.css';

const MOCK_IMAGES = [
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Abstract architecture
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=800&auto=format&fit=crop", // Abstract gradient/grain
    "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=800&auto=format&fit=crop"  // Minimalist nature/fog
];

export default function GalleryDemo() {
    return (
        <div className="panel panel-gallery">
            <div className="gallery-header">
                <h2 className="gallery-title">Visual Context</h2>
                <span className="type-meta">Abstracts / 2026</span>
            </div>

            <div className="gallery-grid">
                {MOCK_IMAGES.map((src, idx) => (
                    <motion.div
                        key={idx}
                        className="gallery-item-wrapper"
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className="gallery-image-container">
                            <img src={src} alt={`Curated abstract ${idx + 1}`} className="gallery-img" />
                            <div className="gallery-overlay"></div>
                        </div>
                        <div className="gallery-caption">Fig 0{idx + 1}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
