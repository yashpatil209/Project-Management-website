import React, {useState , useEffect} from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight,
  BarChart2,
  Calendar,
  Layout
} from 'lucide-react'

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose TaskFlow?</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to manage your projects effectively</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8 text-indigo-600" />,
                title: "Real-time Updates",
                description: "Stay informed with instant notifications and live project updates"
              },
              {
                icon: <Users className="h-8 w-8 text-indigo-600" />,
                title: "Team Collaboration",
                description: "Work together seamlessly with built-in communication tools"
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-indigo-600" />,
                title: "Analytics & Insights",
                description: "Make data-driven decisions with powerful analytics"
              },
              {
                icon: <Calendar className="h-8 w-8 text-indigo-600" />,
                title: "Smart Scheduling",
                description: "Automate task scheduling and resource allocation"
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-indigo-600" />,
                title: "Task Management",
                description: "Organize and track tasks with intuitive interfaces"
              },
              {
                icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
                title: "Resource Planning",
                description: "Optimize resource allocation across projects"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border border-gray-200 hover:border-indigo-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  );
}

export default FeaturesSection;
