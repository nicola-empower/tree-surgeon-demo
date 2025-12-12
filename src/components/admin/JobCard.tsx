import React from 'react';
import { MapPin, Clock, Briefcase, CheckCircle } from 'lucide-react';
import { Job } from '@/lib/constants';
import { formatTime } from '@/lib/utils';

interface JobCardProps {
    job: Job;
    onStatusChange: (jobId: number, newStatus: Job['status']) => void;
}

export default function JobCard({ job, onStatusChange }: JobCardProps) {
    const statusColor = {
        'Scheduled': 'bg-blue-500/10 text-blue-600 border-blue-500',
        'In Progress': 'bg-yellow-500/10 text-yellow-600 border-yellow-500',
        'Completed': 'bg-green-500/10 text-green-600 border-green-500',
    }[job.status] || 'bg-gray-500/10 text-gray-600 border-gray-500';

    return (
        <div className="bg-white p-4 mb-4 rounded-xl shadow-lg border-t-4 border-gray-200 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                    {job.status}
                </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Client: {job.client}</p>

            <div className="space-y-1 text-sm text-gray-700">
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{job.address}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-red-500" />
                    <span>{formatTime(job.time)} ({job.duration} min)</span>
                </div>
                <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-teal-500" />
                    <span>{job.trade}</span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex space-x-2">
                <button
                    onClick={() => onStatusChange(job.id, job.status === 'Completed' ? 'Scheduled' : 'Completed')}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-green-500 text-green-700 hover:bg-green-50 transition duration-150"
                >
                    <CheckCircle className="w-4 h-4 inline mr-1" /> Finish
                </button>
                <button
                    onClick={() => onStatusChange(job.id, 'In Progress')}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition duration-150"
                >
                    <Clock className="w-4 h-4 inline mr-1" /> Start
                </button>
            </div>
        </div>
    );
}
