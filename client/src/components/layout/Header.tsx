import { useState, useEffect } from "react";
import { Link } from "wouter";
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className={`flex-shrink-0 ${styles.navItem} ${styles.logo}`}>
            <Link href="/" className="group">
              <img 
                src="/header_logo.png"
                alt="Faith Auto"
                className="h-16 w-auto transform duration-300 group-hover:scale-110"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/subscription" className="text-white hover:text-gray-200 px-2 py-4 text-sm font-medium">
              <span className={styles.desktopMenuText}>Car Subscription</span>
            </Link>
            <Link href="/second-hand-cars" className="text-white hover:text-gray-200 px-2 py-4 text-sm font-medium">
              <span className={styles.desktopMenuText}>Stock List</span>
            </Link>
            <Link href="/about" className="text-white hover:text-gray-200 px-2 py-4 text-sm font-medium">
              <span className={styles.desktopMenuText}>About Us</span>
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-200 px-2 py-4 text-sm font-medium">
              <span className={styles.desktopMenuText}>Contact</span>
            </Link>
            <Link href="/faq" className="text-white hover:text-gray-200 px-2 py-4 text-sm font-medium">
              <span className={styles.desktopMenuText}>FAQ</span>
            </Link>
            <a href="tel:1800316965" className="text-white hover:text-gray-200 flex items-center text-sm font-medium">
              <span className={styles.desktopMenuText}>
                <i className="fas fa-phone-alt mr-1"></i>
                1800 316 965
              </span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:hidden absolute top-full left-0 right-0 bg-gray-800 bg-opacity-95 backdrop-blur-sm ${
              isClosing ? styles.slideOut : styles.slideIn
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/subscription" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>Car Subscription</span>
              </Link>
              <Link href="/second-hand-cars" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>Stock List</span>
              </Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>About Us</span>
              </Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>Contact</span>
              </Link>
              <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>FAQ</span>
              </Link>
              <a href="tel:1800316965" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                <span className={styles.mobileMenuText}>
                  <i className="fas fa-phone-alt mr-1"></i>
                  1800 316 965
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
