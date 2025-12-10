import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ data = null }) => {
    const defaultFAQs = [
        {
            question: "Do you offer free estimates?",
            answer: "Yes, we provide free, no-obligation quotes for all our services. Contact us today to schedule a visit."
        },
        {
            question: "Are you fully insured and accredited?",
            answer: "Absolutely. We carry full public liability insurance and are registered with relevant trade bodies for your peace of mind."
        },
        {
            question: "What areas do you cover?",
            answer: "We cover the entire local region and surrounding towns. Give us a call to check if we service your specific postcode."
        },
        {
            question: "Do you provide emergency services?",
            answer: "Yes, we have a dedicated team available for urgent calls. Please check our emergency contact number for immediate assistance."
        }
    ];

    const faqs = data || defaultFAQs;

    return (
        <section className="py-24 bg-white" itemScope itemType="https://schema.org/FAQPage">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Common questions about our services and process.
                    </p>
                </div>
                <div className="mx-auto max-w-3xl divide-y divide-gray-900/10">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <summary className="flex w-full cursor-pointer items-start justify-between text-left text-gray-900 transition-colors hover:text-accent">
                                <span className="text-lg font-semibold leading-7" itemProp="name">{faq.question}</span>
                                <span className="ml-6 flex h-7 items-center">
                                    <ChevronDown className="h-6 w-6 rotate-0 transform transition-transform duration-200 group-open:-rotate-180" />
                                </span>
                            </summary>
                            <div className="mt-4 pr-12" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                                <p className="text-base leading-7 text-gray-600" itemProp="text">
                                    {faq.answer}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
