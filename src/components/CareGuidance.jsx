const CareGuidance = ({ guidance }) => {
  if (!guidance || guidance.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Your Care Guide
        </h3>
      </div>
      
      <div className="p-6 space-y-6">
        {guidance.map((section, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3" role="img" aria-label={section.title}>
                {section.icon}
              </span>
              <h4 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h4>
            </div>
            
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Emergency Contact Info */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h4 className="font-semibold text-red-800">Emergency Situations</h4>
          </div>
          <p className="text-sm text-red-700">
            Call 911 or go to the nearest emergency room if you experience:
          </p>
          <ul className="mt-2 text-sm text-red-700 list-disc list-inside space-y-1">
            <li>Severe chest pain or difficulty breathing</li>
            <li>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
            <li>Severe bleeding or injury</li>
            <li>Loss of consciousness</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CareGuidance;