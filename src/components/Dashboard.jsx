import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");
  const [showMessage, setShowMessage] = useState(true);
  
  // Buy Section States
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedProperties, setSavedProperties] = useState([]);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", bedrooms: "", propertyType: "" });
  const [showFilters, setShowFilters] = useState(false);
  
  // Sell Section States
  const [listings, setListings] = useState([]);
  const [showListingForm, setShowListingForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listingForm, setListingForm] = useState({
    title: "", price: "", location: "", bedrooms: "", bathrooms: "", sqft: "", propertyType: "house", description: ""
  });
  
  // Rent Section States
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [applications, setApplications] = useState([]);
  const [rentalFilters, setRentalFilters] = useState({ minPrice: "", maxPrice: "", bedrooms: "", furnished: "" });
  const [selectedRental, setSelectedRental] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({ moveInDate: "", occupants: "1", employmentStatus: "", monthlyIncome: "", additionalInfo: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    
    // Load saved data
    loadMockData();
    loadSavedData();
  }, [navigate]);
  
  const loadMockData = () => {
    // Mock properties for buying
    const mockProperties = [
      { id: 1, title: "Modern Downtown Condo", price: 450000, location: "Downtown, NY", bedrooms: 2, bathrooms: 2, sqft: 1200, propertyType: "condo", image: "🏢", description: "Beautiful modern condo" },
      { id: 2, title: "Suburban Family Home", price: 650000, location: "Brooklyn, NY", bedrooms: 4, bathrooms: 3, sqft: 2500, propertyType: "house", image: "🏠", description: "Spacious family home" },
      { id: 3, title: "Luxury Penthouse", price: 1200000, location: "Manhattan, NY", bedrooms: 3, bathrooms: 3, sqft: 2200, propertyType: "condo", image: "🏢", description: "Luxury penthouse" }
    ];
    
    // Mock rentals
    const mockRentals = [
      { id: 1, title: "Downtown Apartment", price: 2500, location: "Downtown, NY", bedrooms: 2, bathrooms: 2, sqft: 1100, furnished: true, petFriendly: true, image: "🏢", description: "Modern apartment" },
      { id: 2, title: "Cozy Studio", price: 1800, location: "Brooklyn, NY", bedrooms: 1, bathrooms: 1, sqft: 650, furnished: false, petFriendly: false, image: "🏠", description: "Perfect studio" }
    ];
    
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
    setRentals(mockRentals);
    setFilteredRentals(mockRentals);
  };
  
  const loadSavedData = () => {
    const saved = localStorage.getItem("savedProperties");
    if (saved) setSavedProperties(JSON.parse(saved));
    
    const userListings = localStorage.getItem("userListings");
    if (userListings) setListings(JSON.parse(userListings));
    
    const rentalApps = localStorage.getItem("rentalApplications");
    if (rentalApps) setApplications(JSON.parse(rentalApps));
  };
  
  // Buy Section Functions
  const handleSaveProperty = (property) => {
    let updated;
    if (savedProperties.some(p => p.id === property.id)) {
      updated = savedProperties.filter(p => p.id !== property.id);
    } else {
      updated = [...savedProperties, property];
    }
    setSavedProperties(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
    alert(updated.length > savedProperties.length ? "Property saved!" : "Property removed from saved!");
  };
  
  const handleScheduleTour = (property) => {
    alert(`Tour scheduled for ${property.title}! An agent will contact you within 24 hours.`);
  };
  
  // Sell Section Functions
  const handleListingInputChange = (e) => {
    const { name, value } = e.target;
    setListingForm({ ...listingForm, [name]: value });
  };
  
  const handleSubmitListing = (e) => {
    e.preventDefault();
    const newListing = {
      id: editingListing ? editingListing.id : Date.now(),
      ...listingForm,
      price: parseInt(listingForm.price),
      bedrooms: parseInt(listingForm.bedrooms),
      bathrooms: parseFloat(listingForm.bathrooms),
      sqft: parseInt(listingForm.sqft),
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
    setListingForm({ title: "", price: "", location: "", bedrooms: "", bathrooms: "", sqft: "", propertyType: "house", description: "" });
    setShowListingForm(false);
    setEditingListing(null);
    alert(editingListing ? "Listing updated!" : "Property listed successfully!");
  };
  
  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setListingForm(listing);
    setShowListingForm(true);
  };
  
  const handleDeleteListing = (id) => {
    if (window.confirm("Delete this listing?")) {
      const updated = listings.filter(l => l.id !== id);
      setListings(updated);
      localStorage.setItem("userListings", JSON.stringify(updated));
      alert("Listing deleted!");
    }
  };
  
  // Rent Section Functions
  const handleApplyNow = (rental) => {
    setSelectedRental(rental);
    setShowApplicationForm(true);
  };
  
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      rentalId: selectedRental.id,
      rentalTitle: selectedRental.title,
      applicantName: userData?.name,
      applicantEmail: userData?.email,
      ...applicationData,
      status: "pending",
      appliedDate: new Date().toISOString()
    };
    
    const updated = [newApplication, ...applications];
    setApplications(updated);
    localStorage.setItem("rentalApplications", JSON.stringify(updated));
    setShowApplicationForm(false);
    setSelectedRental(null);
    setApplicationData({ moveInDate: "", occupants: "1", employmentStatus: "", monthlyIncome: "", additionalInfo: "" });
    alert("Application submitted! The landlord will contact you.");
  };
  
  // Filter functions
  useEffect(() => {
    if (activeTab === "buy") {
      let filtered = properties;
      if (searchTerm) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (filters.minPrice) filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
      if (filters.maxPrice) filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
      if (filters.bedrooms) filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
      if (filters.propertyType) filtered = filtered.filter(p => p.propertyType === filters.propertyType);
      setFilteredProperties(filtered);
    } else if (activeTab === "rent") {
      let filtered = rentals;
      if (rentalFilters.minPrice) filtered = filtered.filter(r => r.price >= parseInt(rentalFilters.minPrice));
      if (rentalFilters.maxPrice) filtered = filtered.filter(r => r.price <= parseInt(rentalFilters.maxPrice));
      if (rentalFilters.bedrooms) filtered = filtered.filter(r => r.bedrooms >= parseInt(rentalFilters.bedrooms));
      if (rentalFilters.furnished) filtered = filtered.filter(r => r.furnished === (rentalFilters.furnished === "true"));
      setFilteredRentals(filtered);
    }
  }, [activeTab, searchTerm, filters, rentalFilters, properties, rentals]);

  const message = location.state?.message;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        {message && showMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setShowMessage(false)} className="text-green-700">×</button>
          </div>
        )}
        
        {/* User Info Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome, {userData?.name}! 👋</h1>
              <p className="text-green-100">Your all-in-one account for buying, selling, and renting properties</p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <p className="text-sm">Member since</p>
                <p className="font-semibold">{new Date(userData?.memberSince).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Tabs */}
        <div className="flex gap-2 mb-8 border-b">
          <button
            onClick={() => { setActiveTab("buy"); setSearchTerm(""); }}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${
              activeTab === "buy" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🏠 Buy a Home
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${
              activeTab === "sell" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📈 Sell a Home
          </button>
          <button
            onClick={() => setActiveTab("rent")}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${
              activeTab === "rent" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            🔑 Rent a Home
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${
              activeTab === "saved" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            ❤️ Saved ({savedProperties.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 font-semibold transition-all rounded-t-lg ${
              activeTab === "applications" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📝 Applications ({applications.length})
          </button>
        </div>
        
        {/* BUY SECTION */}
        {activeTab === "buy" && (
          <div>
            <div className="flex gap-4 mb-6">
              <input type="text" placeholder="Search by title or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">🔍 {showFilters ? "Hide" : "Show"} Filters</button>
            </div>
            
            {showFilters && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({...filters, minPrice: e.target.value})} className="px-3 py-2 border rounded" />
                  <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.value})} className="px-3 py-2 border rounded" />
                  <select value={filters.bedrooms} onChange={(e) => setFilters({...filters, bedrooms: e.target.value})} className="px-3 py-2 border rounded"><option value="">Any Beds</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select>
                  <select value={filters.propertyType} onChange={(e) => setFilters({...filters, propertyType: e.target.value})} className="px-3 py-2 border rounded"><option value="">All Types</option><option value="house">House</option><option value="condo">Condo</option></select>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(p => (
                <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-6xl">{p.image}</div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="text-gray-600 text-sm">{p.location}</p>
                    <p className="text-2xl font-bold text-green-600 my-2">${p.price.toLocaleString()}</p>
                    <div className="flex gap-3 text-sm text-gray-500 mb-3"><span>{p.bedrooms} beds</span><span>{p.bathrooms} baths</span><span>{p.sqft} sqft</span></div>
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveProperty(p)} className={`flex-1 py-2 rounded font-semibold ${savedProperties.some(sp => sp.id === p.id) ? "bg-yellow-500 text-white" : "bg-gray-200"}`}>{savedProperties.some(sp => sp.id === p.id) ? "Saved ✓" : "Save"}</button>
                      <button onClick={() => handleScheduleTour(p)} className="flex-1 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">Tour</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* SELL SECTION */}
        {activeTab === "sell" && (
          <div>
            <button onClick={() => setShowListingForm(!showListingForm)} className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
              {showListingForm ? "Cancel" : "+ List New Property"}
            </button>
            
            {showListingForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">{editingListing ? "Edit Listing" : "List Your Property"}</h2>
                <form onSubmit={handleSubmitListing}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="title" placeholder="Property Title" value={listingForm.title} onChange={handleListingInputChange} required className="px-3 py-2 border rounded" />
                    <input type="number" name="price" placeholder="Price" value={listingForm.price} onChange={handleListingInputChange} required className="px-3 py-2 border rounded" />
                    <input type="text" name="location" placeholder="Location" value={listingForm.location} onChange={handleListingInputChange} required className="px-3 py-2 border rounded" />
                    <select name="propertyType" value={listingForm.propertyType} onChange={handleListingInputChange} className="px-3 py-2 border rounded"><option value="house">House</option><option value="condo">Condo</option></select>
                    <input type="number" name="bedrooms" placeholder="Bedrooms" value={listingForm.bedrooms} onChange={handleListingInputChange} className="px-3 py-2 border rounded" />
                    <input type="number" name="bathrooms" placeholder="Bathrooms" value={listingForm.bathrooms} onChange={handleListingInputChange} className="px-3 py-2 border rounded" />
                    <input type="number" name="sqft" placeholder="Square Feet" value={listingForm.sqft} onChange={handleListingInputChange} className="px-3 py-2 border rounded" />
                    <textarea name="description" placeholder="Description" value={listingForm.description} onChange={handleListingInputChange} rows="3" className="px-3 py-2 border rounded md:col-span-2"></textarea>
                  </div>
                  <button type="submit" className="mt-4 w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">{editingListing ? "Update" : "List"} Property</button>
                </form>
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-4">Your Listings ({listings.length})</h2>
            {listings.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center"><p className="text-gray-500">No listings yet. Click above to list your first property!</p></div>
            ) : (
              <div className="space-y-4">
                {listings.map(l => (
                  <div key={l.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-start">
                      <div><h3 className="text-xl font-bold">{l.title}</h3><p className="text-gray-600">{l.location}</p></div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{l.status}</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 my-2">${l.price.toLocaleString()}</p>
                    <div className="flex gap-3 mt-3">
                      <button onClick={() => handleEditListing(l)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                      <button onClick={() => handleDeleteListing(l.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* RENT SECTION */}
        {activeTab === "rent" && (
          <div>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input type="number" placeholder="Min Price" value={rentalFilters.minPrice} onChange={(e) => setRentalFilters({...rentalFilters, minPrice: e.target.value})} className="px-3 py-2 border rounded" />
                <input type="number" placeholder="Max Price" value={rentalFilters.maxPrice} onChange={(e) => setRentalFilters({...rentalFilters, maxPrice: e.target.value})} className="px-3 py-2 border rounded" />
                <select value={rentalFilters.bedrooms} onChange={(e) => setRentalFilters({...rentalFilters, bedrooms: e.target.value})} className="px-3 py-2 border rounded"><option value="">Any Beds</option><option value="1">1+</option><option value="2">2+</option></select>
                <select value={rentalFilters.furnished} onChange={(e) => setRentalFilters({...rentalFilters, furnished: e.target.value})} className="px-3 py-2 border rounded"><option value="">Any</option><option value="true">Furnished</option><option value="false">Unfurnished</option></select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRentals.map(r => (
                <div key={r.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-6xl">{r.image}</div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{r.title}</h3>
                    <p className="text-gray-600 text-sm">{r.location}</p>
                    <p className="text-2xl font-bold text-green-600 my-2">${r.price}/mo</p>
                    <div className="flex gap-2 mb-3">{r.furnished && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Furnished</span>}{r.petFriendly && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Pet Friendly</span>}</div>
                    <button onClick={() => handleApplyNow(r)} className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* SAVED SECTION */}
        {activeTab === "saved" && (
          <div>
            {savedProperties.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center"><p className="text-gray-500">No saved properties. Click "Save" on properties you like!</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map(p => (
                  <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-6xl">{p.image}</div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{p.title}</h3>
                      <p className="text-2xl font-bold text-green-600 my-2">${p.price.toLocaleString()}</p>
                      <button onClick={() => handleScheduleTour(p)} className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">Schedule Tour</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* APPLICATIONS SECTION */}
        {activeTab === "applications" && (
          <div>
            {applications.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center"><p className="text-gray-500">No rental applications yet. Apply for rentals to see them here!</p></div>
            ) : (
              <div className="space-y-4">
                {applications.map(a => (
                  <div key={a.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div><h3 className="text-xl font-bold">{a.rentalTitle}</h3><p className="text-gray-600 text-sm">Applied: {new Date(a.appliedDate).toLocaleDateString()}</p></div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${a.status === "pending" ? "bg-yellow-100 text-yellow-700" : a.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{a.status.toUpperCase()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4"><div><p className="text-gray-500 text-sm">Move-in Date</p><p className="font-semibold">{a.moveInDate}</p></div><div><p className="text-gray-500 text-sm">Monthly Income</p><p className="font-semibold">${a.monthlyIncome}</p></div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Application Modal */}
        {showApplicationForm && selectedRental && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Apply for {selectedRental.title}</h2>
              <form onSubmit={handleApplicationSubmit}>
                <input type="date" name="moveInDate" placeholder="Move-in Date" value={applicationData.moveInDate} onChange={(e) => setApplicationData({...applicationData, moveInDate: e.target.value})} required className="w-full px-3 py-2 border rounded mb-3" />
                <select name="occupants" value={applicationData.occupants} onChange={(e) => setApplicationData({...applicationData, occupants: e.target.value})} className="w-full px-3 py-2 border rounded mb-3"><option value="1">1 Occupant</option><option value="2">2 Occupants</option><option value="3">3 Occupants</option><option value="4">4+ Occupants</option></select>
                <select name="employmentStatus" value={applicationData.employmentStatus} onChange={(e) => setApplicationData({...applicationData, employmentStatus: e.target.value})} required className="w-full px-3 py-2 border rounded mb-3"><option value="">Employment Status</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Self-employed">Self-employed</option></select>
                <input type="number" name="monthlyIncome" placeholder="Monthly Income" value={applicationData.monthlyIncome} onChange={(e) => setApplicationData({...applicationData, monthlyIncome: e.target.value})} required className="w-full px-3 py-2 border rounded mb-3" />
                <textarea name="additionalInfo" placeholder="Additional Info" value={applicationData.additionalInfo} onChange={(e) => setApplicationData({...applicationData, additionalInfo: e.target.value})} rows="3" className="w-full px-3 py-2 border rounded mb-3"></textarea>
                <div className="flex gap-3"><button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded font-semibold">Submit</button><button type="button" onClick={() => { setShowApplicationForm(false); setSelectedRental(null); }} className="flex-1 bg-gray-300 py-2 rounded font-semibold">Cancel</button></div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Dashboard;