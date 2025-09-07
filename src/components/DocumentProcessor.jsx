import { useState } from 'react';
import SimplifiedView from './SimplifiedView';
import CareGuidance from './CareGuidance';
import FAQSection from './FAQSection';

const DocumentProcessor = ({ originalText, simplifiedText, replacements, guidance, faqs }) => {
  const [activeTab, setActiveTab] = useState('simplified');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const tabs = [
    { id: 'simplified', label: 'Simplified Document', icon: '📄' },
    { id: 'guidance', label: 'Care Guide', icon: '🏥' },
    { id: 'faqs', label: 'FAQs', icon: '❓' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'simplified' && (
          <SimplifiedView
            originalText={originalText}
            simplifiedText={simplifiedText}
            replacements={replacements}
            onSpeak={handleSpeak}
          />
        )}
        
        {activeTab === 'guidance' && (
          <CareGuidance guidance={guidance} />
        )}
        
        {activeTab === 'faqs' && (
          <FAQSection faqs={faqs} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleSpeak(simplifiedText)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          <span>{isSpeaking ? 'Stop Reading' : 'Read Aloud'}</span>
        </button>

        <button
          onClick={() => {
            const content = `SIMPLIFIED MEDICAL DOCUMENT\n\n${simplifiedText}\n\nCARE GUIDANCE\n\n${guidance.map(g => `${g.title}:\n${g.items.map(item => `• ${item}`).join('\n')}`).join('\n\n')}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'simplified-medical-document.txt';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Summary</span>
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Simplified Medical Document',
                text: simplifiedText,
              });
            } else {
              navigator.clipboard.writeText(simplifiedText);
              alert('Simplified text copied to clipboard!');
            }
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default DocumentProcessor;