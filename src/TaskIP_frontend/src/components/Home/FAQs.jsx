import React from 'react'

function FAQs() {
  return (
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
  )
}

export default FAQs