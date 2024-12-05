import { 
    Zap, CheckCircle2, Users, Shield, 
    BarChart3, Globe 
  } from 'lucide-react';

  import create from '../../assets/create.png';
import task from '../../assets/task.png';
import team from '../../assets/team.png';
import global from '../../assets/global.png';
import analytics from '../../assets/analytics.png';
import blockchainsecurity from '../../assets/blockchainsecurity.jpg';

  
  export const Features = () => {
    const featuresData = [
      {
        title: "Intuitive Project Creation",
        description: "Create and customize projects in minutes with our user-friendly interface.",
        icon: <Zap className="w-6 h-6 text-[#4A90E2]" />,
        image: create
      },
      {
        title: "Smart Task Management",
        description: "Assign, track, and prioritize tasks effortlessly across your team.",
        icon: <CheckCircle2 className="w-6 h-6 text-[#4A90E2]" />,
        image: task
      },
      {
        title: "Real-time Collaboration",
        description: "Work together seamlessly with instant updates and in-app messaging.",
        icon: <Users className="w-6 h-6 text-[#4A90E2]" />,
        image: team
      },
      {
        title: "Blockchain Security",
        description: "Enjoy unparalleled security with blockchain-based data protection.",
        icon: <Shield className="w-6 h-6 text-[#4A90E2]" />,
        image: blockchainsecurity
      },
      {
        title: "Advanced Analytics",
        description: "Gain valuable insights with detailed project and team performance reports.",
        icon: <BarChart3 className="w-6 h-6 text-[#4A90E2]" />,
        image: analytics
      },
      {
        title: "Global Accessibility",
        description: "Access your projects from anywhere with decentralized infrastructure.",
        icon: <Globe className="w-6 h-6 text-[#4A90E2]" />,
        image: global
      }
    ];
  
    return (
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose TaskIP?</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Experience the perfect blend of traditional project management and blockchain innovation.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };