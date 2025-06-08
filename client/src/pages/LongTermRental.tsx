import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const LongTermRental = () => {
  return (
    <>
      <Helmet>
        <title>Long-Term Car Rental | Rush</title>
        <meta name="description" content="Discover our long-term car rental alternatives that provide flexibility, value, and convenience for extended vehicle needs." />
      </Helmet>

      <div className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')` }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Long-Term Car Rental Alternative
            </h1>
            <p className="text-lg md:text-xl text-white">
              Need a car for an extended period? Our subscription service offers a superior alternative to traditional long-term car rentals.
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">Beyond Traditional Car Rental</h2>
            <p className="mb-4 text-gray-600">
              Traditional car rentals are perfect for short trips, but they become increasingly expensive and inconvenient 
              for longer periods. That's where Rush's subscription service shines as the smart alternative for extended vehicle needs.
            </p>
            <p className="text-gray-600">
              Whether you're on a long work assignment, need a temporary vehicle while yours is being repaired, or are simply 
              trying out life in a new city, our flexible subscription terms and all-inclusive pricing make more sense than 
              traditional rental for periods beyond a few weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Choose Subscription Over Long-Term Rental?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-4">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Significant Cost Savings</h3>
                    <p className="text-gray-600">Save up to 40% compared to traditional long-term car rentals with our subscription model.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-4">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">All-Inclusive Pricing</h3>
                    <p className="text-gray-600">Registration, insurance, maintenance, and roadside assistance are all included in one weekly price.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-4">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Newer Vehicle Fleet</h3>
                    <p className="text-gray-600">Access to our premium fleet of new vehicles, rather than high-mileage rental cars.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-4">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Flexible Terms</h3>
                    <p className="text-gray-600">Minimum terms start from just 2 months with the ability to extend as needed.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-4">
                    <i className="fas fa-check text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold">Vehicle Swap Option</h3>
                    <p className="text-gray-600">Change vehicles during your subscription period if your needs change.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg self-start">
              <h2 className="text-2xl font-bold mb-6">Long-Term Rental Comparison</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">3-Month SUV Rental</span>
                    <span className="font-bold text-red-500">$950/week</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 ml-6">
                    <li className="list-disc">Basic insurance with high excess</li>
                    <li className="list-disc">Limited kilometers</li>
                    <li className="list-disc">No included maintenance</li>
                    <li className="list-disc">Older vehicle models</li>
                    <li className="list-disc">Additional driver fees</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">3-Month Rush Subscription</span>
                    <span className="font-bold text-green-600">$260/week</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 ml-6">
                    <li className="list-disc">Comprehensive insurance included</li>
                    <li className="list-disc">385km weekly allowance</li>
                    <li className="list-disc">All maintenance and servicing included</li>
                    <li className="list-disc">Latest model vehicles</li>
                    <li className="list-disc">Roadside assistance included</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="font-semibold text-green-700">
                    Total Savings: Approximately $8,500 over 3 months
                  </p>
                </div>
                
                <Link href="/subscription-inventory">
                  <Button className="bg-primary hover:bg-accent text-white w-full">
                    View Available Vehicles
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Perfect for Extended Stays</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-briefcase text-primary"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Business Assignments</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for interstate or international professionals on medium-term assignments. No long-term commitment required.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Flexibility for contract extensions</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Professional vehicle appropriate for client meetings</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Simplified expense reporting with one payment</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Extended Vacations</h3>
                <p className="text-gray-600 mb-4">
                  Ideal for visitors spending extended time exploring Australia. More economical than traditional rental cars.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>SUVs and larger vehicles for comfortable travel</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Roadside assistance for peace of mind</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Generous mileage allowance for exploration</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-home text-primary"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Home Renovations</h3>
                <p className="text-gray-600 mb-4">
                  During major home renovations when you might need a different type of vehicle temporarily.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Larger vehicles for transporting materials</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>Flexible duration as project timelines change</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mr-2 mt-1"></i>
                    <span>No worry about wear and tear from construction sites</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">What's the minimum subscription period?</h3>
                <p className="text-gray-600">
                  Our minimum subscription periods range from 2-4 months depending on the vehicle model, much shorter than traditional leases.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What happens if I need to return the car early?</h3>
                <p className="text-gray-600">
                  While there is a minimum commitment period, our early return fees are significantly lower than lease termination penalties.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How does insurance work?</h3>
                <p className="text-gray-600">
                  Comprehensive insurance is included in your subscription fee, with a standard damage excess. This can be reduced with our Rush Care option.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I have additional drivers?</h3>
                <p className="text-gray-600">
                  Yes, additional drivers can be added to your subscription for a small fee, after meeting our standard eligibility requirements.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How does vehicle delivery work?</h3>
                <p className="text-gray-600">
                  Vehicles can be collected from our conveniently located hubs in major cities. For an additional fee, delivery to your location may be available.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What happens if the car breaks down?</h3>
                <p className="text-gray-600">
                  24/7 roadside assistance is included with your subscription. In case of longer repairs, a replacement vehicle will be provided.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready for a Better Long-Term Rental Experience?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the convenience, flexibility, and significant cost savings of Rush's subscription service compared to traditional long-term car rentals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="http://localhost:5006/subscription">
                <Button className="bg-primary hover:bg-accent text-white px-8 py-6 text-lg">
                  Browse Available Cars
                </Button>
              </Link>
              <Link href="/enquiry">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg">
                  Make an Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LongTermRental;
