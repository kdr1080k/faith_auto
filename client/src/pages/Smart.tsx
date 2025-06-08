import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Smart = () => {
  return (
    <>
      <Helmet>
        <title>Smart EV Subscription | Rush</title>
        <meta name="description" content="Subscribe to the Smart #1 and Smart #3 on Rush Car Subscription. Skip the waitlist and subscribe with Australia's largest EV car subscription provider." />
      </Helmet>
      
      <Hero 
        title="Smart"
        subtitle="You can now subscribe to the Smart #1 and Smart #3 on Rush Car Subscription. Skip the waitlist and subscribe with Australia's largest EV car subscription provider."
        buttonText="Browse smart cars"
        buttonLink="http://localhost:5006/subscription"
        backgroundImage="https://images.unsplash.com/photo-1574270981993-4b7bfdb6014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
      />
      
      <section id="smart-cars" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Smart Electric Vehicles</h2>
            <p className="text-gray-600 mb-6">
              Smart is revolutionizing the electric vehicle market with its innovative #1 and #3 models. 
              Experience cutting-edge technology, impressive range, and premium features without the long-term commitment 
              of ownership through Rush's flexible subscription service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Why choose Smart?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Zero emissions with 100% electric powertrains</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Premium German engineering with Chinese manufacturing efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Advanced technology including voice control and AI features</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Range of up to 440km on a single charge</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Subscription benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Skip the waitlist for new Smart EVs</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>All-inclusive pricing covers registration, insurance, maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>No long-term commitment - flexible subscription plans</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-primary mt-1 mr-2"></i>
                    <span>Easy vehicle swap if you want to try different Smart models</span>
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/subscription">
              <Button variant="outline" className="bg-white hover:bg-gray-100 border-primary text-primary">
                Learn more about our subscription plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FeaturedCars title="Available Smart Cars" carCategory="smart" />
    </>
  );
};

export default Smart;
