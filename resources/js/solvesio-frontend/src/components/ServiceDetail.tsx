import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Code, Palette, Search, Settings } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const services = [
    {
        title: "Web Development",
        description:
            "Custom websites built with modern technologies for optimal performance and scalability.",
        longDescription:
            "Kami menyediakan layanan pengembangan website modern yang cepat, aman, dan mudah di-maintain. Dengan teknologi seperti React, Laravel, dan TailwindCSS, website Anda akan responsif, SEO-friendly, dan scalable untuk kebutuhan bisnis jangka panjang.",
        image: <Code className="h-12 w-12" />,
        date: "01 September 2025",
        category: "Development",
        tags: ["React", "Laravel", "TailwindCSS", "API"],
    },
    {
        title: "UI/UX Design",
        description:
            "Beautiful, user-friendly interfaces that engage visitors and convert them into customers.",
        longDescription:
            "Kami mengutamakan pengalaman pengguna melalui riset, wireframing, dan prototyping. Desain dibuat agar sesuai kebutuhan bisnis sekaligus meningkatkan engagement dan konversi.",
        image: <Palette className="h-12 w-12" />,
        date: "01 September 2025",
        category: "Design",
        tags: ["Figma", "Prototyping", "Wireframe", "User Research"],
    },
    {
        title: "SEO Optimization",
        description:
            "Boost your online visibility and attract more customers with our proven SEO strategies.",
        longDescription:
            "Dengan strategi SEO berbasis riset kata kunci, optimasi on-page, dan technical SEO, kami membantu website Anda mendapatkan peringkat lebih baik di mesin pencari dan menarik lebih banyak traffic organik.",
        image: <Search className="h-12 w-12" />,
        date: "01 September 2025",
        category: "Marketing",
        tags: ["SEO", "Google Analytics", "Keyword Research", "Reporting"],
    },
    {
        title: "Website Maintenance",
        description:
            "Keep your website running smoothly with regular updates, backups, and security monitoring.",
        longDescription:
            "Website yang sehat membutuhkan maintenance rutin. Kami menyediakan layanan update, monitoring keamanan, backup data, dan dukungan 24/7 agar website Anda selalu optimal.",
        image: <Settings className="h-12 w-12" />,
        date: "01 September 2025",
        category: "Support",
        tags: ["Updates", "Security", "Performance", "Support"],
    },
];

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const service = services[parseInt(id || "0")];

    if (!service) {
        return (
            <div className="min-h-screen bg-white">
                <Header activeSection="services" setActiveSection={() => { }} />
                <main className="py-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Service not found
                    </h2>
                    <Link
                        to="/"
                        className="inline-flex items-center text-blue-500 hover:text-blue-600"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Services
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header activeSection="services" setActiveSection={() => { }} />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-grid-pattern bg-grid opacity-10 pointer-events-none"></div>

                    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                            {service.title}
                        </h1>
                        <p className="text-lg max-w-2xl mx-auto mb-6 opacity-90">
                            Temukan detail lengkap mengenai layanan{" "}
                            <span className="font-semibold">{service.title}</span> yang kami tawarkan.
                        </p>
                        {/* Breadcrumb */}
                        <nav className="flex justify-center">
                            <ol className="flex items-center space-x-2 text-sm bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                                <li>
                                    <Link to="/" className="hover:underline">Home</Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link to="/services" className="hover:underline">Services</Link>
                                </li>
                                <li>/</li>
                                <li className="font-semibold text-white">{service.title}</li>
                            </ol>
                        </nav>
                    </div>
                </section>


                {/* Detail Section */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">

                        {/* Kolom gambar (stacked) */}
                        <div className="flex flex-col gap-6 h-full">
                            <div className="flex items-center justify-center w-full flex-1 bg-gray-100 rounded-3xl shadow-inner">
                                {service.image}
                            </div>
                            <div className="flex items-center justify-center w-full flex-1 bg-gray-100 rounded-3xl shadow-inner">
                                {service.image}
                            </div>
                            <div className="flex items-center justify-center w-full flex-1 bg-gray-100 rounded-3xl shadow-inner">
                                {service.image}
                            </div>
                        </div>

                        {/* Kolom konten */}
                        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 flex flex-col justify-between">
                            {/* Category */}
                            {/* <span className="inline-block px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
                                {service.category}
                            </span> */}

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h2>

                            {/* Date */}
                            <p className="text-sm text-gray-400 mb-6">
                                Dipublikasikan: {service.date}
                            </p>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-8">
                                {service.longDescription}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {service.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full font-medium border border-blue-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Divider */}
                            <hr className="my-6 border-gray-200" />

                            {/* Fitur Utama */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fitur Utama:</h3>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Kualitas layanan profesional sesuai standar industri</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Dukungan penuh dari tim ahli berpengalaman</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                                    <span className="text-gray-700">Fleksibel & dapat disesuaikan dengan kebutuhan bisnis Anda</span>
                                </li>
                            </ul>

                            {/* Manfaat */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Manfaat untuk Anda:</h3>
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                <div className="p-4 bg-blue-50 rounded-xl text-blue-800 font-medium">
                                    🚀 Efisiensi meningkat
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl text-purple-800 font-medium">
                                    💡 Solusi inovatif
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl text-green-800 font-medium">
                                    🤝 Dukungan penuh
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-xl text-yellow-800 font-medium">
                                    📈 Hasil terukur
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Home
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-emerald-700 transition"
                                >
                                    Hubungi Kami
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
