'use client';

import React, { useState, useEffect } from 'react';

export default function TaxCalculator() {
    const [grossIncome, setGrossIncome] = useState(50000);
    const [pensionPercent, setPensionPercent] = useState(5);
    const [holidayPercent, setHolidayPercent] = useState(10);
    const [sicknessPercent, setSicknessPercent] = useState(2);
    const [otherPercent, setOtherPercent] = useState(5);
    const [includeStudentLoan, setIncludeStudentLoan] = useState(false);

    const [results, setResults] = useState({
        netIncome: 0,
        incomeTax: 0,
        ni: 0,
        pension: 0,
        holiday: 0,
        sickness: 0,
        other: 0,
        studentLoan: 0,
    });

    useEffect(() => {
        calculateTakeHome();
    }, [grossIncome, pensionPercent, holidayPercent, sicknessPercent, otherPercent, includeStudentLoan]);

    const calculateTakeHome = () => {
        const income = grossIncome;

        // Scottish Tax Rates (Simplified 2024/25)
        const pa = 12570;
        let taxableIncome = income > pa ? income - pa : 0;
        let incomeTax = 0;

        if (taxableIncome > 0) {
            const band1 = Math.min(taxableIncome, 2324);
            incomeTax += band1 * 0.19;
            taxableIncome -= band1;
        }
        if (taxableIncome > 0) {
            const band2 = Math.min(taxableIncome, 11484);
            incomeTax += band2 * 0.2;
            taxableIncome -= band2;
        }
        if (taxableIncome > 0) {
            const band3 = Math.min(taxableIncome, 17260);
            incomeTax += band3 * 0.21;
            taxableIncome -= band3;
        }
        if (taxableIncome > 0) {
            const band4 = Math.min(taxableIncome, 34452);
            incomeTax += band4 * 0.42;
            taxableIncome -= band4;
        }
        if (taxableIncome > 0) {
            const band5 = Math.min(taxableIncome, 60000);
            incomeTax += band5 * 0.45;
            taxableIncome -= band5;
        }
        if (taxableIncome > 0) {
            incomeTax += taxableIncome * 0.48;
        }

        // NI Class 4 (2024/25)
        let ni = 0;
        const niThreshold = 12570;
        const niUpper = 50270;
        if (income > niThreshold) {
            const niBand1 = Math.min(income, niUpper) - niThreshold;
            ni += niBand1 * 0.08;
        }
        if (income > niUpper) {
            const niBand2 = income - niUpper;
            ni += niBand2 * 0.02;
        }

        // Sinking Funds
        const pension = income * (pensionPercent / 100);
        const holiday = income * (holidayPercent / 100);
        const sickness = income * (sicknessPercent / 100);
        const other = income * (otherPercent / 100);

        // Student Loan (Plan 2)
        let studentLoan = 0;
        const slThreshold = 27295;
        if (includeStudentLoan && income > slThreshold) {
            studentLoan = (income - slThreshold) * 0.09;
        }

        // Net
        const totalDeductions = incomeTax + ni + pension + holiday + sickness + other + studentLoan;
        const netIncome = income - totalDeductions;

        setResults({
            netIncome,
            incomeTax,
            ni,
            pension,
            holiday,
            sickness,
            other,
            studentLoan,
        });
    };

    const formatCurrency = (value: number, prefix = '£') => {
        if (value === 0) value = 0;
        return `${prefix}${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="space-y-6 pb-20">
            <header className="mb-4">
                <h2 className="text-2xl font-bold text-white">Tax Calculator</h2>
                <p className="text-sm text-gray-400">Estimate your take-home pay.</p>
            </header>

            {/* Inputs */}
            <div className="bg-gray-800 p-4 rounded-xl space-y-4">
                <h3 className="text-lg font-bold text-[#166534] mb-2">Your Figures</h3>
                <div>
                    <label htmlFor="gross-income" className="block text-xs font-medium text-gray-400 mb-1">
                        Projected Gross Income (£)
                    </label>
                    <input
                        type="number"
                        id="gross-income"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-[#166534] focus:border-[#166534]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Pension (%)</label>
                        <input
                            type="number"
                            value={pensionPercent}
                            onChange={(e) => setPensionPercent(parseFloat(e.target.value) || 0)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-[#166534] focus:border-[#166534]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Holiday (%)</label>
                        <input
                            type="number"
                            value={holidayPercent}
                            onChange={(e) => setHolidayPercent(parseFloat(e.target.value) || 0)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-[#166534] focus:border-[#166534]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Sickness (%)</label>
                        <input
                            type="number"
                            value={sicknessPercent}
                            onChange={(e) => setSicknessPercent(parseFloat(e.target.value) || 0)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-[#166534] focus:border-[#166534]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Tax/Mat (%)</label>
                        <input
                            type="number"
                            value={otherPercent}
                            onChange={(e) => setOtherPercent(parseFloat(e.target.value) || 0)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-[#166534] focus:border-[#166534]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="student-loan"
                        checked={includeStudentLoan}
                        onChange={(e) => setIncludeStudentLoan(e.target.checked)}
                        className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-[#166534] focus:ring-[#166534]"
                    />
                    <label htmlFor="student-loan" className="text-sm font-medium text-gray-300">
                        Student Loan (Plan 2)?
                    </label>
                </div>
            </div>

            {/* Results */}
            <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="text-lg font-bold text-[#166534] mb-4">Estimated Take-Home</h3>

                <div className="mb-4 p-4 bg-gray-700/50 rounded-xl border border-[#166534]/30 text-center">
                    <span className="text-xs font-medium text-[#166534]">Annual Net Income</span>
                    <p className="text-3xl font-extrabold text-white">{formatCurrency(results.netIncome)}</p>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">Income Tax</span>
                        <span className="font-bold text-red-400">{formatCurrency(results.incomeTax, '- £')}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">NI (Class 4)</span>
                        <span className="font-bold text-red-400">{formatCurrency(results.ni, '- £')}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">Sinking Funds Total</span>
                        <span className="font-bold text-red-400">
                            {formatCurrency(results.pension + results.holiday + results.sickness + results.other, '- £')}
                        </span>
                    </div>
                    {results.studentLoan > 0 && (
                        <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                            <span className="text-gray-400">Student Loan</span>
                            <span className="font-bold text-red-400">{formatCurrency(results.studentLoan, '- £')}</span>
                        </div>
                    )}
                </div>
                <p className="text-[10px] text-gray-500 mt-4 text-center">
                    *Estimates based on 2024/25 Scottish rates.
                </p>
            </div>
        </div>
    );
}
