import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import styles from './Hero.module.css';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  height?: 'small' | 'medium' | 'large';
  backgroundImage?: string;
}

// Images are in the client/public directory
const images = [
  '/pexels-prime-cinematics-1005175-2036544.jpg',
  '/pexels-svonhorst-2920064.jpg',
  '/kia-k8-hero.jpg'
];

const Hero = ({
  title = "Smart",
  subtitle = "You can now subscribe to the Smart #1 and Smart #3 on Rush Car Subscription. Skip the waitlist and subscribe with Australia's largest EV car subscription provider.",
  buttonText = "Browse smart cars",
  buttonLink = "/smart",
  secondaryButtonText,
  secondaryButtonLink,
  height = 'large',
  backgroundImage,
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = (e) => {
              console.error(`Error loading image ${src}:`, e);
              reject(e);
            };
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || backgroundImage) return;

    const interval = setInterval(() => {
      setInitialRender(false);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [imagesLoaded, backgroundImage]);

  return (
    <section className={`relative pt-0 overflow-hidden ${
      height === 'medium' ? '' : 'pb-20 md:pb-28 lg:pb-32'
    }`}>
      {/* Slideshow */}
      <div className={styles.slideshow}>
        {backgroundImage ? (
          <div className={`${styles.slide} ${styles.active}`} style={{
            backgroundImage: `
              linear-gradient(to bottom, 
                rgba(0, 0, 0, 0.55), 
                rgba(0, 0, 0, 0.55)
              ),
              url('${backgroundImage}')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          </div>
        ) : (
          images.map((image, index) => (
            <div
              key={image}
              className={`${styles.slide} ${index === currentImageIndex ? styles.active : ''} ${index === 0 && initialRender ? styles.instantFade : ''}`}
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, 
                    rgba(0, 0, 0, 0.55), 
                    rgba(0, 0, 0, 0.55)
                  ),
                  url('${image}')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
          ))
        )}
      </div>
      
      {/* Content */}
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center z-20 pt-16 ${
        height === 'small' 
          ? 'min-h-[300px] md:min-h-[350px] lg:min-h-[400px]'
          : height === 'medium'
          ? 'h-[600px]'
          : 'min-h-[600px] md:min-h-[700px] lg:min-h-[800px]'
      }`}>
        <div className="max-w-4xl">
          <div 
            className="inline-block opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
            style={{ animationDelay: '250ms' }}
          >
            <h1 className={`text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-default ${styles.smoothUnderline}`}>
              {title}
            </h1>
          </div>
          
          <div 
            className="inline-block mt-4 opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-lg md:text-xl text-white transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] cursor-default">
              {subtitle}
            </p>
          </div>
          
          <div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
            style={{ animationDelay: '750ms' }}
          >
            <Link href={buttonLink}>
              <Button className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-500 ease-out hover:scale-105 shadow-md">
                {buttonText}
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink}>
                <Button variant="outline" className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium transition-all duration-500 ease-out hover:scale-105 shadow-md border-gray-300">
                  {secondaryButtonText}
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
