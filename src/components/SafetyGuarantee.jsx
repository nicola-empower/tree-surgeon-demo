import React from 'react';
import { Shield, CheckCircle, FileCheck, Award } from 'lucide-react';

const SafetyGuarantee = () => {
    return (
        <div className="bg-gray-900 text-white py-12 border-b border-gray-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                    <div className="max-w-xl">
                        <h3 className="text-2xl font-bold text-accent mb-2">Your Safety Guarantee</h3>
                        <p className="text-gray-400">
                            We don't cut corners. Every job is fully insured, certified, and backed by our rock-solid workmanship guarantee.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
                        {/* Mock Credentials - In production, these would be real logos */}
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <Shield size={32} className="text-accent" />
                            </div>
                            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase group-hover:text-gray-300">Fully Insured</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <FileCheck size={32} className="text-accent" />
                            </div>
                            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase group-hover:text-gray-300">Certified</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 group">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                                <Award size={32} className="text-accent" />
                            </div>
                            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase group-hover:text-gray-300">Guaranteed</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SafetyGuarantee;
