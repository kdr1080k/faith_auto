import React from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

const ThankYou: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation('/');
  };

  return (
    <>
      <Helmet>
        <title>Thank You | Faith Auto</title>
        <meta name="description" content="Thank you for your enquiry. We will get back to you soon." />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              We have received your enquiry and our team will get back to you within 24 hours.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-2">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Our team will review your enquiry details
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  We'll contact you within 24 hours to discuss your requirements
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  We'll provide you with personalized vehicle recommendations
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleGoHome}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-full text-lg font-medium transition-colors"
              >
                Return to Main Page
              </Button>
              
              <p className="text-sm text-gray-500">
                Need immediate assistance? Call us at{' '}
                <a href="tel:1800787422" className="text-gray-800 hover:underline">
                  1800 7874 227
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYou; 