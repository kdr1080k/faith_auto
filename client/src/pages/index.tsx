import Link from 'next/link';
import { Button } from '@/components/ui/button';

          {/* Featured Vehicles Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Japanese Imports</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover our hand-selected collection of premium Japanese vehicles, each chosen for its exceptional quality, 
                  performance, and reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Performance Category */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src="/nissan-gtr.jpg" 
                      alt="Nissan GT-R" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                      Performance
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Nissan GT-R R34</h3>
                    <p className="text-gray-600 mb-4">Iconic performance, legendary status. The epitome of Japanese engineering excellence.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">Available for Import</span>
                      <Link href="/inventory/performance">
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Luxury Category */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src="/toyota-century.jpg" 
                      alt="Toyota Century" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                      Luxury
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Toyota Century</h3>
                    <p className="text-gray-600 mb-4">The pinnacle of Japanese luxury, handcrafted for unparalleled comfort.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">Limited Availability</span>
                      <Link href="/inventory/luxury">
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Classic Category */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src="/toyota-supra.jpg" 
                      alt="Toyota Supra" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
                      Classic
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Toyota Supra MK4</h3>
                    <p className="text-gray-600 mb-4">A timeless classic that defines the golden era of Japanese sports cars.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">Inquire Now</span>
                      <Link href="/inventory/classic">
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/inventory">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg">
                    View Full Inventory
                  </Button>
                </Link>
              </div>

              {/* Vehicle Categories Overview */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: 'Performance',
                    description: 'GT-R, Supra, Type R',
                    icon: 'fa-gauge-high'
                  },
                  {
                    title: 'Luxury',
                    description: 'Century, Crown, Celsior',
                    icon: 'fa-crown'
                  },
                  {
                    title: 'Classic',
                    description: 'Vintage & collectible models',
                    icon: 'fa-star'
                  },
                  {
                    title: 'Family',
                    description: 'Alphard, Hiace, Land Cruiser',
                    icon: 'fa-users'
                  }
                ].map((category, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`fas ${category.icon} text-primary`}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section> 