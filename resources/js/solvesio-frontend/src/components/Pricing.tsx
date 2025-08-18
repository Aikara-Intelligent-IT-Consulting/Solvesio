import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "$999",
      period: "one-time",
      description: "Perfect for small businesses and startups",
      features: [
        "5-page website",
        "Responsive design",
        "Contact form",
        "Basic SEO setup",
        "1 month support",
        "Social media integration"
      ],
      popular: false,
      buttonText: "Get Started",
      buttonClass: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    },
    {
      name: "Standard",
      price: "$1,999",
      period: "one-time",
      description: "Ideal for growing businesses",
      features: [
        "10-page website",
        "Custom design",
        "CMS integration",
        "Advanced SEO",
        "3 months support",
        "Analytics setup",
        "Performance optimization",
        "E-commerce ready"
      ],
      popular: true,
      buttonText: "Most Popular",
      buttonClass: "bg-blue-500 text-white hover:bg-blue-600"
    },
    {
      name: "Premium",
      price: "$3,999",
      period: "one-time",
      description: "Complete solution for enterprises",
      features: [
        "Unlimited pages",
        "Custom development",
        "Advanced features",
        "Premium SEO package",
        "6 months support",
        "Multi-language support",
        "API integrations",
        "Priority support",
        "Maintenance included",
        "Training sessions"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonClass: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple <span className="text-blue-500">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include our standard features 
            with no hidden fees or long-term commitments.
          </p>
          
          {/* Money Back Guarantee */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            <Check className="h-4 w-4 mr-2" />
            30-day money-back guarantee
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Need a custom solution? We'd love to discuss your project.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-semibold border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300">
            Contact us for a custom quote →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;