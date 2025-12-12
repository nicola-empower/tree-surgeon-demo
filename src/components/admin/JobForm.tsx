'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MOCK_TRADES, Job } from '@/lib/constants';

interface JobFormProps {
    onAddJob: (newJob: Omit<Job, 'id' | 'status'>) => void;
    onToggleForm: () => void;
}

export default function JobForm({ onAddJob, onToggleForm }: JobFormProps) {
    const [jobData, setJobData] = useState({
        title: '',
        client: '',
        address: '',
        time: '09:00',
        duration: '60',
        trade: MOCK_TRADES[0],
        date: new Date().toISOString().split('T')[0],
        location: { lat: 55.8642, lng: -4.2518 }, // Default to Glasgow
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simple validation check
        if (!jobData.title || !jobData.client || !jobData.address) {
            console.error("Please fill in required fields.");
            return;
        }

        const newJob: Omit<Job, 'id' | 'status'> = {
            ...jobData,
            duration: parseInt(jobData.duration, 10),
        };
        onAddJob(newJob);
        // Reset form or close it
        setJobData({
            title: '',
            client: '',
            address: '',
            time: '09:00',
            duration: '60',
            trade: MOCK_TRADES[0],
            date: new Date().toISOString().split('T')[0],
            location: { lat: 55.8642, lng: -4.2518 }
        });
        onToggleForm(); // Close the form after submission
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-6 border-2 border-[#166534]/20">
            <h3 className="text-xl font-bold mb-4 text-[#166534]">Schedule New Job</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            placeholder="e.g., Boiler Service"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Client Name</label>
                        <input
                            type="text"
                            name="client"
                            value={jobData.client}
                            onChange={handleChange}
                            placeholder="e.g., Jane Doe"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>

                {/* Location and Trade */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={jobData.address}
                            onChange={handleChange}
                            placeholder="Enter address..."
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trade/Role</label>
                        <select
                            name="trade"
                            value={jobData.trade}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                        >
                            {MOCK_TRADES.map(trade => (
                                <option key={trade} value={trade}>{trade}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Time and Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="time"
                            name="time"
                            value={jobData.time}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (Minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={jobData.duration}
                            onChange={handleChange}
                            min="15"
                            step="15"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-[#166534] focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="button"
                        onClick={onToggleForm}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#166534] transition duration-150"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#166534] rounded-lg shadow-md hover:bg-[#14532D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#166534] transition duration-150"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Job
                    </button>
                </div>
            </form>
        </div>
    );
}
