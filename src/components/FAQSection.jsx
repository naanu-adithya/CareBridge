import { useState } from 'react';

const FAQSection = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Frequently Asked Questions
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex items-center justify-between hover:text-blue-600 transition-colors"
            >
              <h4 className="font-medium text-gray-800 pr-4">
                {faq.question}
              </h4>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openFAQ === index && (
              <div className="mt-4 text-gray-700 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Additional Help */}
      <div className="bg-blue-50 px-6 py-4 border-t border-blue-200">
        <div className="flex items-center text-blue-800">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm">
            Still have questions? Contact your healthcare provider or call the hospital's patient information line.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;