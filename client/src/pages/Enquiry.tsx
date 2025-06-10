import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
  purpose: string;
  employmentStatus: string;
  income: string;
  location: string;
  fuelType: string[];
  vehicleType: string;
  drivingRestrictions: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeToPrivacy: boolean;
}

const Enquiry: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<FormData>({
    purpose: '',
    employmentStatus: '',
    income: '',
    location: '',
    fuelType: [],
    vehicleType: '',
    drivingRestrictions: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeToPrivacy: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
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

    // Function to observe new elements
    const observeElements = () => {
      const animatedElements = document.querySelectorAll('.animate-fade-up:not(.animate-in), .animate-fade-right:not(.animate-in)');
      animatedElements.forEach(element => animationObserver.observe(element));
    };

    // Initial observation
    observeElements();

    // Re-observe when content changes (for form steps)
    const mutationObserver = new MutationObserver(() => {
      setTimeout(observeElements, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      animationObserver.disconnect();
      mutationObserver.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  const totalSteps = 8;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setLocation('/thank-you');
  };

  const renderProgressDots = () => (
    <div className="flex justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            index === currentStep
              ? 'bg-gray-800'
              : index < currentStep
              ? 'bg-gray-400'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <div className="animate-fade-up mb-8" style={{ animationDelay: '200ms' }}>
              <img src="/logo.svg" alt="Rush" className="h-16 mx-auto mb-8" />
            </div>
            <h1 className="animate-fade-up text-4xl font-bold text-gray-800 mb-6" style={{ animationDelay: '300ms' }}>Enquiry Form</h1>
            <p className="animate-fade-right text-xl text-gray-600 mb-8" style={{ animationDelay: '400ms' }}>
              You are on your way to start your permanent new car experience.
            </p>
            <p className="animate-fade-right text-lg text-gray-600 mb-12" style={{ animationDelay: '500ms' }}>
              In just a few minutes, you can:
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="animate-fade-up flex items-center space-x-4" style={{ animationDelay: '600ms' }}>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Vehicle Preferences</h3>
                  <p className="animate-fade-right text-gray-600" style={{ animationDelay: '700ms' }}>Let us know what kind of vehicle you need</p>
                </div>
              </div>
              
              <div className="animate-fade-up flex items-center space-x-4" style={{ animationDelay: '700ms' }}>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Eligibility Check</h3>
                  <p className="animate-fade-right text-gray-600" style={{ animationDelay: '800ms' }}>Verify you meet our subscription requirements</p>
                </div>
              </div>
              
              <div className="animate-fade-up flex items-center space-x-4" style={{ animationDelay: '800ms' }}>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Instant Quote</h3>
                  <p className="animate-fade-right text-gray-600" style={{ animationDelay: '900ms' }}>Get personalized pricing for your needs</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={nextStep}
              className="animate-fade-up bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg"
              style={{ animationDelay: '800ms' }}
            >
              Get Started
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="animate-fade-up text-3xl font-bold text-gray-800 mb-12" style={{ animationDelay: '200ms' }}>What are you looking for?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'rideshare',
                  title: 'A car for Rideshare (Uber) driving',
                  icon: (
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  id: 'personal',
                  title: 'A car for business & personal use',
                  icon: (
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )
                },
                {
                  id: 'fleet',
                  title: 'A fleet of more than 5 vehicles',
                  icon: (
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                }
              ].map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => {
                    updateFormData('purpose', option.id);
                    nextStep();
                  }}
                  className={`animate-fade-up p-8 border-2 rounded-lg transition-all hover:border-gray-800 ${
                    formData.purpose === option.id ? 'border-gray-800 bg-gray-50' : 'border-gray-300'
                  }`}
                  style={{ animationDelay: `${300 + (index * 100)}ms` }}
                >
                  {option.icon}
                  <p className="text-lg font-medium text-gray-800">{option.title}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="animate-fade-up text-3xl font-bold text-gray-800 mb-12" style={{ animationDelay: '200ms' }}>Employment status</h2>
            <div className="space-y-4">
              {[
                'Full-time',
                'Part-time',
                'Self employed',
                'Casual',
                'Unemployed'
              ].map((status, index) => (
                <button
                  key={status}
                  onClick={() => {
                    updateFormData('employmentStatus', status);
                    nextStep();
                  }}
                  className={`animate-fade-up w-full p-4 border-2 rounded-full transition-all hover:border-gray-800 ${
                    formData.employmentStatus === status 
                      ? 'border-gray-800 bg-gray-800 text-white' 
                      : 'border-gray-300 text-gray-800'
                  }`}
                  style={{ animationDelay: `${300 + (index * 100)}ms` }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="animate-fade-up text-3xl font-bold text-gray-800 mb-12" style={{ animationDelay: '200ms' }}>Annual pre-tax income</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Under $50K',
                '$50K to $75K',
                '$75K to $100K',
                'Over $100K'
              ].map((income, index) => (
                <button
                  key={income}
                  onClick={() => {
                    updateFormData('income', income);
                    nextStep();
                  }}
                  className={`p-4 border-2 rounded-full transition-all hover:border-gray-800 ${
                    formData.income === income 
                      ? 'border-gray-800 bg-gray-800 text-white' 
                      : 'border-gray-300 text-gray-800'
                  }`}
                >
                  {income}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Select your pick up location</h2>
            <div className="space-y-4">
              {[
                'Brisbane',
                'Sydney',
                'Melbourne',
                'Adelaide',
                'Perth'
              ].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    updateFormData('location', city);
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-full transition-all hover:border-gray-800 ${
                    formData.location === city 
                      ? 'border-gray-800 bg-gray-800 text-white' 
                      : 'border-gray-300 text-gray-800'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Vehicle preferences</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Fuel type:</h3>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['Electric', 'Hybrid', 'Petrol', 'Diesel', "I'm flexible"].map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => {
                      const currentFuelTypes = formData.fuelType;
                      const newFuelTypes = currentFuelTypes.includes(fuel)
                        ? currentFuelTypes.filter(f => f !== fuel)
                        : [...currentFuelTypes, fuel];
                      updateFormData('fuelType', newFuelTypes);
                    }}
                    className={`px-6 py-3 border-2 rounded-full transition-all hover:border-gray-800 ${
                      formData.fuelType.includes(fuel)
                        ? 'border-gray-800 bg-gray-50 text-gray-800'
                        : 'border-gray-300 text-gray-800'
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">I would like it to be:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Affordable', 'Comfortable', 'Luxury'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      updateFormData('vehicleType', type);
                    }}
                    className={`p-4 border-2 rounded-lg transition-all hover:border-gray-800 ${
                      formData.vehicleType === type
                        ? 'border-gray-800 bg-gray-50 text-gray-800'
                        : 'border-gray-300 text-gray-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={nextStep}
              disabled={formData.fuelType.length === 0 || !formData.vehicleType}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full"
            >
              Continue
            </Button>
          </div>
        );

      case 6:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Driving restrictions</h2>
            <div className="space-y-4">
              {[
                'None (Open & unrestricted licenses)',
                'Provisional (P1 or P2)',
                'Probationary (P)',
                'Learners License'
              ].map((restriction) => (
                <button
                  key={restriction}
                  onClick={() => {
                    updateFormData('drivingRestrictions', restriction);
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-full transition-all hover:border-gray-800 ${
                    formData.drivingRestrictions === restriction 
                      ? 'border-gray-800 bg-gray-50 text-gray-800' 
                      : restriction === 'Learners License'
                      ? 'border-gray-300 text-gray-400 bg-gray-100'
                      : 'border-gray-300 text-gray-800'
                  }`}
                  disabled={restriction === 'Learners License'}
                >
                  {restriction}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="animate-fade-up text-3xl font-bold text-gray-800 mb-12" style={{ animationDelay: '200ms' }}>Submit enquiry</h2>
            <div className="space-y-6">
              <div className="animate-fade-up grid grid-cols-1 md:grid-cols-2 gap-4" style={{ animationDelay: '300ms' }}>
                <Input
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="p-4 border-2 rounded-lg"
                />
                <Input
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="p-4 border-2 rounded-lg"
                />
              </div>
              
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <Input
                  placeholder="Email address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="pl-12 p-4 border-2 rounded-lg"
                />
              </div>
              
              <Input
                placeholder="+61 000 000 000"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="p-4 border-2 rounded-lg"
              />
              
              <div className="flex items-start space-x-3 text-left">
                <Checkbox
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={(checked) => updateFormData('agreeToPrivacy', checked === true)}
                  className="mt-1"
                />
                <p className="text-gray-600">
                  I agree to the <span className="text-gray-800 underline">privacy policy</span> and subscribe to marketing material.
                </p>
              </div>
              
              {/* Show missing fields only if there are actual missing fields */}
              {(() => {
                const missingFields = [];
                if (!formData.firstName) missingFields.push("First Name");
                if (!formData.lastName) missingFields.push("Last Name");
                if (!formData.email) missingFields.push("Email");
                if (!formData.phone) missingFields.push("Phone");
                if (!formData.agreeToPrivacy) missingFields.push("Privacy Agreement");
                
                return missingFields.length > 0 ? (
                  <div className="text-sm text-red-600 mb-4">
                    Missing fields: {missingFields.join(", ")}
                  </div>
                ) : null;
              })()}
              
              <Button 
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.agreeToPrivacy}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-full text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.svg" alt="Rush" className="h-12" />
            </div>
            {renderProgressDots()}
          </div>
        )}
        
        {renderStep()}
        
        {currentStep > 0 && currentStep < totalSteps - 1 && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={prevStep}
              variant="outline"
              className="mr-4"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enquiry; 