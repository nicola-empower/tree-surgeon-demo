'use client';

import React, { useState } from 'react';
import type { Job } from '@/lib/constants';
import { Send, Bell, CheckCircle, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';

interface InvoiceGeneratorProps {
    jobs: Job[];
    isMobile?: boolean;
}

export default function InvoiceGenerator({ jobs, isMobile = false }: InvoiceGeneratorProps) {
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);



    // Filter for completed jobs only
    const completedJobs = jobs.filter(j => j.status === 'Completed');

    const generatePDF = async (job: Job) => {
        setIsGenerating(true);

        // Simulate processing time for effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        const doc = new jsPDF();

        // Add content to PDF
        doc.setFontSize(22);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`Invoice #: INV-${job.id}-${Date.now().toString().slice(-4)}`, 20, 50);

        doc.text('Bill To:', 20, 70);
        doc.setFontSize(14);
        doc.text(job.client, 20, 80);
        doc.setFontSize(12);
        doc.text(job.address, 20, 90);

        doc.line(20, 100, 190, 100);

        doc.text('Description', 20, 110);
        doc.text('Amount', 160, 110);

        doc.line(20, 115, 190, 115);

        doc.text(job.title, 20, 130);
        doc.text(`£${job.price?.toFixed(2) || '0.00'}`, 160, 130);

        doc.line(20, 140, 190, 140);

        doc.setFontSize(14);
        doc.text(`Total: £${job.price?.toFixed(2) || '0.00'}`, 160, 155);

        doc.setFontSize(10);
        doc.text('Thank you for your business!', 105, 180, { align: 'center' });

        // Save the PDF
        doc.save(`Invoice_${job.client.replace(/\s+/g, '_')}.pdf`);

        setIsGenerating(false);
        setShowSuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 5000);
    };



    const handleSendEmail = () => {
        alert('Simulating email send to client...');
    };

    const handleAddReminder = () => {
        alert('Reminder added to calendar for 7 days from now.');
    };

    const containerClass = isMobile ? 'text-white' : 'text-gray-800';
    const cardClass = isMobile ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm';
    const buttonClass = isMobile ? 'bg-[#00cec9] text-[#2d3436] hover:bg-[#00b5b0]' : 'bg-[#166534] text-white hover:bg-[#14532D]';

    return (
        <div className={`space-y-6 ${containerClass} relative`}>
            <h2 className={`text-2xl font-bold mb-4 ${isMobile ? 'text-white' : 'text-gray-900'}`}>
                Invoices
            </h2>

            {completedJobs.length === 0 ? (
                <p className="text-gray-500 italic">No completed jobs to invoice.</p>
            ) : (
                <div className="space-y-4">
                    {completedJobs.map(job => (
                        <div key={job.id} className={`p-4 rounded-lg border flex flex-col sm:flex-row justify-between items-center gap-4 ${cardClass}`}>
                            <div>
                                <h4 className="font-bold">{job.title}</h4>
                                <p className="text-sm opacity-70">{job.client} - {job.date}</p>
                                <p className="font-bold mt-1">£{job.price || 0}</p>
                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => generatePDF(job)}
                                    disabled={isGenerating}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center transition-colors ${buttonClass} ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isGenerating ? (
                                        'Generating...'
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Generate PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Email Draft Modal */}


            {/* Success Overlay with Animation */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center z-10 pointer-events-auto max-w-sm mx-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                                <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
                            </motion.div>

                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Invoice Generated!</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                The invoice has been downloaded. What would you like to do next?
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <button
                                    onClick={() => { handleSendEmail(); setShowSuccess(false); }}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send via Email
                                </button>
                                <button
                                    onClick={() => { handleAddReminder(); setShowSuccess(false); }}
                                    className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center"
                                >
                                    <Bell className="w-4 h-4 mr-2" />
                                    Remind in 7 Days
                                </button>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="w-full py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
