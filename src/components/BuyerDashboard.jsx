import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BuyerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    propertyType: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("search");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Get user data
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Load saved properties
    const saved = localStorage.getItem("savedProperties");
    if (saved) {
      setSavedProperties(JSON.parse(saved));
    }

    // Mock properties data
    const mockProperties = [
      {
        id: 1,
        title: "Modern Downtown Condo",
        price: 450000,
        location: "Downtown, New York",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        propertyType: "condo",
        image: "https://via.placeholder.com/400x300",
        yearBuilt: 2020,
        description: "Beautiful modern condo in the heart of downtown with amazing views."
      },
      {
        id: 2,
        title: "Suburban Family Home",
        price: 650000,
        location: "Brooklyn, New York",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2500,
        propertyType: "house",
        image: "https://via.placeholder.com/400x300",
        yearBuilt: 2015,
        description: "Spacious family home with large backyard and modern amenities."
      },
      {
        id: 3,
        title: "Luxury Penthouse",
        price: 1200000,
        location: "Manhattan, New York",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        propertyType: "condo",
        image: "https://via.placeholder.com/400x300",
        yearBuilt: 2022,
        description: "Luxury penthouse with panoramic city views and premium finishes."
      },
      {
        id: 4,
        title: "Cozy Townhouse",
        price: 380000,
        location: "Queens, New York",
        bedrooms: 2,
        bathrooms: 1.5,
        sqft: 1100,
        propertyType: "townhouse",
        image: "https://via.placeholder.com/400x300",
        yearBuilt: 2010,
        description: "Charming townhouse in a quiet neighborhood close to public transport."
      },
      {
        id: 5,
        title: "Beachfront Villa",
        price: 850000,
        location: "Long Island, New York",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        propertyType: "house",
        image: "https://via.placeholder.com/400x300",
        yearBuilt: 2018,
        description: "Stunning beachfront property with private beach access."
      }
    ];
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
  }, [navigate]);

  // Filter properties
  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filters
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }

    // Property type filter
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, filters, properties]);

  const handleSaveProperty = (property) => {
    let updatedSaved;
    if (savedProperties.some(p => p.id === property.id)) {
      updatedSaved = savedProperties.filter(p => p.id !== property.id);
    } else {
      updatedSaved = [...savedProperties, property];
    }
    setSavedProperties(updatedSaved);
    localStorage.setItem("savedProperties", JSON.stringify(updatedSaved));
  };

  const handleScheduleTour = (property) => {
    alert(`Tour scheduled for ${property.title}! A representative will contact you.`);
  };

  const handleContactAgent = (property) => {
    alert(`Contact request sent for ${property.title}. An agent will reach out shortly.`);
  };

  const message = location.state?.message;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Message */}
        {message && showMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setShowMessage(false)} className="text-green-700">×</button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Find Your Dream Home 🏠
          </h1>
          <p className="text-gray-600">
            Welcome back, {userData?.name}! Browse through our curated list of properties.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("search")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "search"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Search Properties
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "saved"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Saved Properties ({savedProperties.length})
          </button>
        </div>

        {activeTab === "search" && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"} 🔍
                </button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Filter Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <input
                      type="number"
                      placeholder="$"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <input
                      type="number"
                      placeholder="$"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      value={filters.propertyType}
                      onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All</option>
                      <option value="house">House</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setFilters({ minPrice: "", maxPrice: "", bedrooms: "", propertyType: "" })}
                  className="mt-4 text-sm text-red-600 hover:text-red-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${property.price.toLocaleString()}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500 mb-3">
                      <span>{property.bedrooms} beds</span>
                      <span>{property.bathrooms} baths</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveProperty(property)}
                        className={`flex-1 py-2 rounded-lg font-semibold transition ${
                          savedProperties.some(p => p.id === property.id)
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {savedProperties.some(p => p.id === property.id) ? "Saved ✓" : "Save"}
                      </button>
                      <button
                        onClick={() => handleScheduleTour(property)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        Tour
                      </button>
                    </div>
                    <button
                      onClick={() => handleContactAgent(property)}
                      className="w-full mt-2 py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition"
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No properties found matching your criteria.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "saved" && (
          <div>
            {savedProperties.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">You haven't saved any properties yet.</p>
                <p className="text-gray-400 text-sm mt-2">Click "Save" on properties you're interested in.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        ${property.price.toLocaleString()}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500 mb-3">
                        <span>{property.bedrooms} beds</span>
                        <span>{property.bathrooms} baths</span>
                        <span>{property.sqft} sqft</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveProperty(property)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleScheduleTour(property)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          Schedule Tour
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default BuyerDashboard;