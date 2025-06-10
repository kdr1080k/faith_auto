import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const faqs = [
  {
    question: "What is a car subscription service?",
    answer: "A car subscription service is a flexible alternative to buying or leasing a car. It includes all the benefits of car ownership without the long-term commitment. Your monthly fee covers the car, insurance, registration, maintenance, and roadside assistance. You can also switch cars or cancel your subscription with just a few weeks' notice."
  },
  {
    question: "What's included in the subscription fee?",
    answer: "Our all-inclusive subscription fee covers: Vehicle use, comprehensive insurance, registration, routine maintenance, roadside assistance, and the flexibility to switch vehicles. You only need to pay for fuel and any excess kilometers beyond your chosen package limit."
  },
  {
    question: "How long are the subscription terms?",
    answer: "We offer flexible subscription terms starting from 1 month. You can choose from monthly, 3-month, 6-month, or 12-month terms. Longer terms often come with better rates. You can cancel or change your subscription with 30 days' notice."
  },
  {
    question: "Can I switch cars during my subscription?",
    answer: "Yes! One of the main benefits of our subscription service is the ability to switch vehicles. You can change to a different car at the end of your current term, or mid-term for a small fee. This is perfect if your needs change or you just want to try something different."
  },
  {
    question: "What's the difference between subscription and leasing?",
    answer: "Unlike leasing, which typically requires a 2-5 year commitment, our subscriptions offer more flexibility with shorter terms and the ability to switch vehicles. Subscriptions also include insurance, maintenance, and registration in one payment, while leasing usually doesn't cover these extras."
  },
  {
    question: "What types of second-hand cars do you sell?",
    answer: "We offer a wide range of quality pre-owned vehicles, from economical daily drivers to luxury vehicles. All our second-hand cars undergo thorough mechanical inspections and come with detailed service history. We specialize in low-mileage, well-maintained vehicles from reputable manufacturers."
  },
  {
    question: "Do you offer warranty on second-hand cars?",
    answer: "Yes, all our second-hand cars come with a minimum 3-month warranty. Extended warranty options are available for purchase. Our warranties cover major mechanical components and provide peace of mind for your purchase."
  },
  {
    question: "Can I trade in my current vehicle?",
    answer: "Yes, we accept trade-ins for both our subscription service and second-hand car purchases. We'll provide a fair market valuation of your vehicle and can apply the value to your subscription or purchase. Our trade-in process is quick and transparent."
  },
  {
    question: "What financing options are available?",
    answer: "We offer various financing options for our second-hand cars, including bank loans, in-house financing, and lease-to-own arrangements. Our finance team can help you find the best option based on your circumstances and credit situation."
  },
  {
    question: "How do you ensure the quality of your second-hand cars?",
    answer: "Every second-hand car we sell goes through a comprehensive 100-point inspection process. We check mechanical components, safety features, and cosmetic condition. We also provide a full vehicle history report and maintain detailed service records. Any necessary repairs or maintenance are completed before sale."
  }
];

export default function FAQ() {
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

    // Animation observer
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Clean up performance properties after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-50px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => animationObserver.observe(element));

    return () => {
      animationObserver.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-24"> {/* Added mt-24 */}
        <div className="max-w-3xl mx-auto">
          <h2 className="animate-fade-up text-3xl font-bold text-gray-900 text-center mb-2" style={{ animationDelay: '200ms' }}>
            Frequently Asked Questions
          </h2>
          <p className="animate-fade-right text-lg text-gray-600 text-center mb-12" style={{ animationDelay: '300ms' }}>
            Everything you need to know about our car subscription service and second-hand cars
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Disclosure key={index} as="div" className={`animate-fade-up border-b border-gray-200 pb-6`} style={{ animationDelay: `${400 + (index * 100)}ms` }}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between text-left">
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <ChevronDownIcon
                        className={`${open ? 'rotate-180 transform' : ''
                          } h-6 w-6 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="mt-4 text-gray-600">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="animate-fade-up text-xl font-semibold text-gray-900 mb-4" style={{ animationDelay: `${400 + (faqs.length * 100) + 200}ms` }}>
              Still have questions?
            </h3>
            <p className="animate-fade-right text-gray-600 mb-6" style={{ animationDelay: `${400 + (faqs.length * 100) + 300}ms` }}>
              Can't find the answer you're looking for? Please contact our customer support team.
            </p>
            <a
              href="/contact"
              className="animate-fade-up inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              style={{ animationDelay: `${400 + (faqs.length * 100) + 400}ms` }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 