export interface Job {
    id: number;
    title: string;
    client: string;
    address: string;
    time: string;
    duration: number; // minutes
    trade: string;
    status: 'Scheduled' | 'In Progress' | 'Completed';
    price?: number;
    date: string;
    location?: { lat: number; lng: number };
}

export const MOCK_TRADES = [
    'Plumbing',
    'Electrical',
    'Joinery',
    'Roofing',
    'Landscaping',
    'Locksmith',
    'Painting',
    'Cleaning',
    'Building',
    'Tree Surgery',
    'Gas Engineering'
];

export const MOCK_JOBS: Job[] = [
    {
        id: 1,
        title: 'Emergency Leak Repair',
        client: 'Sarah Jenkins',
        address: '12 Oak Avenue, Glasgow',
        time: '09:00',
        duration: 90,
        trade: 'Plumbing',
        status: 'Completed',
        price: 150.00,
        date: new Date().toISOString().split('T')[0],
        location: { lat: 55.8642, lng: -4.2518 }
    },
    {
        id: 2,
        title: 'Boiler Service',
        client: 'Mike Ross',
        address: '45 High Street, Edinburgh',
        time: '11:00',
        duration: 60,
        trade: 'Gas Engineering',
        status: 'Scheduled',
        price: 85.00,
        date: new Date().toISOString().split('T')[0],
        location: { lat: 55.9533, lng: -3.1883 }
    },
    {
        id: 3,
        title: 'Light Fitting Installation',
        client: 'Emma Watson',
        address: '8 West End, Glasgow',
        time: '14:00',
        duration: 45,
        trade: 'Electrical',
        status: 'In Progress',
        price: 65.00,
        date: new Date().toISOString().split('T')[0],
        location: { lat: 55.8642, lng: -4.2518 }
    }
];
