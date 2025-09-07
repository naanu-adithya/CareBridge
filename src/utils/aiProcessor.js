// Mock AI processing functions for MVP demonstration

export const medicalTermsMap = {
  "hypertension": "high blood pressure",
  "myocardial infarction": "heart attack",
  "cerebrovascular accident": "stroke",
  "pneumonia": "lung infection",
  "diabetes mellitus": "diabetes (high blood sugar)",
  "tachycardia": "fast heart rate",
  "bradycardia": "slow heart rate",
  "dyspnea": "difficulty breathing",
  "nausea": "feeling sick to your stomach",
  "vertigo": "dizziness",
  "edema": "swelling",
  "hematoma": "blood clot under skin",
  "laceration": "cut or wound",
  "contusion": "bruise",
  "fracture": "broken bone",
  "anticoagulant": "blood thinner",
  "analgesic": "pain reliever",
  "antibiotic": "infection-fighting medicine",
  "diuretic": "water pill",
  "beta-blocker": "heart rate medicine"
};

export const simplifyMedicalText = (text) => {
  let simplifiedText = text;
  const replacements = [];
  
  Object.entries(medicalTermsMap).forEach(([medical, simple]) => {
    const regex = new RegExp(`\\b${medical}\\b`, 'gi');
    if (text.match(regex)) {
      simplifiedText = simplifiedText.replace(regex, simple);
      replacements.push({ original: medical, simplified: simple });
    }
  });
  
  return { simplifiedText, replacements };
};

export const generateCareGuidance = (text) => {
  const guidance = [];
  
  if (text.toLowerCase().includes('medication') || text.toLowerCase().includes('medicine')) {
    guidance.push({
      icon: '💊',
      title: 'Medication Reminders',
      items: [
        'Take medications at the same time each day',
        'Don\'t skip doses even if you feel better',
        'Keep a medication list with you at all times'
      ]
    });
  }
  
  if (text.toLowerCase().includes('follow-up') || text.toLowerCase().includes('appointment')) {
    guidance.push({
      icon: '📅',
      title: 'Follow-up Care',
      items: [
        'Schedule your follow-up appointment within the recommended timeframe',
        'Bring all your medications to the appointment',
        'Write down questions before your visit'
      ]
    });
  }
  
  if (text.toLowerCase().includes('diet') || text.toLowerCase().includes('food')) {
    guidance.push({
      icon: '🥗',
      title: 'Diet Guidelines',
      items: [
        'Follow any dietary restrictions given by your doctor',
        'Eat regular, balanced meals',
        'Stay hydrated by drinking plenty of water'
      ]
    });
  }
  
  if (text.toLowerCase().includes('activity') || text.toLowerCase().includes('exercise')) {
    guidance.push({
      icon: '🚶',
      title: 'Activity Guidelines',
      items: [
        'Start with light activities as recommended',
        'Gradually increase activity level',
        'Stop and rest if you feel tired or unwell'
      ]
    });
  }
  
  // Default guidance if no specific keywords found
  if (guidance.length === 0) {
    guidance.push({
      icon: '🏥',
      title: 'General Care',
      items: [
        'Take all medications as prescribed',
        'Rest and allow your body to heal',
        'Contact your doctor if you have concerns'
      ]
    });
  }
  
  return guidance;
};

export const generateFAQs = (text) => {
  const faqs = [
    {
      question: "When should I contact my doctor?",
      answer: "Contact your doctor if you experience worsening symptoms, new concerning symptoms, or if you have questions about your medications or care instructions."
    },
    {
      question: "Can I drive after being discharged?",
      answer: "Check with your doctor about driving restrictions. Some medications or conditions may affect your ability to drive safely."
    },
    {
      question: "What if I miss a dose of medication?",
      answer: "Take the missed dose as soon as you remember, unless it's almost time for your next dose. Never double up on doses. When in doubt, call your pharmacist or doctor."
    },
    {
      question: "When can I return to work?",
      answer: "Return to work timing depends on your specific condition and job requirements. Discuss this with your doctor during your follow-up appointment."
    }
  ];
  
  // Add condition-specific FAQs based on text content
  if (text.toLowerCase().includes('surgery') || text.toLowerCase().includes('operation')) {
    faqs.unshift({
      question: "How do I care for my surgical site?",
      answer: "Keep the area clean and dry. Follow your doctor's instructions for changing dressings. Watch for signs of infection like increased redness, swelling, or discharge."
    });
  }
  
  return faqs;
};

export const mockFileProcessing = async (file) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock extracted text based on file type
  let extractedText = "";
  
  if (file.type.includes('text')) {
    extractedText = await file.text();
  } else {
    // Mock extracted text for other file types
    extractedText = `Patient John Doe was admitted with acute myocardial infarction and hypertension. 
    Treatment included anticoagulant therapy and beta-blocker medication. 
    Patient experienced mild dyspnea which resolved with treatment. 
    Discharge instructions: Continue prescribed medications, follow low-sodium diet, 
    schedule follow-up appointment in 2 weeks. Monitor for chest pain, dyspnea, or edema. 
    Activity restrictions: light activity only for first week.`;
  }
  
  return extractedText;
};