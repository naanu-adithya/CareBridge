import { useState } from 'react';
import FileUpload from './components/FileUpload';
import DocumentProcessor from './components/DocumentProcessor';
import { mockFileProcessing, simplifyMedicalText, generateCareGuidance, generateFAQs } from './utils/aiProcessor';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileProcessed = async (file) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Extract text from file (mock implementation)
      const extractedText = await mockFileProcessing(file);
      
      // Process with AI (mock implementation)
      const { simplifiedText, replacements } = simplifyMedicalText(extractedText);
      const guidance = generateCareGuidance(extractedText);
      const faqs = generateFAQs(extractedText);
      
      setProcessedData({
        originalText: extractedText,
        simplifiedText,
        replacements,
        guidance,
        faqs
      });
      
    } catch (err) {
      setError('Failed to process the document. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setProcessedData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  AI Patient Discharge Clarifier
                </h1>
                <p className="text-sm text-gray-600">
                  Simplify medical documents for better understanding
                </p>
              </div>
            </div>
            
            {processedData && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>New Document</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {!processedData ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Make Medical Documents <span className="text-purple-600">Easy to Understand</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Upload your hospital discharge summary or medical document, and our AI will translate 
                complex medical terms into simple, patient-friendly language.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                  <div className="text-purple-600 text-3xl mb-3">📄</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Documents</h3>
                  <p className="text-sm text-gray-600">Support for text, PDF, images, and voice input</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                  <div className="text-purple-600 text-3xl mb-3">🤖</div>
                  <h3 className="font-semibold text-gray-800 mb-2">AI Simplification</h3>
                  <p className="text-sm text-gray-600">Convert medical jargon to plain English</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                  <div className="text-purple-600 text-3xl mb-3">💡</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Care Guidance</h3>
                  <p className="text-sm text-gray-600">Get personalized care instructions and FAQs</p>
                </div>
              </div>
            </div>

            <FileUpload onFileProcessed={handleFileProcessed} isProcessing={isProcessing} />
          </div>
        ) : (
          <DocumentProcessor
            originalText={processedData.originalText}
            simplifiedText={processedData.simplifiedText}
            replacements={processedData.replacements}
            guidance={processedData.guidance}
            faqs={processedData.faqs}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
            </p>
            <p className="text-sm">
              Always consult with your healthcare provider for medical decisions and concerns.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;