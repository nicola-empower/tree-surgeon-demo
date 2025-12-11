import React from 'react';
import { Phone, ClipboardCheck, Wrench, ThumbsUp } from 'lucide-react';

const steps = [
    {
        title: 'Consultation',
        desc: 'We discuss your needs and assess the work required.',
        icon: Phone,
    },
    {
        title: 'Fixed Quote',
        desc: 'You get a clear, detailed price. No hidden fees.',
        icon: ClipboardCheck,
    },
    {
        title: 'Execution',
        desc: 'Our certified team completes the work to the highest standard.',
        icon: Wrench,
    },
    {
        title: 'Sign-Off',
        desc: 'We inspect the work together to ensure you are 100% satisfied.',
        icon: ThumbsUp,
    },
];

const ProcessFlow = () => {
    return (
        <div className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent">Our Process</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Simple, Stress-Free Service
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {steps.map((step, stepIdx) => (
                        <div key={step.title} class="relative">
                            <div class="flex flex-col items-center text-center">
                                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg mb-6">
                                    <step.icon size={32} />
                                </div>
                                <h3 class="text-lg font-bold leading-8 text-gray-900">{step.title}</h3>
                                <p class="mt-2 text-base leading-7 text-gray-500">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcessFlow;
