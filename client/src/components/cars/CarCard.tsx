import { Link } from "wouter";
import { Car } from "@shared/schema";
import { formatCurrency, getCarImageUrl } from "@/lib/utils";
import { GreatValueBadge } from "@/components/ui/badges";
import styles from './CarCard.module.css';
import comparisonStyles from '../home/ComparisonSection.module.css';

interface CarCardProps {
  car: Car;
  size?: 'default' | 'large';
  isSubscription?: boolean;
  isVisible?: boolean;
  animationDelay?: number;
  customLink?: string;
}

const CarCard = ({ car, size = 'default', isSubscription = false, isVisible = true, animationDelay = 0, customLink }: CarCardProps) => {
  const imageSizes = {
    default: "h-48",
    large: "h-64"
  };

  // For second-hand cars, ensure we use the actual database ID
  const getDatabaseId = () => {
    if (isSubscription) {
      return car.dbId || car.id;
    } else {
      // For second-hand cars, car.dbId should be the actual database ID
      // If car.dbId is null/undefined, extract from car.id (e.g., "secondhand-123" -> "123")
      return car.dbId || (car.id.includes('secondhand-') ? car.id.replace('secondhand-', '') : car.id);
    }
  };

  const detailsLink = customLink || (isSubscription ? `/subscription-car/example?carId=${getDatabaseId()}` : `/car/detail?carId=${getDatabaseId()}`);
  
  // Debug logging
  if (isSubscription) {
    console.log('Subscription car link:', detailsLink, 'dbId:', car.dbId, 'id:', car.id, 'finalId:', getDatabaseId());
  } else {
    console.log('Second-hand car link:', detailsLink, 'dbId:', car.dbId, 'id:', car.id, 'finalId:', getDatabaseId());
  }

  if (!isSubscription) {
    // Second-hand car style using ComparisonSection design
    return (
      <div 
        className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-100 ${comparisonStyles.card} ${
          isVisible ? comparisonStyles.visible : ''
        }`}
        style={{ '--delay': `${animationDelay}ms` } as React.CSSProperties}
      >
        <Link href={detailsLink}>
          <div className="relative h-40 overflow-hidden">
            <img 
              src={car.image || getCarImageUrl(car.id)} 
              alt={`${car.make} ${car.model}`} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-car text-primary text-xl"></i>
              <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
            </div>
            <p className="text-gray-600 mb-4">{car.bodyType || car.category}</p>
            <div className="flex justify-between items-center">
              <div className="text-primary font-semibold">
                {car.category === 'secondhand' && (car as any).actualPrice ? (
                  // For second-hand cars, show the actual selling price
                  `$${((car as any).actualPrice).toLocaleString()}`
                ) : (
                  // For subscription cars or cars without actualPrice, show weekly price
                  `${formatCurrency(Math.round(car.weeklyPrice / 4.33))}/week`
                )}
              </div>
              <div className={`text-sm font-medium ${car.available ? 'text-green-600' : 'text-red-600'}`}>
                {car.status ? car.status.charAt(0).toUpperCase() + car.status.slice(1) : (car.available ? 'Available' : 'Not Available')}
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
            src={car.image || getCarImageUrl(car.id)} 
            alt={`${car.make} ${car.model}`} 
            className={styles.image}
          />
          {car.isGreatValue && <GreatValueBadge />}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${
              car.status?.toLowerCase() === 'available' || car.status?.toLowerCase() === 'active'
                ? 'bg-success-light text-success' 
                : 'bg-danger-light text-danger'
            }`}>
              {car.status 
                ? car.status.charAt(0).toUpperCase() + car.status.slice(1) 
                : (car.available ? 'Available' : 'Unavailable')}
            </span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-primary">{car.model}</h3>
              <p className="text-text-secondary">{car.bodyType || car.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-light">From</p>
              <div className="bg-primary text-white px-3 py-1.5 rounded-md font-bold">
                {formatCurrency(Math.round(car.weeklyPrice / 4.33))}/week
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
