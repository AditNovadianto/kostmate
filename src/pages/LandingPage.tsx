import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shirt,
  Droplets,
  Lightbulb,
  Sparkles,
  ShoppingBag,
  Clock,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      icon: Shirt,
      title: "Express Laundry",
      description: "Quick wash, dry, and fold service delivered to your room",
      price: "Starting from $3"
    },
    {
      icon: Droplets,
      title: "Gallon Delivery",
      description: "Fresh drinking water delivered straight to your door",
      price: "Starting from $2"
    },
    {
      icon: Lightbulb,
      title: "Lamp Replacement",
      description: "Quick electrical fixes and bulb replacements",
      price: "Starting from $5"
    },
    {
      icon: Sparkles,
      title: "Room Cleaning",
      description: "Professional cleaning service for your living space",
      price: "Starting from $8"
    },
    {
      icon: ShoppingBag,
      title: "Shopping Assistant",
      description: "We shop for your daily needs and deliver them to you",
      price: "Starting from $4"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Fast & Reliable",
      description: "Quick response times and reliable service delivery"
    },
    {
      icon: Users,
      title: "Local Partners",
      description: "Trusted local service providers in your area"
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "All services are vetted and quality guaranteed"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Service",
      description: "Select from our range of daily services"
    },
    {
      number: "02",
      title: "Book Online",
      description: "Schedule your service at your convenience"
    },
    {
      number: "03",
      title: "Get Served",
      description: "Our partners deliver quality service to your room"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className={`${scrolled ? 'backdrop-blur-md bg-white/30' : 'bg-transparent'} transition-all fixed top-0 w-full mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="cursor-pointer flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Kostmate</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">Services</a>
              <a href="#how-it-works" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</a>
              <a href="#about" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">About</a>
              <a href="#contact" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Daily Services for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500"> Boarding House</span> Residents
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Kostmate connects you with trusted local service providers for laundry, cleaning, delivery, and more.
              Making your boarding house life easier, one service at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Ordering Now
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From daily essentials to quick fixes, we've got your boarding house needs covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">{service.price}</span>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Kostmate Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting the services you need is as easy as 1-2-3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Kostmate?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making your boarding house experience better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-white mb-6">
              "Kostmate has been a game-changer for my boarding house life. The laundry service is so convenient,
              and the delivery is always on time. Highly recommended!"
            </blockquote>
            <cite className="text-white/80">— Sarah M., Boarding House Resident</cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Simplify Your Daily Life?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of boarding house residents who trust Kostmate for their daily needs
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="ml-2 text-xl font-bold text-white">Kostmate</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Making boarding house life easier by connecting residents with trusted local service providers.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+62 812-3456-7890</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Express Laundry</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Gallon Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Lamp Replacement</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Room Cleaning</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Shopping Assistant</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kostmate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;