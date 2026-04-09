import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Home, Users, Target, Award, Clock, Shield, ThumbsUp, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              About HomeLink
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100">
              We help people find their dream homes easily, quickly, and securely.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                HomeLink is a modern real estate platform designed to connect buyers,
                sellers, and renters in one place. Our mission is to simplify the
                property search experience using technology.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether you're looking for a house, apartment, or investment property,
                we provide the best listings and tools to help you make the right decision.
              </p>
              <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Shield className="text-green-600 w-5 h-5" />
                  <span className="text-gray-700">Secure Transactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="text-blue-600 w-5 h-5" />
                  <span className="text-gray-700">100% Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600 rounded-lg opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-600 rounded-lg opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                alt="Modern real estate building"
                className="rounded-2xl shadow-lg w-full h-auto relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-white py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To revolutionize the real estate industry by providing a seamless, 
                  transparent, and user-friendly platform that connects people with 
                  their perfect properties.
                </p>
              </div>
              <div className="text-center md:text-left p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted and innovative real estate platform, 
                  empowering millions to find their dream homes with confidence and ease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide exceptional service and innovative solutions to make your property journey smooth
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Home className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Wide Listings</h3>
              <p className="text-gray-600">
                Access a large variety of properties tailored to your needs and budget preferences.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-emerald-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Trusted Agents</h3>
              <p className="text-gray-600">
                Work with verified and experienced real estate professionals who prioritize your needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-indigo-600 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Search</h3>
              <p className="text-gray-600">
                Find properties faster using our advanced filtering system and AI-powered recommendations.
              </p>
            </div>

          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">500+</h3>
                <p className="text-blue-100">Properties Listed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">300+</h3>
                <p className="text-blue-100">Happy Clients</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">50+</h3>
                <p className="text-blue-100">Expert Agents</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">98%</h3>
                <p className="text-blue-100">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dedicated professionals committed to your success
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://randomuser.me/api/portraits/women/1.jpg" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">10+ years in real estate</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://randomuser.me/api/portraits/men/2.jpg" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Michael Chen</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">Tech innovation leader</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src="https://randomuser.me/api/portraits/women/3.jpg" 
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Emily Rodriguez</h3>
              <p className="text-blue-600 mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">Client satisfaction expert</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of happy homeowners who found their perfect property with HomeLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/properties" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg inline-block"
              >
                Browse Properties
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;