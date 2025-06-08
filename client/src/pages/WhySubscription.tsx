import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import FeaturedCars from "@/components/home/FeaturedCars";
import AllInclusive from "@/components/home/AllInclusive";
import ComparisonSection from "@/components/home/ComparisonSection";
import CarSearchForm from "@/components/home/CarSearchForm";
import ContactCTA from "@/components/home/ContactCTA";

const WhySubscription = () => {
  return (
    <>
      <Helmet>
        <title>Car Subscription | Faith Auto</title>
        <meta name="description" content="Experience the future of car ownership with our flexible car subscription service. All-inclusive pricing with no long-term commitment." />
      </Helmet>
      
      <Hero 
        title="Car Subscription Service"
        subtitle="Drive the car you want with all-inclusive pricing. No long-term commitment, just flexible mobility solutions tailored to your lifestyle."
        buttonText="Browse our cars"
        buttonLink="/subscription-inventory"
        secondaryButtonText="Make an Enquiry"
        secondaryButtonLink="/enquiry"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <img 
                src="/pexels-shkrabaanthony-7144207.jpg" 
                alt="Modern car subscription service" 
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">What is a Car Subscription?</h2>
              <div className="prose prose-lg">
                <p className="text-gray-600 mb-6">
                  Think of it as Netflix for cars - a modern, hassle-free way to drive the car you want without the long-term commitments of traditional ownership or leasing. Our car subscription service offers you complete freedom and flexibility in your driving journey.
                </p>
                <p className="text-gray-600 mb-6">
                  With a simple all-inclusive weekly payment, you get access to your chosen vehicle plus everything you need to hit the road - registration, insurance, maintenance, and roadside assistance are all covered. No more juggling multiple bills or worrying about unexpected repair costs.
                </p>
                <p className="text-gray-600">
                  Whether you need a car for a few months or longer, our subscription model adapts to your lifestyle. Want to switch to a different vehicle? No problem. Your needs change? Simply return the car with minimal notice. It's car ownership reimagined for the modern driver in Melbourne, Sydney, Brisbane, Perth, and Adelaide.
                </p>
              </div>
              <div className="mt-8">
                <a href="/subscription-inventory" className="inline-flex items-center text-gray-800 font-semibold hover:text-primary transition-colors">
                  Explore our subscription plans
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Car Subscription?</h2>
            <p className="text-xl text-gray-600">All-inclusive car subscription with no hidden costs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-calendar-alt text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Terms</h3>
              <p className="text-gray-600">
                Subscribe month-to-month with no long-term commitment. Change or return your car when needed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-dollar-sign text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">All-Inclusive Price</h3>
              <p className="text-gray-600">
                One simple payment covers registration, insurance, maintenance, and roadside assistance.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-sync-alt text-primary text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Swap Vehicles</h3>
              <p className="text-gray-600">
                Switch between different vehicles to suit your changing needs and lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CarSearchForm />
      
      <ComparisonSection />

      <ContactCTA />
    </>
  );
};

export default WhySubscription;
