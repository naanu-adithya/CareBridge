import { useState } from 'react';

const SimplifiedView = ({ originalText, simplifiedText, replacements, onSpeak }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const highlightReplacements = (text) => {
    if (!replacements || replacements.length === 0) return text;
    
    let highlightedText = text;
    replacements.forEach(({ simplified }, index) => {
      const regex = new RegExp(`\\b${simplified}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="highlight-term" data-index="${index}">${simplified}</span>`
      );
    });
    
    return highlightedText;
  };

  const handleTermClick = (index) => {
    setShowTooltip(showTooltip === index ? null : index);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Original Document */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Original Document
          </h3>
        </div>
        <div className="p-6">
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
            {originalText}
          </div>
        </div>
      </div>

      {/* Simplified Version */}
      <div className="bg-white rounded-xl shadow-lg border border-purple-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Simplified Version
            </h3>
            <button
              onClick={() => onSpeak(simplifiedText)}
              className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors"
              title="Listen to simplified version"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span className="text-sm">Listen</span>
            </button>
          </div>
        </div>
        
        <div className="p-6 relative">
          <div 
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightReplacements(simplifiedText) }}
            onClick={(e) => {
              if (e.target.classList.contains('highlight-term')) {
                const index = parseInt(e.target.dataset.index);
                handleTermClick(index);
              }
            }}
          />
          
          {/* Tooltips */}
          {showTooltip !== null && replacements[showTooltip] && (
            <div className="absolute bg-purple-800 text-white p-3 rounded-lg shadow-lg z-10 max-w-xs">
              <div className="text-sm">
                <div className="font-semibold mb-1">Medical Term:</div>
                <div className="text-purple-200 mb-2">{replacements[showTooltip].original}</div>
                <div className="font-semibold mb-1">Simplified:</div>
                <div>{replacements[showTooltip].simplified}</div>
              </div>
              <button
                onClick={() => setShowTooltip(null)}
                className="absolute -top-2 -right-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        {/* Legend */}
        {replacements && replacements.length > 0 && (
          <div className="bg-purple-50 px-6 py-4 border-t border-purple-200">
            <p className="text-sm text-purple-700 flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-300 rounded mr-2"></span>
              Click highlighted terms to see original medical terminology
            </p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .highlight-term {
          background-color: #fef08a;
          padding: 1px 3px;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .highlight-term:hover {
          background-color: #fde047;
        }
      `}</style>
    </div>
  );
};

export default SimplifiedView;