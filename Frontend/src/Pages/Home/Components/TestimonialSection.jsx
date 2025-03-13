import React from "react";
import { Card } from "flowbite-react";

const TestimonialSection = () => {
  // Testimonials Data
  const testimonialsData = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      quote:
        "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote:
        "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      image: "https://randomuser.me/api/portraits/women/74.jpg",
      quote:
        "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
    },
  ];

  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
