import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 projects",
        "15 team members",
        "Basic analytics",
        "Standard support"
      ],
      recommended: false
    },
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      description: "For growing teams that need more",
      features: [
        "Unlimited projects",
        "Unlimited team members",
        "Advanced analytics",
        "Priority support",
        "Governance participation",
        "Custom workflows"
      ],
      recommended: true
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="pricing" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] to-[#A4C3E3]"
        >
          Simple, Transparent Pricing
        </motion.h2>
        
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
          Choose the perfect plan for your team's needs. No hidden fees.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(74, 144, 226, 0.1)"
              }}
              className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                plan.recommended 
                  ? "border-2 border-[#4A90E2]/30 bg-white" 
                  : "bg-white"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-8 right-1 bg-[#4A90E2] text-white px-8 py-1 text-xs transform translate-x-1/4 -translate-y-1/2 rotate-45 z-999">
                  Recommended
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#4A90E2]">{plan.price}</span>
                  {plan.period && <span className="text-gray-500">{plan.period}</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full px-6 py-3 rounded-full transition duration-300 ${
                    plan.recommended 
                      ? "bg-[#4A90E2] text-white hover:bg-[#3A7BC8]" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Choose Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Pricing;
