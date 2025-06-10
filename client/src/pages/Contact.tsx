import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  // Create refs for all sections that need scroll animations
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Add professional CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-up {
        from {
          opacity: 0;
          transform: translate3d(0, 40px, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes fade-right {
        from {
          opacity: 0;
          transform: translate3d(-50px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .animate-fade-up {
        animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-right {
        animation: fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
        will-change: opacity, transform;
        backface-visibility: hidden;
      }

      .animate-fade-up.animate-in,
      .animate-fade-right.animate-in {
        will-change: auto;
      }
    `;
    document.head.appendChild(style);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Clean up performance properties after animation
          setTimeout(() => {
            (entry.target as HTMLElement).style.willChange = 'auto';
          }, 1000);
        }
      });
    };

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
    animatedElements.forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Faith Auto</title>
        <meta name="description" content="Get in touch with the Faith Auto team for inquiries about our car subscription service, support, or partnerships." />
      </Helmet>

      {/* Full Page Background with Banner */}
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{
        backgroundImage: `
          linear-gradient(to bottom, 
            rgba(0, 0, 0, 0.55), 
            rgba(0, 0, 0, 0.55)
          ),
          url('/pexels-bertellifotografia-13872477.jpg')
        `
      }}>
        {/* Hero Banner Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-2xl mx-auto text-center">
              <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-default">
                  Contact Us
                </h1>
              </div>
              <div className="animate-fade-right mt-4" style={{ animationDelay: '400ms' }}>
                <p className="text-lg md:text-xl text-white transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] cursor-default">
                  Have questions about our car subscription service? Get in touch with our team today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-230 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="animate-fade-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-paper-plane text-white text-lg"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 group-hover:border-white/40"
                          required
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 group-hover:border-white/40"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 group-hover:border-white/40"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-200 group-hover:border-white/40 resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="animate-fade-up w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ animationDelay: '600ms' }}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <i className="fas fa-paper-plane mr-2"></i>
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Info Card */}
                <div className="animate-fade-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300" style={{ animationDelay: '400ms' }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-headset text-white text-lg"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">Customer Support</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-200">
                      <div className="w-10 h-10 bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-phone-alt text-blue-300"></i>
                      </div>
                      <div>
                        <p className="animate-fade-right text-sm text-gray-300" style={{ animationDelay: '500ms' }}>Phone</p>
                        <a href="tel:1800787422" className="animate-fade-right text-white font-semibold hover:text-blue-300 transition-colors" style={{ animationDelay: '600ms' }}>
                          1800 7874 227
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors duration-200">
                      <div className="w-10 h-10 bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-envelope text-blue-300"></i>
                      </div>
                      <div>
                        <p className="animate-fade-right text-sm text-gray-300" style={{ animationDelay: '700ms' }}>Email</p>
                        <a href="mailto:melbourne@rushcarrental.com.au" className="animate-fade-right text-white font-semibold hover:text-blue-300 transition-colors break-all" style={{ animationDelay: '800ms' }}>
                          melbourne@rushcarrental.com.au
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="animate-fade-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300" style={{ animationDelay: '500ms' }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-white text-lg"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">Business Hours</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <span className="animate-fade-right font-semibold text-gray-200" style={{ animationDelay: '700ms' }}>Monday - Friday</span>
                      <span className="animate-fade-right text-white font-medium" style={{ animationDelay: '800ms' }}>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <span className="animate-fade-right font-semibold text-gray-200" style={{ animationDelay: '900ms' }}>Saturday - Sunday</span>
                      <span className="animate-fade-right text-white font-medium" style={{ animationDelay: '1000ms' }}>9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="animate-fade-up bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300" style={{ animationDelay: '600ms' }}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-map-marker-alt text-white text-lg"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">Our Location</h3>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <i className="fas fa-building text-red-300 text-sm"></i>
                      </div>
                      <div>
                        <p className="animate-fade-right font-bold text-white" style={{ animationDelay: '800ms' }}>Westmeadows</p>
                        <p className="animate-fade-right text-gray-200 font-medium" style={{ animationDelay: '900ms' }}>Melbourne, VIC</p>
                        <div className="mt-2 text-gray-300">
                          <p className="animate-fade-right" style={{ animationDelay: '1000ms' }}>Unit 3, 95-97 Western Ave,</p>
                          <p className="animate-fade-right" style={{ animationDelay: '1100ms' }}>Westmeadows, VIC 3049</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
