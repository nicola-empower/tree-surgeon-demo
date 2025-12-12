'use client';

import React, { useState } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';
import { MOCK_JOBS, Job } from '@/lib/constants';
import { Plus, Search, Filter } from 'lucide-react';

export default function JobManager() {
    const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<'All' | 'Scheduled' | 'In Progress' | 'Completed'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddJob = (newJobData: Omit<Job, 'id' | 'status'>) => {
        const newJob: Job = {
            ...newJobData,
            id: Math.max(...jobs.map(j => j.id), 0) + 1,
            status: 'Scheduled'
        };
        setJobs([newJob, ...jobs]);
    };

    const handleStatusChange = (jobId: number, newStatus: Job['status']) => {
        setJobs(jobs.map(job => 
            job.id === jobId ? { ...job, status: newStatus } : job
        ));
    };

    const filteredJobs = jobs.filter(job => {
        const matchesFilter = filter === 'All' || job.status === filter;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              job.client.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search jobs or clients..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none"
                    />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Scheduled', 'In Progress', 'Completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                filter === status 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#166534] text-white px-4 py-2 rounded-lg hover:bg-[#14532D] transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Job
                </button>
            </div>

            {/* Form Area */}
            {showForm && (
                <JobForm onAddJob={handleAddJob} onToggleForm={() => setShowForm(false)} />
            )}

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} onStatusChange={handleStatusChange} />
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No jobs found matching your criteria.
                </div>
            )}
        </div>
    );
}
