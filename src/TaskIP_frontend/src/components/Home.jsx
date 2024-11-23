// import React from 'react';
// import logo from '../assets/logo.svg';
// import { useAuth } from '../AuthContext';

// const Home = () => {
//   const authClient = useAuth();

//   const handleSignIn = async (event) => {
//       event.preventDefault();
//       if (authClient) {
//           try {
//               let identityProvider = process.env.II_URL;
//               authClient.login({
//                   identityProvider,
//                   onSuccess: async () => {
//                       console.log("Logged in!");

//                       const identity = authClient.getIdentity();
//                       console.log(identity.getPrincipal().toText());
//                       window.location.href = './dashboard';
//                   },
//                   onError: (error) => {
//                       console.error("Login failed:", error);
//                   },
//               });
//           } catch (error) {
//               console.error("AuthClient login failed:", error);
//           }
//       }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#A4C3E3] to-white text-gray-800">
//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex-shrink-0">
//               <img src={logo} alt="TaskIP Logo" className="w-32 h-12" />
//             </div>
//             <div className="hidden md:block">
//               <div className="ml-10 flex items-baseline space-x-4">
//                 <a href="#features" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Features</a>
//                 <a href="#testimonials" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
//                 <a href="#pricing" className="hover:text-[#4A90E2] px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
//               </div>
//             </div>
//             <div>
//               <button className="bg-[#4A90E2] text-white px-4 py-2 rounded-full hover:bg-[#3A7BC8] transition duration-300" onClick={(event) => handleSignIn(event)}>
//                 Sign In
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="text-center py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-[#A4C3E3] to-[#4A90E2]">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//           Revolutionize Your Project Management with TaskIP
//         </h1>
//         <p className="text-lg md:text-xl text-white mt-4 max-w-2xl mx-auto">
//           Effortlessly create, manage, and collaborate on projects. TaskIP empowers teams to achieve more, 
//           faster and smarter.
//         </p>
//         <div className="mt-8 flex justify-center space-x-4">
//           <button className="bg-white text-[#4A90E2] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={(event) => handleSignIn(event)}>
//             Get Started Free
//           </button>
//           <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#4A90E2] transition duration-300">
//             Watch Demo
//           </button>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-16 px-6 md:px-12 lg:px-20 bg-white">
//         <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskIP?</h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {[
//             {
//               title: "Intuitive Project Creation",
//               description: "Create and customize projects in minutes with our user-friendly interface.",
//               icon: "📊"
//             },
//             {
//               title: "Smart Task Management",
//               description: "Assign, track, and prioritize tasks effortlessly across your team.",
//               icon: "✅"
//             },
//             {
//               title: "Real-time Collaboration",
//               description: "Work together seamlessly with instant updates and in-app messaging.",
//               icon: "👥"
//             },
//             {
//               title: "Secure File Sharing",
//               description: "Share and store project files with bank-level encryption.",
//               icon: "🔒"
//             },
//             {
//               title: "Customizable Workflows",
//               description: "Tailor TaskIP to fit your unique project management needs.",
//               icon: "🔧"
//             },
//             {
//               title: "Insightful Analytics",
//               description: "Gain valuable insights with detailed project and team performance reports.",
//               icon: "📈"
//             }
//           ].map((feature, index) => (
//             <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* Blockchain Advantages Section */}
//       <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
//         <h2 className="text-3xl font-bold text-center mb-12">Why Blockchain?</h2>
        
//         {/* Scrollable Container */}
//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full  transition duration-300"
//             onClick={() => document.getElementById('scrollable-container').scrollBy({ left: -300, behavior: 'smooth' })}
//           >
//             <i className="bi bi-chevron-left text-2xl"></i> {/* Bootstrap left arrow icon */}
//           </button>

//           {/* Right Arrow */}
//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full transition duration-300"
//             onClick={() => document.getElementById('scrollable-container').scrollBy({ left: 300, behavior: 'smooth' })}
//           >
//             <i className="bi bi-chevron-right text-2xl"></i> {/* Bootstrap right arrow icon */}
//           </button>


