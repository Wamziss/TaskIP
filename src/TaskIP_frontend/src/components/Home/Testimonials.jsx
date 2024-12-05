import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import avatar from '../../assets/avatar.png';

export const Testimonials = () => {
  const testimonialsData = [
    {
      quote: "TaskIP has transformed how our team collaborates. The blockchain integration gives us peace of mind about our data security.",
      author: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp",
      image: avatar
    },
    {
      quote: "The best project management tool I've used. Perfect for our agile workflow and the decentralized approach is revolutionary.",
      author: "Michael Lee",
      role: "Software Developer",
      company: "InnovateTech",
      image: avatar
    },
    {
      quote: "TaskIP's analytics help us identify bottlenecks and improve productivity. The transparency is unmatched.",
      author: "Emily Rodriguez",
      role: "Team Lead",
      company: "Creative Solutions",
      image: avatar
    }
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <motion.section 
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      id="testimonials" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#A4C3E3]"
        >
          What Our Users Say
        </motion.h2>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg"
        >
          Join thousands of satisfied teams already using TaskIP to achieve more.
        </motion.p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.2 
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(74, 144, 226, 0.1)"
              }}
              className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                <MessageCircle className="w-24 h-24 text-[#4A90E2]/10" />
              </div>
              
              <p className="italic text-gray-600 mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center space-x-4 relative z-10">
                <motion.img
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full border-2 border-[#4A90E2]/20"
                />
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-sm text-[#4A90E2]">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
