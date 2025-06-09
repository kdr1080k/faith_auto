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
    setLocation('/');
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
            <div className="mb-8">
              <img src="/logo.svg" alt="Rush" className="h-16 mx-auto mb-8" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Enquiry Form</h1>
            <p className="text-xl text-gray-600 mb-8">
              You are on your way to start your permanent new car experience.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              In just a few minutes, you can:
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Vehicle Preferences</h3>
                  <p className="text-gray-600">Let us know what kind of vehicle you need</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Eligibility</h3>
                  <p className="text-gray-600">Check you are eligible for a Rush subscription</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={nextStep}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg"
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
            <h2 className="text-3xl font-bold text-gray-800 mb-12">What are you looking for?</h2>
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
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    updateFormData('purpose', option.id);
                    nextStep();
                  }}
                  className={`p-8 border-2 rounded-lg transition-all hover:border-gray-800 ${
                    formData.purpose === option.id ? 'border-gray-800 bg-gray-50' : 'border-gray-300'
                  }`}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Employment status</h2>
            <div className="space-y-4">
              {[
                'Full-time',
                'Part-time',
                'Self employed',
                'Casual',
                'Unemployed'
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    updateFormData('employmentStatus', status);
                    nextStep();
                  }}
                  className={`w-full p-4 border-2 rounded-full transition-all hover:border-gray-800 ${
                    formData.employmentStatus === status 
                      ? 'border-gray-800 bg-gray-800 text-white' 
                      : 'border-gray-300 text-gray-800'
                  }`}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Annual pre-tax income</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                'Under $50K',
                '$50K to $75K',
                '$75K to $100K',
                'Over $100K'
              ].map((income) => (
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
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Submit enquiry</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              
              <div className="flex">
                <div className="flex items-center px-4 py-4 border-2 border-r-0 rounded-l-lg bg-gray-50">
                  <img src="/au-flag.png" alt="AU" className="w-6 h-4 mr-2" />
                  <span className="text-gray-600">▼</span>
                </div>
                <Input
                  placeholder="+61 000 000 000"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="flex-1 p-4 border-2 border-l-0 rounded-r-lg"
                />
              </div>
              
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
              
              {/* Debug info - shows which fields are missing */}
              <div className="text-sm text-red-600 mb-4">
                Missing fields: 
                {!formData.firstName && " First Name"}
                {!formData.lastName && " Last Name"}
                {!formData.email && " Email"}
                {!formData.phone && " Phone"}
                {!formData.agreeToPrivacy && " Privacy Agreement"}
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white p-4 rounded-full text-lg"
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