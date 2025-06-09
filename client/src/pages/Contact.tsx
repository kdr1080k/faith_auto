import { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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

      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(0, 0, 0, 0.55), 
              rgba(0, 0, 0, 0.55)
            ),
            url('/pexels-bertellifotografia-13872477.jpg')
          `
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-2xl mx-auto text-center">
            <div 
              className="flex flex-col items-center opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
              style={{ animationDelay: '250ms' }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 cursor-default">
                Contact Us
              </h1>
            </div>
            <div 
              className="flex flex-col items-center mt-4 opacity-0 animate-[slide-fade-in_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]"
              style={{ animationDelay: '500ms' }}
            >
              <p className="text-lg md:text-xl text-white transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] cursor-default">
                Have questions about our car subscription service? Get in touch with our team today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-700 p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-primary focus:border-primary text-white placeholder-gray-400"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-accent text-white py-3">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-700 p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Get in touch</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Customer Support</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-300">
                      <i className="fas fa-phone-alt w-5 text-primary"></i>
                      <a href="tel:1800787422" className="ml-2 hover:text-primary">1800 7874 227</a>
                    </p>
                    <p className="flex items-center text-gray-300">
                      <i className="fas fa-envelope w-5 text-primary"></i>
                      <a href="mailto:melbourne@rushcarrental.com.au" className="ml-2 hover:text-primary">melbourne@rushcarrental.com.au</a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Business Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p>Saturday - Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Locations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-gray-300">
                      <i className="fas fa-map-marker-alt w-5 text-primary mt-1"></i>
                      <div className="ml-2">
                        <p className="font-medium">Westmeadows</p>
                        <p>Melbourne, VIC</p>
                        <p>Unit 3, 95-97 Western Ave,</p>
                        <p>Westmeadows, VIC 3049</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
