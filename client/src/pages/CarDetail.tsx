import { Helmet } from "react-helmet-async";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Car } from "@shared/schema";
import CarDetails from "@/components/cars/CarDetails";

const CarDetail = () => {
  const [, params] = useRoute("/car/:id");
  const carId = params?.id || "";

  const { data: car, isLoading } = useQuery<Car>({
    queryKey: [`/api/cars/${carId}`],
  });

  return (
    <>
      <Helmet>
        <title>{isLoading ? "Loading..." : (car ? `${car.make} ${car.model} | Rush` : "Car Not Found | Rush")}</title>
        <meta 
          name="description" 
          content={car ? `Subscribe to the ${car.make} ${car.model} from ${car.weeklyPrice}/month. All-inclusive pricing with no hidden fees.` : "Car details page"} 
        />
      </Helmet>
      
      <CarDetails carId={carId} />
    </>
  );
};

export default CarDetail;
