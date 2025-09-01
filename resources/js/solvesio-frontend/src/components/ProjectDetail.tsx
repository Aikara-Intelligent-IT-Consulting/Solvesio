import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function DetailPage() {
    const { id } = useParams(); // ambil id dari route

    // Data dummy detail (nanti bisa diganti dari API / props)
    const detail = {
        id,
        title: "Solvesio Project",
        description:
            "Ini adalah halaman detail untuk project Solvesio. Halaman ini menampilkan informasi lengkap mengenai project, fitur, dan manfaatnya.",
        image: "/assets/img/Logo Solvesio.png",
        date: "31 Agustus 2025",
        category: "Web Development",
        tags: ["React", "TailwindCSS", "Laravel API"],
        liveUrl: "#",
        githubUrl: "#",
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header activeSection="projects" setActiveSection={() => { }} />

            <main>
                {/* Hero / Page Header */}
                <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                                {detail.title}
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                            Detail lengkap dari project {detail.title}.
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
                                <li>
                                    <Link
                                        to="/projects"
                                        className="hover:text-blue-600 transition-colors duration-300"
                                    >
                                        Projects
                                    </Link>
                                </li>
                                <li className="text-gray-400">/</li>
                                <li className="text-gray-900 font-semibold">
                                    {detail.title}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </section>

                {/* Detail Section */}
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Gambar */}
                        <div className="w-full">
                            <img
                                src={detail.image}
                                alt={detail.title}
                                className="w-full rounded-2xl shadow-lg object-contain"
                            />
                        </div>

                        {/* Konten */}
                        <div className="space-y-6">
                            {/* Category */}
                            <div className="text-sm text-blue-500 font-medium">
                                {detail.category}
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-900">
                                {detail.title}
                            </h2>

                            {/* Date */}
                            <p className="text-sm text-gray-400">
                                Dipublikasikan: {detail.date}
                            </p>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {detail.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {detail.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="pt-4 flex gap-4">
                                <a
                                    href={detail.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Lihat Live
                                </a>
                                <a
                                    href={detail.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition flex items-center gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    Lihat Github
                                </a>
                                <Link
                                    to="/"
                                    className="inline-flex items-center text-gray-700 hover:text-blue-600 transition ml-auto"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
