import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const FeatureSection = ({
    title,
    subtitle,
    description,
    features,
    imageSrc,
    quote,
    author,
    align = 'right' // 'left' or 'right' for image position
}) => {
    return (
        <div className="py-24 bg-gray-50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${align === 'left' ? 'lg:grid-flow-dense' : ''}`}>

                    {/* Content Column */}
                    <div className={align === 'left' ? 'lg:col-start-2' : ''}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
                        {subtitle && <p className="text-lg font-semibold text-accent mb-2">{subtitle}</p>}
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="space-y-6">
                            {features.map((f, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        {f.icon ? <f.icon size={24} /> : <CheckCircle2 size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                                        <p className="text-gray-500">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className={`relative ${align === 'left' ? 'lg:col-start-1' : ''}`}>
                        <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                            <img
                                src={imageSrc}
                                alt="Feature detail"
                                className="h-full w-full object-cover"
                            />

                            {quote && (
                                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-serif italic text-gray-600 text-lg">
                                        "{quote}"
                                    </p>
                                    {author && (
                                        <p className="mt-4 font-bold text-accent">
                                            - {author}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
