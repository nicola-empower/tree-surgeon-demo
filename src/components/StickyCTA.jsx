import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const StickyCTA = ({ number, label = "Call Now" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down a bit (e.g., 100px)
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <a
                href={`tel:${number.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 w-full bg-accent text-white font-bold py-3.5 px-6 rounded-xl shadow-lg active:scale-95 transition-all"
            >
                <Phone size={20} />
                {label}: {number}
            </a>
        </div>
    );
};

export default StickyCTA;
