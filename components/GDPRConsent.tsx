
import React, { useState, useEffect } from 'react';

const CONSENT_KEY = 'connectwise-ai-gdpr-consent';

export const GDPRConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem(CONSENT_KEY);
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-300 p-4 shadow-lg z-50 transition-transform duration-500 transform translate-y-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          This site uses AI and may process your data to improve services. By continuing, you agree to our terms.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-300 focus:ring-brand-secondary transition-colors flex-shrink-0"
        >
          Accept & Close
        </button>
      </div>
    </div>
  );
};
