import { useEffect } from "react";
import { useLocation } from "wouter";

const ScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Immediate scroll to top for route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Also ensure scroll position is reset after any async content loads
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
};

export default ScrollToTop; 