//           {/* Scrollable Content */}
//           <div id="scrollable-container" className="flex overflow-x-hidden gap-8 py-4 px-10">
//             {[
//               {
//                 title: "Decentralized Governance",
//                 description: "Participate in platform decisions and shape the future of TaskIP.",
//                 icon: "🏛️"
//               },
//               {
//                 title: "Enhanced Security",
//                 description: "Benefit from the immutable and encrypted nature of blockchain technology.",
//                 icon: "🛡️"
//               },
//               {
//                 title: "Transparent Operations",
//                 description: "All platform activities are recorded on the blockchain for full transparency.",
//                 icon: "👁️"
//               },
//               {
//                 title: "Token Incentives",
//                 description: "Earn tokens for completing tasks and contributing to projects.",
//                 icon: "🪙"
//               },
//               {
//                 title: "Interoperability",
//                 description: "Easily integrate with other blockchain-based tools and services.",
//                 icon: "🔗"
//               },
//               {
//                 title: "Global Accessibility",
//                 description: "Access your projects from anywhere without centralized server limitations.",
//                 icon: "🌍"
//               }
//             ].map((advantage, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 min-w-[300px]">
//                 <div className="text-4xl mb-4">{advantage.icon}</div>
//                 <h3 className="text-xl font-bold text-[#4A90E2] mb-2">{advantage.title}</h3>
//                 <p className="text-gray-600">{advantage.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>



//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-16 px-6 md:px-12 lg:px-20 bg-gray-100">
//         <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {[
//             {
//               quote: "TaskIP has transformed how our team collaborates. It's intuitive and powerful!",
//               author: "Sarah J., Project Manager"
//             },
//             {
//               quote: "The best project management tool I've used. It's perfect for our agile workflow.",
//               author: "Michael L., Software Developer"
//             },
//             {
//               quote: "TaskIP's analytics help us identify bottlenecks and improve our productivity.",
//               author: "Emily R., Team Lead"
//             }
//           ].map((testimonial, index) => (
//             <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//               <p className="italic mb-4">"{testimonial.quote}"</p>
//               <p className="font-semibold text-[#4A90E2]">{testimonial.author}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-16 px-6 md:px-12 lg:px-20 bg-white">
//         <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
//         <div className="grid gap-12 md:grid-cols-2">
//           {[
//             {
//               name: "Basic",
//               price: "Free",
//               features: ["Up to 5 projects", "15 team members", "Basic analytics"]
//             },
//             {
//               name: "Pro",
//               price: "$15",
//               features: ["Unlimited projects", "unlimited team members", "Advanced analytics", "Participate in governance"]
//             }
//           ].map((plan, index) => (
//             <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col">
//               <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
//               <p className="text-4xl font-bold text-center text-[#4A90E2] mb-6">{plan.price}<span className="text-base font-normal">{plan.price == 'Free'? '' : '/month'}</span></p>
//               <ul className="mb-8 flex-grow">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center mb-2">
//                     <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
import React from 'react';
import { useAuth } from '../AuthContext';
import { ArrowRight, CheckCircle2, Users, Shield, BarChart3, MessageCircle, Zap, Globe } from 'lucide-react';
import logo from '../assets/logo.svg';

