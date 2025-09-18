import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
    id: number;
    title: string;
    category: string;
    category_slug: string;
    category_color: string;
    image: string;
    description: string;
    technologies: string[];
    project_url?: string;
    featured: boolean;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    projects_count: number;
}

const Portfolio: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects and categories
    useEffect(() => {
        fetchData();
    }, [activeCategory]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projectsResponse, categoriesResponse] = await Promise.all([
                fetch(`/api/portfolio/projects?category=${activeCategory}&featured=true`),
                fetch('/api/portfolio/categories')
            ]);

            if (!projectsResponse.ok || !categoriesResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const projectsData = await projectsResponse.json();
            const categoriesData = await categoriesResponse.json();

            setProjects(projectsData.data);
            setCategories(categoriesData.data);
        } catch (err) {
            setError('Failed to load portfolio data');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section id="portfolio" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading portfolio...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="portfolio" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-500">{error}</p>
                        <button 
                            onClick={fetchData}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

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

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                            activeCategory === 'all'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        All Projects
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.slug)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                activeCategory === category.slug
                                    ? 'text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                            style={{
                                backgroundColor: activeCategory === category.slug ? category.color : undefined
                            }}
                        >
                            {category.name} ({category.projects_count})
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <Link to={`/projects/${project.id}`} className="block">
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
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedImage(project.image);
                                                }}
                                                className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                            {project.project_url && (
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200 block"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="p-6">
                                        <div 
                                            className="text-sm font-medium mb-2"
                                            style={{ color: project.category_color }}
                                        >
                                            {project.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No projects found for this category.</p>
                        </div>
                    )}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <Link
                        to="/projects"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-decoration-none"
                    >
                        View All Projects
                    </Link>
                </div>
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
    );
};

export default Portfolio;