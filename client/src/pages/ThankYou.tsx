import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

const ThankYou: React.FC = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Add professional CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes fade-right {
        from {
          opacity: 0;
          transform: translate3d(-50px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .animate-fade-up {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-right {
        opacity: 0;
        transform: translate3d(-50px, 0, 0);
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-up.animate-in {
        animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-right.animate-in {
        animation: fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-fade-up.animate-in,
      .animate-fade-right.animate-in {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Animation observer
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
          entry.target.classList.add('animate-in');
          // Clean up performance properties after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up:not(.animate-in), .animate-fade-right:not(.animate-in)');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      animationObserver.disconnect();
    };
  }, []);

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
          <div className="animate-fade-up bg-white rounded-2xl shadow-xl p-8 md:p-12" style={{ animationDelay: '200ms' }}>
            {/* Success Icon */}
            <div className="animate-fade-up w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8" style={{ animationDelay: '300ms' }}>
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Thank You Message */}
            <h1 className="animate-fade-up text-4xl md:text-5xl font-bold text-gray-800 mb-6" style={{ animationDelay: '400ms' }}>
              Thank You!
            </h1>
            
            <p className="animate-fade-right text-xl text-gray-600 mb-8" style={{ animationDelay: '500ms' }}>
              We have received your enquiry and our team will get back to you within 24 hours.
            </p>

            <div className="animate-fade-up bg-gray-50 rounded-lg p-6 mb-8" style={{ animationDelay: '600ms' }}>
              <p className="text-gray-700 mb-2">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="animate-fade-right flex items-start" style={{ animationDelay: '700ms' }}>
                  <span className="text-green-600 mr-2">•</span>
                  Our team will review your enquiry details
                </li>
                <li className="animate-fade-right flex items-start" style={{ animationDelay: '800ms' }}>
                  <span className="text-green-600 mr-2">•</span>
                  We'll contact you within 24 hours to discuss your requirements
                </li>
                <li className="animate-fade-right flex items-start" style={{ animationDelay: '900ms' }}>
                  <span className="text-green-600 mr-2">•</span>
                  We'll provide you with personalized vehicle recommendations
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleGoHome}
                className="animate-fade-up w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-8 rounded-full text-lg font-medium transition-colors"
                style={{ animationDelay: '1000ms' }}
              >
                Return to Main Page
              </Button>
              
              <p className="animate-fade-right text-sm text-gray-500" style={{ animationDelay: '1100ms' }}>
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