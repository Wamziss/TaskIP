
import React from 'react';
import { useAuth } from '../AuthContext';
import { ArrowRight} from 'lucide-react';
import { Navbar } from './Home/Navbar';
import { Features } from './Home/Features';
import { Testimonials } from './Home/Testimonials';
import Pricing from './Home/Pricing';
import FAQs from './Home/FAQs';
import Footer from './Home/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const authClient = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!authClient) {
      console.error("Authentication client not initialized");
      return;
    }
  
    try {
      let identityProvider = "https://identity.ic0.app";

      console.log("Identity Provider URL:", identityProvider);
      authClient.login({
        identityProvider,
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          console.log("Logged in as:", principal);
          navigate('/dashboard');
        },
        onError: (error) => {
          // Consider using a toast or modal for user feedback
          console.error("Login failed:", error);
          // Potentially show a user-friendly error message
        },
      });
    } catch (error) {
      console.error("Login process failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navbar with Glassmorphism */}
      <Navbar handleSignIn={handleSignIn} />

      {/* Enhanced Hero Section with Abstract Pattern */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#4A90E2] to-[#A4C3E3] py-20">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute w-full h-full text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Revolutionize Your
            <span className="block">Project Management</span>
          </h1>
          <p className="text-xl text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed">
            Effortlessly create, manage, and collaborate on projects with blockchain-powered security and transparency.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleSignIn}
              className="bg-white text-[#4A90E2] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition duration-300 flex items-center justify-center space-x-2 group shadow-lg"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition duration-300 flex items-center justify-center space-x-2">
              <span>Watch Demo</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <Features />

      <Testimonials />

      <Pricing />

      <FAQs />


      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#4A90E2] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Projects?</h2>
        <p className="text-xl mb-8">Join thousands of teams already using TaskIP to achieve more.</p>
        <button className="bg-white text-[#4A90E2] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={(event) => handleSignIn(event)}>
          Get started
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;




          {/* <div className="mt-16">
            <img 
              src="/api/placeholder/1200/600" 
              alt="TaskIP Dashboard Preview" 
              className="rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm"
            />
          </div> */}
