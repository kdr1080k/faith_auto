import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "wouter";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

const helpCategories = [
  {
    id: "inclusions",
    title: "Subscription Inclusions",
    faqs: [
      {
        question: "What's included in my car subscription?",
        answer: "Your Rush subscription includes the vehicle, registration, comprehensive insurance, routine maintenance, roadside assistance, and standard servicing. You're only responsible for fuel, tolls, and any damage not covered by insurance."
      },
      {
        question: "Is there a mileage limit?",
        answer: "Yes, each subscription plan comes with a weekly kilometer allowance, typically 385km per week (20,000km annually). Additional kilometers are charged at 30c per km."
      },
      {
        question: "Does my subscription include insurance?",
        answer: "Yes, comprehensive insurance is included in all Rush subscriptions. Standard damage excess applies, but you can reduce this by adding Rush Care to your subscription."
      }
    ]
  },
  {
    id: "pickup",
    title: "Pick-up & Drop-off",
    faqs: [
      {
        question: "Where do I pick up my vehicle?",
        answer: "Vehicles can be picked up from our designated Rush hubs in Brisbane, Sydney, Melbourne, Adelaide, and Perth. The exact location will be confirmed when your subscription is approved."
      },
      {
        question: "What do I need to bring for pick-up?",
        answer: "Please bring your valid driver's license, proof of identity, and the payment method used for the subscription. We'll also need to verify your address with a recent utility bill or bank statement."
      },
      {
        question: "How do I return my vehicle?",
        answer: "Returns are made to the same location where you picked up the vehicle. Please ensure the vehicle is clean, with the same fuel level as when you received it, and bring all keys and documents provided at pick-up."
      }
    ]
  },
  {
    id: "payments",
    title: "Payments, Fees & Charges",
    faqs: [
      {
        question: "How does billing work?",
        answer: "Your subscription is billed weekly in advance. The first payment includes your first week's subscription fee plus the refundable security deposit (typically equivalent to two weeks' subscription)."
      },
      {
        question: "Are there any joining or exit fees?",
        answer: "No, Rush doesn't charge application, joining, or exit fees. If you return your vehicle before your minimum term is complete, early termination fees may apply as outlined in your subscription agreement."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards. Unfortunately, we cannot accept cash, checks, or direct bank transfers for subscription payments."
      }
    ]
  },
  {
    id: "tolls",
    title: "Tolls & Fines",
    faqs: [
      {
        question: "How do I handle toll payments?",
        answer: "You are responsible for all toll charges incurred during your subscription. We recommend setting up your own toll account or using pass products available in your state."
      },
      {
        question: "What happens if I receive a traffic or parking fine?",
        answer: "You are responsible for all traffic and parking fines incurred during your subscription period. If Rush receives the fine, we will transfer it to your name and may charge an administration fee."
      }
    ]
  },
  {
    id: "accidents",
    title: "Accidents & Damage",
    faqs: [
      {
        question: "What should I do if I'm involved in an accident?",
        answer: "First, ensure everyone is safe and call emergency services if needed. Then contact Rush's 24/7 support line immediately. Document the incident with photos and collect contact information from any other parties involved."
      },
      {
        question: "What is my liability for damage to the vehicle?",
        answer: "Your liability is limited to the damage excess amount specified in your subscription agreement, typically $500-$1,000. This can be reduced by adding Rush Care to your subscription."
      },
      {
        question: "Is windscreen damage covered?",
        answer: "Minor chips and cracks in the windscreen are covered under your comprehensive insurance. However, full windscreen replacement may incur the standard damage excess unless you have Rush Care."
      }
    ]
  }
];

const Help = () => {
  const [activeCategory, setActiveCategory] = useState(helpCategories[0].id);

  return (
    <>
      <Helmet>
        <title>Help Center | Faith Auto</title>
        <meta name="description" content="Find answers to common questions about Faith Auto's car subscription service, including inclusions, payments, pick-up & drop-off, and more." />
      </Helmet>
      
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] pt-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(31, 41, 55, 0.95), 
              rgba(31, 41, 55, 0.85)
            ),
            url('/pexels-bertellifotografia-13872477.jpg')
          `
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-20 h-full">
          <div className="max-w-3xl">
            <div 
              className="inline-block opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
              style={{ animationDelay: '250ms' }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-default">
                Help Center
              </h1>
            </div>
            <div 
              className="inline-block mt-4 opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
              style={{ animationDelay: '500ms' }}
            >
              <p className="text-lg md:text-xl text-white transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] cursor-default">
                Find answers to common questions about our subscription service. Can't find what you're looking for? <Link href="/enquiry" className="text-primary-foreground hover:underline">Make an Enquiry</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Categories sidebar */}
            <div className="space-y-2">
              {helpCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* FAQ content */}
            <div className="md:col-span-3">
              <Accordion type="single" collapsible className="space-y-4">
                {helpCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white rounded-lg shadow-sm border px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Help;
