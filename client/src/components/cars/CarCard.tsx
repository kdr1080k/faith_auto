import { Link } from "wouter";
import { Car } from "@shared/schema";
import { formatCurrency, getCarImageUrl } from "@/lib/utils";
import { GreatValueBadge } from "@/components/ui/badges";
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  size?: 'default' | 'large';
  isSubscription?: boolean;
}

const CarCard = ({ car, size = 'default', isSubscription = false }: CarCardProps) => {
  const imageSizes = {
    default: "h-48",
    large: "h-64"
  };

  const detailsLink = isSubscription ? `/subscription-car/${car.id}` : `/car/${car.id}`;

  if (!isSubscription) {
    // Second-hand car style
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <Link href={detailsLink}>
          <div className="relative">
            <img 
              src={getCarImageUrl(car.id)} 
              alt={`${car.make} ${car.model}`} 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-car text-gray-500"></i>
              <h3 className="text-lg text-gray-800">{car.make}</h3>
            </div>
            <p className="text-gray-600 mb-3">{car.model}</p>
            <div className="flex justify-between items-center">
              <div className="text-gray-700">${formatCurrency(car.weeklyPrice)}/week</div>
              <div className={`text-sm ${car.available ? 'text-green-600' : 'text-red-600'}`}>
                {car.available ? 'Available' : 'Not Available'}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Subscription car style (original design)
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <Link href={detailsLink}>
        <div className={styles.imageContainer}>
          <img 
            src={getCarImageUrl(car.id)} 
            alt={`${car.make} ${car.model}`} 
            className={styles.image}
          />
          {car.isGreatValue && <GreatValueBadge />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
              car.available 
                ? 'bg-success-light text-success' 
                : 'bg-danger-light text-danger'
            }`}>
              {car.available ? 'Available' : 'Not Available'}
            </span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{car.make}</h3>
              <p className="text-text-secondary">{car.model}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-light">From</p>
              <div className="bg-primary text-white px-3 py-1.5 rounded-md font-bold">
                {formatCurrency(car.weeklyPrice)}/week
              </div>
              <p className="text-sm text-text-light mt-1">Per Week</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
