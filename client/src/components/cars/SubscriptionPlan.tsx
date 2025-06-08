import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Car, SubscriptionPlan as SubscriptionPlanModel } from "@shared/schema";
import EnquiryForm from "./EnquiryForm";
import SubscriptionPrompts, { type SubscriptionPromptData } from "./SubscriptionPrompts";

interface SubscriptionPlanProps {
  car: Car;
}

const SubscriptionPlan = ({ car }: SubscriptionPlanProps) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'personal'>('quick');
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isPromptsOpen, setIsPromptsOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [promptData, setPromptData] = useState<SubscriptionPromptData | null>(null);

  const { data: plans, isLoading } = useQuery<SubscriptionPlanModel[]>({
    queryKey: [`/api/cars/${car.id}/subscription-plans`],
  });

  const handlePrevPlan = () => {
    if (plans && activePlanIndex > 0) {
      setActivePlanIndex(activePlanIndex - 1);
    }
  };

  const handleNextPlan = () => {
    if (plans && activePlanIndex < plans.length - 1) {
      setActivePlanIndex(activePlanIndex + 1);
    }
  };

  const activePlan = plans && plans.length > 0 ? plans[activePlanIndex] : null;

  const handleStartSubscription = () => {
    setIsPromptsOpen(true);
  };

  const handlePromptsComplete = (data: SubscriptionPromptData) => {
    setPromptData(data);
    setIsPromptsOpen(false);
    setIsEnquiryOpen(true);
  };

  return (
    <div>
      <div className="bg-secondary text-white p-6 rounded-t-lg">
        <h2 className="text-xl font-bold">SUBSCRIPTION PLANS FROM</h2>
        <div className="flex items-end mt-2">
          <span className="text-3xl font-bold">{formatCurrency(car.weeklyPrice)}</span>
          <span className="ml-1 mb-1">PER WEEK</span>
          <div className="ml-auto flex items-center">
            <i className="fas fa-clock mr-1"></i>
            <span>{car.available ? "Available Now" : "Coming Soon"}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        <button 
          className={`flex-1 py-3 font-medium ${activeTab === 'quick' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('quick')}
        >
          Quick Quote
        </button>
        <button 
          className={`flex-1 py-3 font-medium ${activeTab === 'personal' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('personal')}
        >
          Personalise
        </button>
      </div>
      
      {/* Popular plans carousel */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Popular Plans</h3>
          <div className="flex space-x-2">
            <button 
              className={`p-1 rounded-full border border-gray-300 ${activePlanIndex > 0 ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400'}`}
              onClick={handlePrevPlan}
              disabled={!plans || activePlanIndex === 0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className={`p-1 rounded-full border border-gray-300 ${plans && activePlanIndex < plans.length - 1 ? 'text-gray-700 hover:text-gray-900' : 'text-gray-400'}`}
              onClick={handleNextPlan}
              disabled={!plans || activePlanIndex === plans.length - 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        {/* Best value plan */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div className="bg-primary h-1 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs font-medium text-center text-primary mt-1">Best Value</p>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse">
            <div className="bg-gray-200 h-32 rounded-md mb-6"></div>
          </div>
        ) : activePlan ? (
          <>
            {/* Plan details */}
            <div className="border border-gray-200 rounded-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{formatCurrency(activePlan.weeklyPrice)}</span>
                  <span className="text-xs align-top">*</span>
                  <span className="text-sm text-gray-500">PER WEEK</span>
                </div>
              </div>
              <div className="text-sm mt-2">
                <p>Bond from {formatCurrency(activePlan.bond)}+ + Security Deposit of 2 weeks subscription fee</p>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Summary:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <i className="fas fa-circle text-primary text-xs mt-1 mr-2"></i>
                    <span>{activePlan.minimumTerm} minimum term Subscription</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-primary text-xs mt-1 mr-2"></i>
                    <span>{activePlan.weeklyKm} km weekly mileage included (30c per excess KM)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle text-primary text-xs mt-1 mr-2"></i>
                    <span>{activePlan.primaryDrivers}x primary driver</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Slider dots */}
            <div className="flex justify-center space-x-1 mb-6">
              {plans?.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === activePlanIndex ? 'bg-primary' : 'bg-gray-300'}`}
                  onClick={() => setActivePlanIndex(index)}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4 mb-6 text-gray-500">No plans available</div>
        )}
        
        {/* All inclusive features */}
        <h3 className="font-medium mb-3">All Inclusive</h3>
        <div className="grid grid-cols-2 gap-3 text-sm mb-6">
          <div className="flex items-center">
            <i className="fas fa-check text-primary mr-2"></i>
            <span>New Vehicle</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-dollar-sign text-primary mr-2"></i>
            <span>No Hidden Costs</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-id-card text-primary mr-2"></i>
            <span>Registration</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-sync text-primary mr-2"></i>
            <span>Flexibility</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-primary mr-2"></i>
            <span>Insurance</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-tools text-primary mr-2"></i>
            <span>Servicing</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-truck text-primary mr-2"></i>
            <span>Roadside Assistance</span>
          </div>
        </div>
        
        {/* Rush Care notice */}
        <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-shield-alt text-primary"></i>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">Ask us about Rush Care</h4>
              <p className="text-sm text-gray-600">Reduce your damage excess amount for peace of mind!</p>
            </div>
          </div>
        </div>
        
        {/* Quote and price */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Your Quote</span>
            <div>
              <span className="text-2xl font-bold">{formatCurrency(car.weeklyPrice)}</span>
              <span className="text-xs align-top">*</span>
              <span className="text-sm">per week</span>
            </div>
          </div>
        </div>
        
        {/* Apply button */}
        <Button 
          variant="secondary" 
          className="w-full py-3 rounded-md font-medium transition-colors mb-3 flex items-center justify-center"
          onClick={handleStartSubscription}
        >
          Start Subscription Process
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
        
        {/* Google reviews */}
        <div className="flex items-center justify-center">
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png" alt="Google" className="h-5 mr-2" />
          <div className="flex items-center text-gray-700">
            <i className="fas fa-star text-yellow-400"></i>
            <i className="fas fa-star text-yellow-400"></i>
            <i className="fas fa-star text-yellow-400"></i>
            <i className="fas fa-star text-yellow-400"></i>
            <i className="fas fa-star text-yellow-400"></i>
            <span className="ml-1 text-sm">4.9 (500+)</span>
          </div>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-4">*Disclaimer: This is a general price guide. Please confirm price, specifications and features with Rush.</p>
      </div>
      
      {/* Add the SubscriptionPrompts component */}
      <SubscriptionPrompts
        isOpen={isPromptsOpen}
        onClose={() => setIsPromptsOpen(false)}
        onComplete={handlePromptsComplete}
        carMake={car.make}
        carModel={car.model}
      />

      {/* Add the EnquiryForm component */}
      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        carMake={car.make}
        carModel={car.model}
        selectedPlan={activePlan ? {
          term: activePlan.minimumTerm,
          price: activePlan.weeklyPrice
        } : undefined}
      />
    </div>
  );
};

export default SubscriptionPlan;
