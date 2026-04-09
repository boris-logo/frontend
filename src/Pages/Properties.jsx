import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Properties() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      image: "/home1.avif",
      title: "Modern House",
      location: "Kigali, Rwanda",
      price: "$500/month",
      beds: 3,
      baths: 2,
      area: "1500 sqft",
      type: "House",
      status: "For Rent",
      featured: true
    },
    {
      id: 2,
      image: "/home2.avif",
      title: "Luxury Villa",
      location: "Kigali, Rwanda",
      price: "$1200/month",
      beds: 5,
      baths: 4,
      area: "3500 sqft",
      type: "Villa",
      status: "For Rent",
      featured: true
    },
    {
      id: 3,
      image: "/home3.jpg",
      title: "Apartment",
      location: "Kigali, Rwanda",
      price: "$300/month",
      beds: 2,
      baths: 1,
      area: "800 sqft",
      type: "Apartment",
      status: "For Rent",
      featured: false
    },
    {
      id: 4,
      image: "/home4.jpg",
      title: "Family House",
      location: "Kigali, Rwanda",
      price: "$700/month",
      beds: 4,
      baths: 3,
      area: "2200 sqft",
      type: "House",
      status: "For Sale",
      featured: true
    },
    {
      id: 5,
      image: "/home5.jpg",
      title: "Studio Room",
      location: "Kigali, Rwanda",
      price: "$200/month",
      beds: 1,
      baths: 1,
      area: "450 sqft",
      type: "Studio",
      status: "For Rent",
      featured: false
    },
    {
      id: 6,
      image: "/home6.jpg",
      title: "Beachfront Villa",
      location: "Rubavu, Rwanda",
      price: "$1500/month",
      beds: 4,
      baths: 3,
      area: "2800 sqft",
      type: "Villa",
      status: "For Rent",
      featured: true
    },
    {
      id: 7,
      image: "/home7.jpg",
      title: "Downtown Condo",
      location: "Kigali, Rwanda",
      price: "$850/month",
      beds: 2,
      baths: 2,
      area: "1200 sqft",
      type: "Condo",
      status: "For Sale",
      featured: false
    },
    {
      id: 8,
      image: "/home8.jpg",
      title: "Garden House",
      location: "Musanze, Rwanda",
      price: "$600/month",
      beds: 3,
      baths: 2,
      area: "1800 sqft",
      type: "House",
      status: "For Rent",
      featured: false
    },
    {
      id: 9,
      image: "/home9.jpg",
      title: "Penthouse Suite",
      location: "Kigali, Rwanda",
      price: "$2000/month",
      beds: 3,
      baths: 3,
      area: "2500 sqft",
      type: "Penthouse",
      status: "For Rent",
      featured: true
    }
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const propertiesPerPage = 6;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and search properties
  useEffect(() => {
    let filtered = properties;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== "All") {
      filtered = filtered.filter(property => property.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(property => property.status === selectedStatus);
    }

    // Price range filter
    if (selectedPriceRange !== "All") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(property => {
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Sorting
    if (sortBy === "price_low") {
      filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === "price_high") {
      filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === "beds") {
      filtered.sort((a, b) => b.beds - a.beds);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedStatus, selectedPriceRange, sortBy, properties]);

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Toggle wishlist
  const toggleWishlist = (propertyId) => {
    if (wishlist.includes(propertyId)) {
      setWishlist(wishlist.filter(id => id !== propertyId));
    } else {
      setWishlist([...wishlist, propertyId]);
    }
  };

  // Property Card Component
  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Property+Image";
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            property.status === "For Rent" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
          }`}>
            {property.status}
          </span>
          {property.featured && (
            <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-500 text-white">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={() => toggleWishlist(property.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
        >
          <svg 
            className={`w-5 h-5 ${wishlist.includes(property.id) ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            <Link to={`/property/${property.id}`}>{property.title}</Link>
          </h3>
          <p className="text-2xl font-bold text-blue-600">{property.price}</p>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9h14M5 15h14M12 3v18" />
              </svg>
              <span>{property.beds} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4z" />
              </svg>
              <span>{property.baths} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{property.area}</span>
            </div>
          </div>
          <Link 
            to={`/property/${property.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );

  // List View Card Component
  const PropertyListItem = ({ property }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
      <div className="relative md:w-1/3">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-56 md:h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Property+Image";
          }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            property.status === "For Rent" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
          }`}>
            {property.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              <Link to={`/property/${property.id}`}>{property.title}</Link>
            </h3>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{property.price}</p>
        </div>
        
        <div className="flex gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 9h14M5 15h14M12 3v18" />
            </svg>
            <span>{property.beds} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4z" />
            </svg>
            <span>{property.baths} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{property.area}</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Link 
            to={`/property/${property.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            View Details
          </Link>
          <button
            onClick={() => toggleWishlist(property.id)}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <svg className={`w-4 h-4 ${wishlist.includes(property.id) ? 'text-red-500 fill-red-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.includes(property.id) ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl text-blue-100">Discover the perfect place to call home</p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-8 py-12">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="For Rent">For Rent</option>
                <option value="For Sale">For Sale</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Prices</option>
                <option value="0-300">Under $300</option>
                <option value="300-600">$300 - $600</option>
                <option value="600-1000">$600 - $1000</option>
                <option value="1000-2000">$1000 - $2000</option>
                <option value="2000-999999">$2000+</option>
              </select>
            </div>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="beds">Most Beds</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-6"
          }>
            {currentProperties.map(property => (
              viewMode === "grid" 
                ? <PropertyCard key={property.id} property={property} />
                : <PropertyListItem key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Wishlist Summary */}
        {wishlist.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link to="/wishlist">
              <div className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110 cursor-pointer relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Properties;