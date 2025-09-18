import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
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
    client_name?: string;
    completion_date?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
    projects_count: number;
}

const AllProjects: React.FC = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects and categories
    useEffect(() => {
        fetchData();
    }, [activeFilter]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [projectsResponse, categoriesResponse] = await Promise.all([
                fetch(`/api/portfolio/projects?category=${activeFilter}`),
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

    // Create filters array with dynamic categories
    const filters = [
        { id: 'all', label: 'All Projects', count: projects.length },
        ...categories.map(category => ({
            id: category.slug,
            label: category.name,
            count: category.projects_count
        }))
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header activeSection={activeSection} setActiveSection={setActiveSection} />
                <main className="pt-32">
                    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading projects...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Header activeSection={activeSection} setActiveSection={setActiveSection} />
                <main className="pt-32">
                    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <button 
                            onClick={fetchData}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                    activeFilter === filter.id
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {filter.label} ({filter.count})
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
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
                                                        className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </button>
                                                    {project.project_url && (
                                                        <a
                                                            href={project.project_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-colors duration-200 flex items-center justify-center"
                                                        >
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    )}
                                                </div>

                                                {/* Featured Badge */}
                                                {project.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Details */}
                                            <div className="p-6">
                                                {/* Category */}
                                                <div 
                                                    className="text-sm font-medium mb-2"
                                                    style={{ color: project.category_color }}
                                                >
                                                    {project.category}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                    {project.title}
                                                </h3>

                                                {/* Client */}
                                                {project.client_name && (
                                                    <p className="text-sm text-gray-500 mb-2">
                                                        Client: {project.client_name}
                                                    </p>
                                                )}

                                                {/* Description */}
                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {project.description}
                                                </p>

                                                {/* Completion Date */}
                                                {project.completion_date && (
                                                    <p className="text-xs text-gray-400 mb-4">
                                                        Completed: {new Date(project.completion_date).toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'long' 
                                                        })}
                                                    </p>
                                                )}

                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="max-w-md mx-auto">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No projects found
                                    </h3>
                                    <p className="text-gray-500">
                                        {activeFilter === 'all' 
                                            ? "We haven't added any projects yet." 
                                            : `No projects found in the ${filters.find(f => f.id === activeFilter)?.label} category.`
                                        }
                                    </p>
                                    <button
                                        onClick={() => setActiveFilter('all')}
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                                    >
                                        View All Projects
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats Section */}
                    {projects.length > 0 && (
                        <div className="mt-16 border-t pt-8">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {projects.length}
                                        </div>
                                        <div className="text-gray-600">
                                            {activeFilter === 'all' ? 'Total Projects' : 'Projects in Category'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {categories.length}
                                        </div>
                                        <div className="text-gray-600">Categories</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {projects.filter(p => p.featured).length}
                                        </div>
                                        <div className="text-gray-600">Featured Projects</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {projects.filter(p => p.project_url).length}
                                        </div>
                                        <div className="text-gray-600">Live Projects</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

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
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AllProjects;