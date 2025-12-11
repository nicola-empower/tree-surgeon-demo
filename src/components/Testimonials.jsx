import React from 'react';
import { Star } from 'lucide-react';

const defaultReviews = [
    {
        text: "We had a huge Ash tree taken down over our greenhouse. The team used ropes to lower every branch. Nothing was damaged, and they even swept the driveway.",
        author: "The Harrison Family",
        location: "Richmond",
        rating: 5,
        role: "Sectional Felling"
    },
    {
        text: "Another company wanted to chop it down. Royal Oak suggested a crown thin and dead-wooding. The tree looks healthier than ever and we get to keep our shade.",
        author: "Mr. T. Clarke",
        location: "Wimbledon",
        rating: 5,
        role: "Tree Preservation"
    },
    {
        text: "They handled the council application for our TPO tree completely. Very professional and knowledgeable.",
        author: "Sarah J.",
        location: "Kew",
        rating: 5,
        role: "TPO Management"
    }
];

const Testimonials = ({ reviews = defaultReviews }) => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-accent">Testimonials</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Leaving Your Garden Spotless
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div key={index} className="flex flex-col justify-between bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-2xl sm:p-10 hover:shadow-md transition-shadow">
                            <div className="flex gap-1 mb-4 text-accent">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-gray-900 text-lg leading-8 grow">
                                <p>“{review.text}”</p>
                            </blockquote>
                            <div className="mt-8 flex items-center gap-x-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                    {review.author.charAt(0)}
                                </div>
                                <div className="text-sm leading-6">
                                    <div className="font-semibold text-gray-900">{review.author}</div>
                                    <div className="text-gray-600">{review.role || review.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
