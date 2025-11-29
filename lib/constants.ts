// Define the interface for type safety
export interface Event {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

// The array of event data
export const events: Event[] = [
    {
        image: '/images/event-1.png',
        title: 'Next.js Global Conference 2026',
        slug: 'nextjs-global-conference-2026',
        location: 'San Francisco, CA & Online',
        date: 'October 25, 2026',
        time: '9:00 AM - 5:00 PM PST',
    },
    {
        image: '/images/event-1.png',
        title: 'DevOps World Summit: The Cloud Native',
        slug: 'devops-world-summit-cloud-native',
        location: 'Virtual - Global Access',
        date: 'November 8 - 10, 2026',
        time: '7:30 AM - 3:00 PM GMT',
    },
    {
        image: '/images/event-1.png',
        title: 'Artificial Intgl. & Machine Expo',
        slug: 'ai-ml-expo-2026',
        location: 'New York City, NY',
        date: 'September 12, 2026',
        time: '10:00 AM - 6:00 PM EST',
    },
    {
        image: '/images/event-1.png',
        title: 'Cyber Security Tech Forum 2026',
        slug: 'cyber-security-tech-forum-2026',
        location: 'Austin, TX',
        date: 'April 19 - 21, 2026',
        time: '8:00 AM - 5:00 PM CDT',
    },
    {
        image: '/images/event-1.png',
        title: 'Inclusive Web Design Workshop',
        slug: 'inclusive-web-design-workshop',
        location: 'Online Workshop (Interactive)',
        date: 'January 28, 2026',
        time: '1:00 PM - 4:00 PM EST',
    },
    {
        image: '/images/event-1.png',
        title: 'Blockchain & Web3 Developer Festival',
        slug: 'blockchain-web3-developer-festival',
        location: 'Dubai, UAE',
        date: 'March 5 - 7, 2026',
        time: '9:30 AM - 6:30 PM GST',
    },
    {
        image: '/images/event-1.png',
        title: 'Local Rust Lang Meetup: Performance ',
        slug: 'rust-lang-meetup-performance-deep-dive',
        location: 'The Tech Hub, London, UK',
        date: 'July 15, 2026',
        time: '6:30 PM - 8:30 PM BST',
    },
    {
        image: '/images/event-1.png',
        title: 'Global Open Source Contributor Day',
        slug: 'global-open-source-contributor-day',
        location: 'Virtual (Timezone Agnostic Tracks)',
        date: 'May 30, 2026',
        time: '24 Hour Event',
    },
];
