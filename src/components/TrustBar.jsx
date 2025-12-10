import React from 'react';
import { ShieldCheck, CheckCircle, CreditCard, Award } from 'lucide-react';

const TrustBar = ({ theme = 'light' }) => {
    const isDark = theme === 'dark';
    const baseClass = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
    const textClass = isDark ? "text-gray-300" : "text-gray-600";
    const iconClass = isDark ? "text-gray-400" : "text-gray-400";

    return (
        <div className={`w-full py-8 border-y ${baseClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-80 hover:opacity-100 transition-opacity">

                    {/* Mock Accreditation Logos using Icons */}
                    <div className="flex items-center gap-2 group cursor-default">
                        <ShieldCheck size={32} className={`${iconClass} group-hover:text-green-600 transition-colors`} />
                        <div className="flex flex-col">
                            <span className={`font-bold leading-tight ${textClass}`}>SafeVerified</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400">Accredited</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 group cursor-default">
                        <Award size={32} className={`${iconClass} group-hover:text-yellow-500 transition-colors`} />
                        <div className="flex flex-col">
                            <span className={`font-bold leading-tight ${textClass}`}>TradeMaster</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400">Guild Member</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 group cursor-default">
                        <CheckCircle size={32} className={`${iconClass} group-hover:text-blue-500 transition-colors`} />
                        <div className="flex flex-col">
                            <span className={`font-bold leading-tight ${textClass}`}>CheckaPro</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400">5 Star Rated</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex items-center gap-4 border-l border-gray-200 pl-8 hidden md:flex">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">We Accept</span>
                        <div className="flex gap-2">
                            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold text-xs">VISA</div>
                            <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold text-xs">MC</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TrustBar;
