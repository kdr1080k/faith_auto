import { Helmet } from "react-helmet-async";
import SubscriptionCarsSection from "@/components/subscription/SubscriptionCarsSection";

const SubscriptionInventory = () => {
  return (
    <>
      <Helmet>
        <title>Subscription Inventory | Faith Auto</title>
        <meta name="description" content="Browse our complete selection of subscription vehicles. All-inclusive weekly pricing with no long-term commitment." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center bg-no-repeat flex items-center" style={{
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          url('/pexels-joshsorenson-59512.jpg')
        `
      }}>
        {/* Content container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="pt-24">
            <h1 className="animate-fade-up text-4xl md:text-5xl font-bold text-white mb-4" style={{ animationDelay: '200ms' }}>
              Subscription Vehicle Collection
            </h1>
            <p className="animate-fade-right text-xl text-white max-w-3xl mx-auto" style={{ animationDelay: '400ms' }}>
              Browse our complete selection of subscription vehicles with all-inclusive weekly pricing.
              No long-term commitment, just flexible mobility solutions.
            </p>
          </div>
        </div>
      </section>

      <SubscriptionCarsSection />
    </>
  );
};

export default SubscriptionInventory; 