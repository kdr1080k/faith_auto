import { useState, useEffect } from "react";
import { Link } from "wouter";
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 400);
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  useEffect(() => {
    return () => {
      setIsClosing(false);
    };
  }, []);

  return (
    <header className="bg-gray-800 bg-opacity-50 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className={`flex-shrink-0 ${styles.navItem} ${styles.logo}`}>
            <Link href="/" className="group">
              <img 
                src="/faith_auto.png" 
                alt="Faith Auto" 
                className="h-24 w-auto transform duration-300 group-hover:scale-110" 
              />
            </Link>
          </div>

          {/* Right side menu with navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className={`relative group ${styles.navItem} ${styles.services}`}>
              <button className="text-white hover:text-gray-200 flex items-center px-2 py-4 text-sm font-medium">
                <span className={styles.desktopMenuText}>Services</span>
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-1 w-48 bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-lg rounded-md py-1 z-10 dropdown-menu">
                <Link href="/subscription" className="relative block px-4 py-2 text-sm text-white hover:bg-white/10">
                  <span className={styles.dropdownMenuText}>Car Subscription</span>
                </Link>
                <Link href="/second-hand-cars" className="relative block px-4 py-2 text-sm text-white hover:bg-white/10">
                  <span className={styles.dropdownMenuText}>Second Hand Cars</span>
                </Link>
              </div>
            </div>
            <Link href="/about" className={`text-white hover:text-gray-200 px-2 py-4 text-sm font-medium ${styles.navItem} ${styles.aboutUs}`}>
              <span className={styles.desktopMenuText}>About Us</span>
            </Link>
            <Link href="/contact" className={`text-white hover:text-gray-200 px-2 py-4 text-sm font-medium ${styles.navItem} ${styles.contact}`}>
              <span className={styles.desktopMenuText}>Contact</span>
            </Link>
            <Link href="/faq" className={`text-white hover:text-gray-200 px-2 py-4 text-sm font-medium ${styles.navItem} ${styles.faq}`}>
              <span className={styles.desktopMenuText}>FAQ</span>
            </Link>
            <a href="tel:1800316965" className={`text-white hover:text-gray-200 flex items-center text-sm font-medium relative ${styles.navItem} ${styles.phone}`}>
              <span className={styles.desktopMenuText}>
                <i className="fas fa-phone-alt mr-1"></i>
                1800 316 965
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            type="button" 
            className="block md:hidden flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-white/10 focus:outline-none" 
            aria-controls="mobile-menu" 
            aria-expanded={isMobileMenuOpen}
            onClick={handleMobileMenuToggle}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {(isMobileMenuOpen || isClosing) && (
        <div 
          id="mobile-menu" 
          className={`md:hidden bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-md ${styles.mobileMenu} ${isClosing ? styles.closing : ''}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/subscription" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>Car Subscription</span>
            </Link>
            <Link href="/second-hand-cars" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>Second Hand Cars</span>
            </Link>
            <Link href="/about" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>About Us</span>
            </Link>
            <Link href="/contact" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>Contact</span>
            </Link>
            <Link href="/faq" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>FAQ</span>
            </Link>
            <a href="tel:1800316965" className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10 ${styles.mobileMenuItem}`}>
              <span className={styles.mobileMenuText}>
                <i className="fas fa-phone-alt mr-1"></i>
                1800 316 965
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
