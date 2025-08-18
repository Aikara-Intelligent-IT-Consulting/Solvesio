import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }),
        });
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent("Hi, I'm interested in your web development services. Can we discuss my project?");
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get In <span className="text-blue-500">Touch</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to start your project? We'd love to hear from you.
                        Send us a message and we'll respond within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Let's Start a Conversation
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Whether you need a new website, want to redesign your existing one,
                                or have questions about our services, we're here to help you succeed online.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Mail className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                                    <p className="text-gray-600">hello@solvesio.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Phone className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <MapPin className="h-6 w-6 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Visit Us</h4>
                                    <p className="text-gray-600">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <div className="pt-6">
                            <button
                                onClick={openWhatsApp}
                                className="group bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-3"
                            >
                                <MessageCircle className="h-5 w-5" />
                                <span>Chat on WhatsApp</span>
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="group w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                            >
                                <Send className="h-5 w-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
