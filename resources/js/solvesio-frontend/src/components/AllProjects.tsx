import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const AllProjects: React.FC = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            category: "ecommerce",
            image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
            description: "Modern e-commerce solution with advanced filtering and payment integration.",
            tags: ["React", "Node.js", "Stripe", "MongoDB"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 2,
            title: "Healthcare Dashboard",
            category: "ui-ux",
            image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Clean, intuitive dashboard for healthcare professionals to manage patient data.",
            tags: ["Figma", "React", "Charts", "Responsive"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 3,
            title: "Restaurant Website",
            category: "web-development",
            image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Elegant restaurant website with online reservations and menu showcase.",
            tags: ["WordPress", "PHP", "MySQL", "SEO"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 4,
            title: "Real Estate Platform",
            category: "web-development",
            image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Comprehensive real estate platform with property listings and virtual tours.",
            tags: ["Vue.js", "Laravel", "Maps API", "Search"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 5,
            title: "Fitness Mobile App",
            category: "mobile",
            image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Modern fitness tracking app with workout plans and progress monitoring.",
            tags: ["React Native", "Firebase", "Charts", "Push Notifications"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 6,
            title: "Corporate Website",
            category: "corporate",
            image: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Professional corporate website with CMS and multi-language support.",
            tags: ["Next.js", "TypeScript", "CMS", "i18n"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 7,
            title: "Banking Dashboard",
            category: "ui-ux",
            image: "https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Secure banking dashboard with transaction management and analytics.",
            tags: ["React", "D3.js", "Security", "Analytics"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 8,
            title: "Online Learning Platform",
            category: "web-development",
            image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Interactive learning platform with video streaming and progress tracking.",
            tags: ["React", "Node.js", "Video API", "Progress Tracking"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 9,
            title: "Travel Booking App",
            category: "mobile",
            image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Beautiful travel booking app with destination discovery and booking features.",
            tags: ["Flutter", "Firebase", "Maps", "Payment Gateway"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 10,
            title: "Fashion E-Store",
            category: "ecommerce",
            image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Trendy fashion e-commerce store with AR try-on features.",
            tags: ["React", "AR.js", "Shopify", "Payment Integration"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 11,
            title: "Tech Startup Website",
            category: "corporate",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Modern startup website with investor portal and product showcase.",
            tags: ["Next.js", "TypeScript", "Animations", "SEO"],
            liveUrl: "#",
            githubUrl: "#"
        },
        {
            id: 12,
            title: "Food Delivery App",
            category: "mobile",
            image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Complete food delivery solution with real-time tracking and payments.",
            tags: ["React Native", "Node.js", "Real-time", "Payment Gateway"],
            liveUrl: "#",
            githubUrl: "#"
        }
    ];

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'web-development', label: 'Web Development' },
        { id: 'ui-ux', label: 'UI/UX Design' },
        { id: 'mobile', label: 'Mobile Apps' },
        { id: 'ecommerce', label: 'E-Commerce' },
        { id: 'corporate', label: 'Corporate' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Main Content */}
            <main>
                {/* Page Header */}
                <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 w-full h-full bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                                Our Complete Portfolio
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                            Explore our extensive collection of successful projects across various industries.
                        </p>
                        <nav className="flex justify-center">
                            <ol className="flex items-center space-x-2 text-gray-500">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-blue-600 transition-colors duration-300"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                <li className="text-gray-900 font-semibold">All Projects</li>
                            </ol>
                        </nav>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="py-6 bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Project Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Overlay Buttons */}
                                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => setSelectedImage(project.image)}
                                            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </button>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <Github className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="text-sm text-blue-500 font-medium mb-2">
                                        {filters.find(f => f.id === project.category)?.label || project.category}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    {/* Modal for Image Preview */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="relative max-w-4xl mx-auto p-4">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="rounded-lg max-h-[80vh] object-contain"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 flex items-center justify-center rounded-full shadow"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AllProjects;
