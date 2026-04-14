import { useState, useEffect } from "react";

function Hero() {
  const images = [
    "/home1.avif",
    "/home2.avif",
    "/home3.jpg",
    "/home4.jpg",
    "/home5.jpg"
  ];

  const [current, setCurrent] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAddProperty = () => {
    if (isLoggedIn) {
      // Navigate to add property page
      window.location.href = "/add-property";
    } else {
      setShowAuthModal(true);
    }
  };

  const handleExploreNow = () => {
    window.location.href = "/explore";
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={images[current]}
          alt="Hero background"
          className="w-full h-full object-cover brightness-95"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Home
          </h1>

          <p className="mb-6">
            Buy, Rent, or Sell properties easily with HomeLink
          </p>

          <div className="flex gap-4">
            <button 
              onClick={handleExploreNow}
              className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-semibold"
            >
              Explore Now
            </button>
            
            <button 
              onClick={handleAddProperty}
              className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-lg font-semibold"
            >
              Add Property
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create an Account</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to add a property. Please sign up or login to continue.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = "/signup"}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
              <button 
                onClick={() => window.location.href = "/login"}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Login
              </button>
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;