import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const Header = ({ title = "Trade Services", phone = "0123 456 7890" }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                {/* Logo / Title */}
                <div className={`font-bold text-2xl tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                    {title}
                </div>

                {/* Desktop Call Button */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className={`text-sm font-medium ${isScrolled ? 'text-gray-600' : 'text-gray-200'} flex gap-6`}>
                        <a href="#services" className="hover:text-accent transition-colors">Services</a>
                        <a href="#reviews" className="hover:text-accent transition-colors">Reviews</a>
                    </nav>
                    <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-lg transform hover:-translate-y-0.5"
                    >
                        <Phone size={18} className="fill-current" />
                        <span>Call {phone}</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
