import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RenterDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    furnished: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [showMessage, setShowMessage] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    moveInDate: "",
    occupants: "1",
    employmentStatus: "",
    monthlyIncome: "",
    additionalInfo: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Load applications
    const storedApplications = localStorage.getItem("rentalApplications");
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }

    // Mock rental properties
    const mockRentals = [
      {
        id: 1,
        title: "Modern Downtown Apartment",
        price: 2500,
        location: "Downtown, New York",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        propertyType: "apartment",
        furnished: true,
        availableDate: "2024-01-15",
        image: "https://via.placeholder.com/400x300",
        description: "Beautiful modern apartment with city views and amenities.",
        deposit: 2500,
        petFriendly: true
      },
      {
        id: 2,
        title: "Cozy Studio in Brooklyn",
        price: 1800,
        location: "Brooklyn, New York",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
        propertyType: "studio",
        furnished: false,
        availableDate: "2024-01-01",
        image: "https://via.placeholder.com/400x300",
        description: "Perfect studio apartment for singles or couples.",
        deposit: 1800,
        petFriendly: false
      },
      {
        id: 3,
        title: "Luxury 3-Bedroom Penthouse",
        price: 4500,
        location: "Manhattan, New York",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        propertyType: "apartment",
        furnished: true,
        availableDate: "2024-02-01",
        image: "https://via.placeholder.com/400x300",
        description: "Luxury penthouse with spectacular views and premium amenities.",
        deposit: 4500,
        petFriendly: true
      },
      {
        id: 4,
        title: "Family House with Garden",
        price: 3200,
        location: "Queens, New York",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        propertyType: "house",
        furnished: false,
        availableDate: "2024-01-10",
        image: "https://via.placeholder.com/400x300",
        description: "Spacious family home with private garden and garage.",
        deposit: 3200,
        petFriendly: true
      },
      {
        id: 5,
        title: "Beachfront Condo",
        price: 3800,
        location: "Long Island, New York",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        propertyType: "condo",
        furnished: true,
        availableDate: "2024-03-01",
        image: "https://via.placeholder.com/400x300",
        description: "Beautiful beachfront condo with ocean views.",
        deposit: 3800,
        petFriendly: false
      }
    ];
    setRentals(mockRentals);
    setFilteredRentals(mockRentals);
  }, [navigate]);

  // Filter rentals
  useEffect(() => {
    let filtered = rentals;

    if (searchTerm) {
      filtered = filtered.filter(rental =>
        rental.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(rental => rental.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(rental => rental.price <= parseInt(filters.maxPrice));
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(rental => rental.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.furnished) {
      filtered = filtered.filter(rental => rental.furnished === (filters.furnished === "true"));
    }

    setFilteredRentals(filtered);
  }, [searchTerm, filters, rentals]);

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
    
    const updatedApplications = [newApplication, ...applications];
    setApplications(updatedApplications);
    localStorage.setItem("rentalApplications", JSON.stringify(updatedApplications));
    
    setShowApplicationForm(false);
    setSelectedRental(null);
    setApplicationData({
      moveInDate: "",
      occupants: "1",
      employmentStatus: "",
      monthlyIncome: "",
      additionalInfo: ""
    });
    
    alert("Application submitted successfully! The landlord will contact you soon.");
  };

  const handleApplyNow = (rental) => {
    setSelectedRental(rental);
    setShowApplicationForm(true);
  };

  const handleApplicationDataChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleContactLandlord = (rental) => {
    alert(`Contact request sent for ${rental.title}. The landlord will respond within 24 hours.`);
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
            Find Your Perfect Rental 🔑
          </h1>
          <p className="text-gray-600">
            Welcome back, {userData?.name}! Discover rental properties that match your needs.
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
            Search Rentals
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-2 px-4 font-semibold transition-colors ${
              activeTab === "applications"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            My Applications ({applications.length})
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
                <h3 className="font-semibold text-gray-800 mb-4">Filter Rentals</h3>
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
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Furnished</label>
                    <select
                      value={filters.furnished}
                      onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Any</option>
                      <option value="true">Furnished</option>
                      <option value="false">Unfurnished</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setFilters({ minPrice: "", maxPrice: "", bedrooms: "", furnished: "" })}
                  className="mt-4 text-sm text-red-600 hover:text-red-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Rentals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRentals.map((rental) => (
                <div key={rental.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <img src={rental.image} alt={rental.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{rental.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{rental.location}</p>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${rental.price.toLocaleString()}/mo
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500 mb-3">
                      <span>{rental.bedrooms} beds</span>
                      <span>{rental.bathrooms} baths</span>
                      <span>{rental.sqft} sqft</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {rental.furnished && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Furnished</span>
                      )}
                      {rental.petFriendly && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Pet Friendly</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{rental.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApplyNow(rental)}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => handleContactLandlord(rental)}
                        className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRentals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No rental properties found matching your criteria.</p>
              </div>
            )}
          </>
        )}

        {activeTab === "applications" && (
          <div>
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">You haven't submitted any applications yet.</p>
                <p className="text-gray-400 text-sm mt-2">Browse rentals and click "Apply Now" to submit an application.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{application.rentalTitle}</h3>
                        <p className="text-gray-600 text-sm">Applied on: {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        application.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        application.status === "approved" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {application.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-sm">Move-in Date</p>
                        <p className="font-semibold">{application.moveInDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Occupants</p>
                        <p className="font-semibold">{application.occupants}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Employment Status</p>
                        <p className="font-semibold">{application.employmentStatus}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Monthly Income</p>
                        <p className="font-semibold">${application.monthlyIncome}</p>
                      </div>
                    </div>
                    {application.additionalInfo && (
                      <p className="text-gray-600 text-sm border-t pt-3 mt-2">
                        <strong>Additional Info:</strong> {application.additionalInfo}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Application Modal */}
        {showApplicationForm && selectedRental && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Apply for {selectedRental.title}</h2>
                  <button
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedRental(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleApplicationSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Desired Move-in Date *</label>
                      <input
                        type="date"
                        name="moveInDate"
                        value={applicationData.moveInDate}
                        onChange={handleApplicationDataChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Occupants *</label>
                      <select
                        name="occupants"
                        value={applicationData.occupants}
                        onChange={handleApplicationDataChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status *</label>
                      <select
                        name="employmentStatus"
                        value={applicationData.employmentStatus}
                        onChange={handleApplicationDataChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select</option>
                        <option value="Employed Full-time">Employed Full-time</option>
                        <option value="Employed Part-time">Employed Part-time</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Student">Student</option>
                        <option value="Retired">Retired</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income *</label>
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={applicationData.monthlyIncome}
                        onChange={handleApplicationDataChange}
                        required
                        placeholder="$"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                      <textarea
                        name="additionalInfo"
                        value={applicationData.additionalInfo}
                        onChange={handleApplicationDataChange}
                        rows="4"
                        placeholder="Any additional information you'd like to share with the landlord..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowApplicationForm(false);
                        setSelectedRental(null);
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default RenterDashboard;