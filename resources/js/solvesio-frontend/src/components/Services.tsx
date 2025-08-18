import React from 'react';
import { Code, Palette, Search, Settings, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12" />,
      title: "Web Development",
      description: "Custom websites built with modern technologies for optimal performance and scalability.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Secure & Reliable"]
    },
    {
      icon: <Palette className="h-12 w-12" />,
      title: "UI/UX Design",
      description: "Beautiful, user-friendly interfaces that engage visitors and convert them into customers.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
    },
    {
      icon: <Search className="h-12 w-12" />,
      title: "SEO Optimization",
      description: "Boost your online visibility and attract more customers with our proven SEO strategies.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics & Reporting"]
    },
    {
      icon: <Settings className="h-12 w-12" />,
      title: "Website Maintenance",
      description: "Keep your website running smoothly with regular updates, backups, and security monitoring.",
      features: ["Regular Updates", "Security Monitoring", "Performance Optimization", "24/7 Support"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive web solutions tailored to your business needs. From concept to launch, 
            we deliver exceptional results that drive growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
            >
              {/* Icon */}
              <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Button */}
              <button className="group/btn text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center transition-colors duration-300">
                Learn More
                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;