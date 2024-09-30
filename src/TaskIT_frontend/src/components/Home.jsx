import React from 'react';
import logo from '../assets/logo.svg';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A4C3E3] to-white text-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <img src={logo} alt="TaskIT Logo" className="w-32 h-12" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#testimonials" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
                <a href="#pricing" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              </div>
            </div>
            <div>
              <button className="bg-[#4A90E2] text-white px-4 py-2 rounded-full hover:bg-[#3A7BC8] transition duration-300" onClick={()=> {window.location.href = './dashboard'}}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#A4C3E3] to-[#4A90E2]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Revolutionize Your Project Management with TaskIT
        </h1>
        <p className="text-lg md:text-xl text-white mt-4 max-w-2xl mx-auto">
          Effortlessly create, manage, and collaborate on projects. TaskIT empowers teams to achieve more, 
          faster and smarter.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-white text-[#4A90E2] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Get Started Free
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#4A90E2] transition duration-300">
            Watch Demo
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskIT?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Intuitive Project Creation",
              description: "Create and customize projects in minutes with our user-friendly interface.",
              icon: "📊"
            },
            {
              title: "Smart Task Management",
              description: "Assign, track, and prioritize tasks effortlessly across your team.",
              icon: "✅"
            },
            {
              title: "Real-time Collaboration",
              description: "Work together seamlessly with instant updates and in-app messaging.",
              icon: "👥"
            },
            {
              title: "Secure File Sharing",
              description: "Share and store project files with bank-level encryption.",
              icon: "🔒"
            },
            {
              title: "Customizable Workflows",
              description: "Tailor TaskIT to fit your unique project management needs.",
              icon: "🔧"
            },
            {
              title: "Insightful Analytics",
              description: "Gain valuable insights with detailed project and team performance reports.",
              icon: "📈"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Blockchain Advantages Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Why Blockchain?</h2>
        
        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full  transition duration-300"
            onClick={() => document.getElementById('scrollable-container').scrollBy({ left: -300, behavior: 'smooth' })}
          >
            <i className="bi bi-chevron-left text-2xl"></i> {/* Bootstrap left arrow icon */}
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full transition duration-300"
            onClick={() => document.getElementById('scrollable-container').scrollBy({ left: 300, behavior: 'smooth' })}
          >
            <i className="bi bi-chevron-right text-2xl"></i> {/* Bootstrap right arrow icon */}
          </button>


          {/* Scrollable Content */}
          <div id="scrollable-container" className="flex overflow-x-hidden gap-8 py-4 px-10">
            {[
              {
                title: "Decentralized Governance",
                description: "Participate in platform decisions and shape the future of TaskIT.",
                icon: "🏛️"
              },
              {
                title: "Enhanced Security",
                description: "Benefit from the immutable and encrypted nature of blockchain technology.",
                icon: "🛡️"
              },
              {
                title: "Transparent Operations",
                description: "All platform activities are recorded on the blockchain for full transparency.",
                icon: "👁️"
              },
              {
                title: "Token Incentives",
                description: "Earn tokens for completing tasks and contributing to projects.",
                icon: "🪙"
              },
              {
                title: "Interoperability",
                description: "Easily integrate with other blockchain-based tools and services.",
                icon: "🔗"
              },
              {
                title: "Global Accessibility",
                description: "Access your projects from anywhere without centralized server limitations.",
                icon: "🌍"
              }
            ].map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 min-w-[300px]">
                <div className="text-4xl mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "TaskIT has transformed how our team collaborates. It's intuitive and powerful!",
              author: "Sarah J., Project Manager"
            },
            {
              quote: "The best project management tool I've used. It's perfect for our agile workflow.",
              author: "Michael L., Software Developer"
            },
            {
              quote: "TaskIT's analytics help us identify bottlenecks and improve our productivity.",
              author: "Emily R., Team Lead"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-[#4A90E2]">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {[
            {
              name: "Basic",
              price: "Free",
              features: ["Up to 5 projects", "15 team members", "Basic analytics"]
            },
            {
              name: "Pro",
              price: "$15",
              features: ["Unlimited projects", "unlimited team members", "Advanced analytics", "Participate in governance"]
            }
          ].map((plan, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col">
              <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-center text-[#4A90E2] mb-6">{plan.price}<span className="text-base font-normal">{plan.price == 'Free'? '' : '/month'}</span></p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-auto w-full bg-[#4A90E2] text-white px-4 py-2 rounded-full hover:bg-[#3A7BC8] transition duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 lg:px-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto">
          {[
            {
              question: "How does TaskIT use blockchain technology?",
              answer: "TaskIT leverages blockchain to ensure data integrity, enable decentralized governance, and provide a transparent project management ecosystem."
            },
            {
              question: "What are the benefits of decentralized project management?",
              answer: "Decentralized project management offers enhanced security, global accessibility, and the ability for users to participate in platform governance."
            },
            {
              question: "Do I need to understand blockchain to use TaskIT?",
              answer: "Not at all! TaskIT is designed to be user-friendly, regardless of your blockchain knowledge. You can enjoy its benefits without any technical expertise."
            },
            {
              question: "How does governance participation work?",
              answer: "Pro plan users can vote on proposed changes to the platform, suggest new features, and have a say in the future direction of TaskIT."
            }
          ].map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{faq.question}</h3>
              <p className="text-gray-600 mb-6">{faq.answer}</p>
              <div style={{border: '.5px solid lightgray'}}></div>
            </div>
            
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#4A90E2] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Projects?</h2>
        <p className="text-xl mb-8">Join thousands of teams already using TaskIT to achieve more.</p>
        <button className="bg-white text-[#4A90E2] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          Get started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#4A90E2]">Features</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#4A90E2]">About Us</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Careers</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#4A90E2]">Blog</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#4A90E2]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#4A90E2]">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 TaskIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

