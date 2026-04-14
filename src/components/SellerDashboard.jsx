import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SellerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [listings, setListings] = useState([]);
  const [showListingForm, setShowListingForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    propertyType: "house",
    yearBuilt: "",
    description: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Load user's listings
    const storedListings = localStorage.getItem("userListings");
    if (storedListings) {
      setListings(JSON.parse(storedListings));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();
    
    const newListing = {
      id: editingListing ? editingListing.id : Date.now(),
      ...formData,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseFloat(formData.bathrooms),
      sqft: parseInt(formData.sqft),
      yearBuilt: parseInt(formData.yearBuilt),
      dateListed: new Date().toISOString(),
      status: "active"
    };

    let updatedListings;
    if (editingListing) {
      updatedListings = listings.map(l => l.id === editingListing.id ? newListing : l);
    } else {
      updatedListings = [newListing, ...listings];
    }
    
    setListings(updatedListings);
    localStorage.setItem("userListings", JSON.stringify(updatedListings));
    
    // Reset form
    setFormData({
      title: "",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      propertyType: "house",
      yearBuilt: "",
      description: ""
    });
    setShowListingForm(false);
    setEditingListing(null);
    
    alert(editingListing ? "Listing updated successfully!" : "Property listed successfully!");
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setFormData({
      title: listing.title,
      price: listing.price,
      location: listing.location,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      sqft: listing.sqft,
      propertyType: listing.propertyType,
      yearBuilt: listing.yearBuilt,
      description: listing.description
    });
    setShowListingForm(true);
  };

  const handleDeleteListing = (id) => {
    if (window.confirm("Are you sure you want to remove this listing?")) {
      const updatedListings = listings.filter(l => l.id !== id);
      setListings(updatedListings);
      localStorage.setItem("userListings", JSON.stringify(updatedListings));
      alert("Listing removed successfully!");
    }
  };

  const handleMarkAsSold = (id) => {
    const updatedListings = listings.map(l => 
      l.id === id ? { ...l, status: "sold" } : l
    );
    setListings(updatedListings);
    localStorage.setItem("userListings", JSON.stringify(updatedListings));
    alert("Property marked as sold!");
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
            Seller Dashboard 📈
          </h1>
          <p className="text-gray-600">
            Welcome back, {userData?.name}! Manage your property listings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Listings</p>
                <p className="text-3xl font-bold text-gray-800">{listings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Listings</p>
                <p className="text-3xl font-bold text-gray-800">
                  {listings.filter(l => l.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-gray-800">
                  ${listings.reduce((sum, l) => sum + l.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Listing Button */}
        {!showListingForm && (
          <button
            onClick={() => setShowListingForm(true)}
            className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            List New Property
          </button>
        )}

        {/* Listing Form */}
        {showListingForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingListing ? "Edit Listing" : "List Your Property"}
            </h2>
            <form onSubmit={handleSubmitListing}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Beautiful Family Home"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="350000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                  <input
                    type="number"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="2020"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Describe your property..."
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                >
                  {editingListing ? "Update Listing" : "List Property"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowListingForm(false);
                    setEditingListing(null);
                    setFormData({
                      title: "",
                      price: "",
                      location: "",
                      bedrooms: "",
                      bathrooms: "",
                      sqft: "",
                      propertyType: "house",
                      yearBuilt: "",
                      description: ""
                    });
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listings Display */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Listings</h2>
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">You haven't listed any properties yet.</p>
            <button
              onClick={() => setShowListingForm(true)}
              className="mt-4 text-green-600 font-semibold hover:text-green-700"
            >
              List your first property →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
                      <p className="text-gray-600">{listing.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      listing.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {listing.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Price</p>
                      <p className="text-xl font-bold text-green-600">${listing.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Bedrooms</p>
                      <p className="font-semibold">{listing.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Bathrooms</p>
                      <p className="font-semibold">{listing.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Square Feet</p>
                      <p className="font-semibold">{listing.sqft}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{listing.description}</p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditListing(listing)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    {listing.status === "active" && (
                      <button
                        onClick={() => handleMarkAsSold(listing.id)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        Mark as Sold
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SellerDashboard;