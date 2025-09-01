import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
            description: "Modern e-commerce solution with advanced filtering and payment integration.",
            tags: ["React", "Node.js", "Stripe", "MongoDB"]
        },
        {
            title: "Healthcare Dashboard",
            category: "UI/UX Design",
            image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Clean, intuitive dashboard for healthcare professionals to manage patient data.",
            tags: ["Figma", "React", "Charts", "Responsive"]
        },
        {
            title: "Restaurant Website",
            category: "Web Development",
            image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Elegant restaurant website with online reservations and menu showcase.",
            tags: ["WordPress", "PHP", "MySQL", "SEO"]
        },
        {
            title: "Real Estate Platform",
            category: "Full Stack",
            image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Comprehensive real estate platform with property listings and virtual tours.",
            tags: ["Vue.js", "Laravel", "Maps API", "Search"]
        },
        {
            title: "Fitness App",
            category: "Mobile Design",
            image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Modern fitness tracking app with workout plans and progress monitoring.",
            tags: ["React Native", "Firebase", "Charts", "Push Notifications"]
        },
        {
            title: "Corporate Website",
            category: "Web Development",
            image: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Professional corporate website with CMS and multi-language support.",
            tags: ["Next.js", "TypeScript", "CMS", "i18n"]
        }
    ];

    return (
        <section id="portfolio" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-blue-500">Portfolio</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover some of our recent projects and see how we've helped businesses
                        achieve their digital goals with innovative solutions.
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <Link to={`/projects/${index}`} className="block">
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
                                            onClick={(e) => {
                                                e.preventDefault();     // mencegah navigasi Link
                                                e.stopPropagation();    // menghentikan event bubbling ke parent
                                                setSelectedImage(project.image); // aksi custom-mu
                                            }}
                                            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </button>
                                        <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200">
                                            <Github className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Project Details */}
                                < div className="p-6" >
                                    <div className="text-sm text-blue-500 font-medium mb-2">
                                        {project.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    < div className="flex flex-wrap gap-2" >
                                        {
                                            project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Link>
                        </div >
                    ))}
                </div >

                {/* View More Button */}
                < div className="text-center mt-12" >
                    <Link
                        to="/projects"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-decoration-none">
                        View All Projects
                    </Link>
                </div >
            </div >

            {/* Modal for Image Preview */}
            {
                selectedImage && (
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
                )
            }
        </section >
    );
};

export default Portfolio;
