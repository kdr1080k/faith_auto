import { useEffect, useRef, useState } from 'react';
import { Link } from "wouter";
import styles from './ComparisonSection.module.css';

const ComparisonSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "Toyota",
      description: "RAV4",
      price: "$299/week",
      available: true,
      icon: "car"
    },
    {
      title: "BMW",
      description: "X5",
      price: "$899/week",
      available: true,
      icon: "car"
    },
    {
      title: "Hyundai",
      description: "Tucson",
      price: "$459/week",
      available: false,
      icon: "car"
    },
    {
      title: "Tesla",
      description: "Model 3",
      price: "$659/week",
      available: true,
      icon: "car"
    },
    {
      title: "Mercedes-Benz",
      description: "GLE",
      price: "$929/week",
      available: false,
      icon: "car"
    },
    {
      title: "Volkswagen",
      description: "Tiguan",
      price: "$529/week",
      available: true,
      icon: "car"
    },
    {
      title: "Audi",
      description: "Q7",
      price: "$999/week",
      available: true,
      icon: "car"
    },
    {
      title: "Mazda",
      description: "CX-5",
      price: "$489/week",
      available: true,
      icon: "car"
    },
    {
      title: "Honda",
      description: "CR-V",
      price: "$469/week",
      available: false,
      icon: "car"
    }
  ];

  // Group features into rows of 3
  const rows = features.reduce((acc, feature, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(feature);
    return acc;
  }, [] as typeof features[]);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-32 pb-32 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(249, 250, 251, 0.9), 
            rgba(243, 244, 246, 0.9)
          ),
          url('/pexels-bertellifotografia-13872477.jpg')
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Available Subscription Vehicles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our selection of subscription vehicles. All-inclusive weekly pricing with no hidden fees.
          </p>
        </div>

        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {row.map((feature) => (
                <div 
                  key={feature.title}
                  className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-100 ${styles.card} ${
                    isInView ? styles.visible : ''
                  }`}
                  style={{ '--delay': `${rowIndex * 400}ms` } as React.CSSProperties}
                >
                  <Link href="/subscription-car/example">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src="/pexels-prime-cinematics-1005175-2036544.jpg" 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <i className={`fas fa-${feature.icon} text-primary text-xl`}></i>
                        <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-primary font-semibold">{feature.price}</div>
                        <div className={`text-sm font-medium ${feature.available ? 'text-green-600' : 'text-red-600'}`}>
                          {feature.available ? 'Available' : 'Not Available'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
