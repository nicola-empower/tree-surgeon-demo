import React from 'react';
import { ShieldCheck, CheckCircle, Award } from 'lucide-react';

const defaultItems = [
    { title: "£10m Liability", subtitle: "Fully Insured", icon: ShieldCheck, colorClass: "text-blue-600" },
    { title: "BS3998", subtitle: "British Standards", icon: CheckCircle, colorClass: "text-green-600" },
    { title: "NPTC Qualified", subtitle: "City & Guilds", icon: Award, colorClass: "text-amber-600" }
];

const TrustBar = ({ theme = 'light', items = defaultItems }) => {
    const isDark = theme === 'dark';
    const baseClass = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
    const textClass = isDark ? "text-gray-300" : "text-gray-600";
    const iconClass = isDark ? "text-gray-400" : "text-gray-400";

    return (
        <div className={`w-full py-8 border-y ${baseClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-80 hover:opacity-100 transition-opacity">

                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-default">
                            {item.icon && <item.icon size={32} className={`${iconClass} ${item.colorClass} transition-colors`} />}
                            <div className="flex flex-col">
                                <span className={`font-bold leading-tight ${textClass}`}>{item.title}</span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">{item.subtitle}</span>
                            </div>
                        </div>
                    ))}

                    {/* Payment Methods */}
                    <div className="items-center gap-4 border-l border-gray-200 pl-8 hidden md:flex">
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