const Home = () => {
  const authClient = useAuth();

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (authClient) {
      try {
        let identityProvider = process.env.II_URL;
        authClient.login({
          identityProvider,
          onSuccess: async () => {
            console.log("Logged in!");
            const identity = authClient.getIdentity();
            console.log(identity.getPrincipal().toText());
            window.location.href = './dashboard';
          },
          onError: (error) => {
            console.error("Login failed:", error);
          },
        });
      } catch (error) {
        console.error("AuthClient login failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navbar with Glassmorphism */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <img src={logo} alt="TaskIP Logo" className="w-32 h-12" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Features', 'Testimonials', 'Pricing'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-[#4A90E2] px-3 py-2 text-sm font-medium relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4A90E2] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>
            <button 
              onClick={handleSignIn}
              className="bg-[#4A90E2] text-white px-6 py-2 rounded-full hover:bg-[#3A7BC8] transition duration-300 flex items-center space-x-2 group"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

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
          {/* <div className="mt-16">
            <img 
              src="/api/placeholder/1200/600" 
              alt="TaskIP Dashboard Preview" 
              className="rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm"
            />
          </div> */}
        </div>
      </header>

      {/* Enhanced Features Section with Icons */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose TaskIP?</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Experience the perfect blend of traditional project management and blockchain innovation.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Intuitive Project Creation",
                description: "Create and customize projects in minutes with our user-friendly interface.",
                icon: <Zap className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              },
              {
                title: "Smart Task Management",
                description: "Assign, track, and prioritize tasks effortlessly across your team.",
                icon: <CheckCircle2 className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              },
              {
                title: "Real-time Collaboration",
                description: "Work together seamlessly with instant updates and in-app messaging.",
                icon: <Users className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              },
              {
                title: "Blockchain Security",
                description: "Enjoy unparalleled security with blockchain-based data protection.",
                icon: <Shield className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              },
              {
                title: "Advanced Analytics",
                description: "Gain valuable insights with detailed project and team performance reports.",
                icon: <BarChart3 className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              },
              {
                title: "Global Accessibility",
                description: "Access your projects from anywhere with decentralized infrastructure.",
                icon: <Globe className="w-6 h-6 text-[#4A90E2]" />,
                image: "/api/placeholder/400/300"
              }
            ].map((feature, index) => (
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

      {/* Enhanced Testimonials with Cards */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of satisfied teams already using TaskIP to achieve more.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "TaskIP has transformed how our team collaborates. The blockchain integration gives us peace of mind about our data security.",
                author: "Sarah Johnson",
                role: "Project Manager",
                company: "TechCorp",
                image: "/api/placeholder/100/100"
              },
              {
                quote: "The best project management tool I've used. Perfect for our agile workflow and the decentralized approach is revolutionary.",
                author: "Michael Lee",
                role: "Software Developer",
                company: "InnovateTech",
                image: "/api/placeholder/100/100"
              },
              {
                quote: "TaskIP's analytics help us identify bottlenecks and improve productivity. The transparency is unmatched.",
                author: "Emily Rodriguez",
                role: "Team Lead",
                company: "Creative Solutions",
                image: "/api/placeholder/100/100"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <MessageCircle className="w-12 h-12 text-[#4A90E2]/10" />
                </div>
                <p className="italic text-gray-600 mb-6">{testimonial.quote}</p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-[#4A90E2]">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Choose the perfect plan for your team's needs. No hidden fees.
          </p>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {[
              {
                name: "Basic",
                price: "Free",
                description: "Perfect for small teams getting started",
                features: [
                  "Up to 5 projects",
                  "15 team members",
                  "Basic analytics",
                  "Standard support"
                ]
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
                ]
              }
            ].map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#4A90E2]">{plan.price}</span>
                    {plan.period && <span className="text-gray-500">{plan.period}</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-[#4A90E2] text-white px-6 py-3 rounded-full hover:bg-[#3A7BC8] transition duration-300 flex items-center justify-center space-x-2">
              {/* <button className="mt-auto w-full bg-[#4A90E2] text-white px-4 py-2 rounded-full hover:bg-[#3A7BC8] transition duration-300"> */}
                Choose Plan
              </button>
            </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 lg:px-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto">
          {[
            {
              question: "How does TaskIP use blockchain technology?",
              answer: "TaskIP leverages blockchain to ensure data integrity, enable decentralized governance, and provide a transparent project management ecosystem."
            },
            {
              question: "What are the benefits of decentralized project management?",
              answer: "Decentralized project management offers enhanced security, global accessibility, and the ability for users to participate in platform governance."
            },
            {
              question: "Do I need to understand blockchain to use TaskIP?",
              answer: "Not at all! TaskIP is designed to be user-friendly, regardless of your blockchain knowledge. You can enjoy its benefits without any technical expertise."
            },
            {
              question: "How does governance participation work?",
              answer: "Pro plan users can vote on proposed changes to the platform, suggest new features, and have a say in the future direction of TaskIP."
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
        <p className="text-xl mb-8">Join thousands of teams already using TaskIP to achieve more.</p>
        <button className="bg-white text-[#4A90E2] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300" onClick={(event) => handleSignIn(event)}>
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
            <p>&copy; 2024 TaskIP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

