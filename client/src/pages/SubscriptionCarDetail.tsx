import { Helmet } from "react-helmet-async";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import SubscriptionCarDetails from "@/components/cars/SubscriptionCarDetails";

const SubscriptionCarDetail = () => {
  const [, params] = useRoute("/subscription-car/:id");
  const carId = params?.id || "";

  const { data: car, isLoading } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
  });

  return (
    <>
      <Helmet>
        <title>
          {isLoading 
            ? "Loading..." 
            : (car 
              ? `${car.make} ${car.model} Subscription | Faith Auto` 
              : "Car Not Found | Faith Auto")}
        </title>
        <meta 
          name="description" 
          content={car 
            ? `Subscribe to the ${car.make} ${car.model} from $${car.weeklyPrice}/week. All-inclusive subscription with insurance and maintenance.` 
            : "Car subscription details"} 
        />
      </Helmet>
      
      <SubscriptionCarDetails carId={carId} />
    </>
  );
};

export default SubscriptionCarDetail; 