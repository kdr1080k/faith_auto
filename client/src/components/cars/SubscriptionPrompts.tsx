import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SubscriptionPromptsProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: SubscriptionPromptData) => void;
  carMake: string;
  carModel: string;
}

export interface SubscriptionPromptData {
  age: number;
  licenseType: 'full' | 'provisional' | 'international';
  drivingExperience: 'less1' | '1to3' | 'more3';
  employmentStatus: 'employed' | 'self-employed' | 'student' | 'other';
}

const SubscriptionPrompts = ({ isOpen, onClose, onComplete, carMake, carModel }: SubscriptionPromptsProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<SubscriptionPromptData>>({});

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(data as SubscriptionPromptData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.age && data.age >= 18;
      case 2:
        return data.licenseType;
      case 3:
        return data.drivingExperience;
      case 4:
        return data.employmentStatus;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to {carMake} {carModel}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step 1: Age */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">What is your age?</h3>
              <Input
                type="number"
                min={18}
                max={100}
                value={data.age || ''}
                onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
                placeholder="Enter your age"
              />
              {data.age && data.age < 18 && (
                <p className="text-red-500 text-sm">You must be 18 or older to subscribe.</p>
              )}
            </div>
          )}

          {/* Step 2: License Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">What type of driver's license do you have?</h3>
              <RadioGroup
                value={data.licenseType}
                onValueChange={(value: 'full' | 'provisional' | 'international') => 
                  setData({ ...data, licenseType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="provisional" id="provisional" />
                  <Label htmlFor="provisional">Provisional License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international">International License</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Driving Experience */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">How long have you been driving?</h3>
              <RadioGroup
                value={data.drivingExperience}
                onValueChange={(value: 'less1' | '1to3' | 'more3') => 
                  setData({ ...data, drivingExperience: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less1" id="less1" />
                  <Label htmlFor="less1">Less than 1 year</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1to3" id="1to3" />
                  <Label htmlFor="1to3">1-3 years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="more3" id="more3" />
                  <Label htmlFor="more3">More than 3 years</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 4: Employment Status */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-medium">What is your employment status?</h3>
              <RadioGroup
                value={data.employmentStatus}
                onValueChange={(value: 'employed' | 'self-employed' | 'student' | 'other') => 
                  setData({ ...data, employmentStatus: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employed" id="employed" />
                  <Label htmlFor="employed">Employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="self-employed" id="self-employed" />
                  <Label htmlFor="self-employed">Self-Employed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {step === 4 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPrompts; 