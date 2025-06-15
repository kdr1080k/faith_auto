import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import LocationMap from './LocationMap';
import styles from './Footer.module.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-gray-400 py-12">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? styles.animate : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Services */}
          <div className={`${styles.footerColumn} lg:col-span-1`}>
            <h3 className="font-bold text-lg mb-4 text-white">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/car-listing" className="group">
                  <span className={styles.footerLink}>Car Listings</span>
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="group">
                  <span className={styles.footerLink}>Car Subscription</span>
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}
          <div className={`${styles.footerColumn} lg:col-span-1`}>
            <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="group">
                  <span className={styles.footerLink}>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="group">
                  <span className={styles.footerLink}>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group">
                  <span className={styles.footerLink}>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={`${styles.footerColumn} lg:col-span-1`}>
            <h3 className="font-bold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@faithauto.com.au" className="group">
                  <span className={styles.footerLink}>info@faithauto.com.au</span>
                </a>
              </li>
              <li>
                <a href="tel:1800316965" className="group">
                  <span className={styles.footerLink}>1800 316 965</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className={`${styles.footerColumn} lg:col-span-2`}>
            <h3 className="font-bold text-lg mb-4 text-white">Location</h3>
            <address className="not-italic mb-4 space-y-2">
              <p>Westmeadows</p>
              <p>Melbourne, VIC</p>
              <p>Unit 3, 95-97 Western Ave,</p>
              <p>Westmeadows, VIC 3049</p>
            </address>
            <div className="mt-4">
              <LocationMap />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Faith Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
