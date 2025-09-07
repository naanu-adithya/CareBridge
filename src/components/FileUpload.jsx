import { useState, useRef } from 'react';

const FileUpload = ({ onFileProcessed, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const allowedTypes = ['text/plain', 'application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a text file, PDF, or image (JPEG/PNG)');
      return;
    }
    onFileProcessed(file);
  };

  const handleTextSubmit = () => {
    const text = textAreaRef.current.value.trim();
    if (!text) {
      alert('Please enter some text');
      return;
    }
    
    // Create a mock file object for text input
    const textFile = new File([text], 'manual-input.txt', { type: 'text/plain' });
    onFileProcessed(textFile);
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      // Mock voice recording - in real implementation, use Web Speech API
      setTimeout(() => {
        const mockTranscription = "Patient was discharged with hypertension medication and follow-up instructions for diabetes management.";
        const textFile = new File([mockTranscription], 'voice-input.txt', { type: 'text/plain' });
        onFileProcessed(textFile);
        setIsRecording(false);
      }, 3000);
    } catch (error) {
      console.error('Recording failed:', error);
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        Upload Your Medical Document
      </h2>
      
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-purple-300 hover:border-purple-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".txt,.pdf,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          <div className="text-purple-600">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your medical document here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports: Text files, PDFs, Images (JPEG, PNG)
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isProcessing ? 'Processing...' : 'Choose File'}
            </button>
          </div>
        </div>
      </div>

      {/* Text Input Option */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">
          Or paste your text directly:
        </h3>
        <textarea
          ref={textAreaRef}
          placeholder="Paste your discharge summary or medical document text here..."
          className="w-full h-32 p-4 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          disabled={isProcessing}
        />
        <button
          onClick={handleTextSubmit}
          disabled={isProcessing}
          className="mt-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Process Text'}
        </button>
      </div>

      {/* Voice Input Option */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">
          Or record audio instructions:
        </h3>
        <button
          onClick={startRecording}
          disabled={isProcessing || isRecording}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isRecording 
              ? 'bg-red-500 text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-300'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <span>
            {isRecording ? 'Recording... (Mock Demo)' : 'Start Recording'}
          </span>
        </button>
        {isRecording && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            Demo: Recording will auto-complete in 3 seconds with sample text
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;