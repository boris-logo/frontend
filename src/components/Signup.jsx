import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({
    buyer: false,
    seller: false,
    renter: false
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showSpecificContent, setShowSpecificContent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Specific data for each account type
  const [buyerData, setBuyerData] = useState({
    budget: "",
    preferredLocation: "",
    propertyType: "",
    bedrooms: "",
    moveInDate: ""
  });

  const [sellerData, setSellerData] = useState({
    propertyAddress: "",
    propertyType: "",
    estimatedPrice: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    listingType: "sale"
  });

  const [renterData, setRenterData] = useState({
    monthlyBudget: "",
    preferredArea: "",
    propertyType: "",
    leaseDuration: "",
    moveInDate: "",
    furnished: false
  });

  // Timer for resend code
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSpecificDataChange = (e, type) => {
    const { name, value, type: inputType, checked } = e.target;
    if (type === 'buyer') {
      setBuyerData({
        ...buyerData,
        [name]: inputType === 'checkbox' ? checked : value
      });
    } else if (type === 'seller') {
      setSellerData({
        ...sellerData,
        [name]: inputType === 'checkbox' ? checked : value
      });
    } else if (type === 'renter') {
      setRenterData({
        ...renterData,
        [name]: inputType === 'checkbox' ? checked : value
      });
    }
  };

  const handleRoleToggle = (role) => {
    setSelectedRoles(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  const handleContinueToForm = () => {
    const hasSelectedRole = Object.values(selectedRoles).some(value => value === true);
    if (!hasSelectedRole) {
      setErrors({ role: "Please select at least one role" });
      return;
    }
    setErrors({});
    setShowSpecificContent(true);
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase and one lowercase letter";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    return newErrors;
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    try {
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      
      // In a real app, you would send this via email/SMS
      console.log(`Verification code for ${formData.email}: ${code}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (you can add a toast notification here)
      alert(`Demo: Verification code sent to ${formData.email}\nCode: ${code}`);
      
    } catch (error) {
      setErrors({ general: "Failed to send verification code. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setIsResending(true);
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSentCode(code);
      console.log(`New verification code: ${code}`);
      alert(`New verification code sent: ${code}`);
      setResendTimer(60); // 60 seconds cooldown
    } catch (error) {
      setErrors({ general: "Failed to resend code. Please try again." });
    } finally {
      setIsResending(false);
    }
  };

  const handleNextStep = async () => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length === 0) {
      setCurrentStep(2);
      await sendVerificationCode();
    } else {
      setErrors(step1Errors);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      setErrors({ verification: "Please enter the verification code" });
      return;
    }
    
    if (verificationCode !== sentCode) {
      setErrors({ verification: "Invalid verification code. Please try again." });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Combine all data - user can perform all selected roles
      const completeUserData = {
        id: Date.now().toString(),
        ...formData,
        selectedRoles: selectedRoles,
        preferences: {
          buyer: selectedRoles.buyer ? buyerData : null,
          seller: selectedRoles.seller ? sellerData : null,
          renter: selectedRoles.renter ? renterData : null
        },
        createdAt: new Date().toISOString()
      };
      
      console.log("Signup successful:", completeUserData);
      
      const userData = {
        id: completeUserData.id,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        selectedRoles: selectedRoles,
        memberSince: new Date().toISOString(),
        preferences: completeUserData.preferences,
        isVerified: true
      };
      
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRoles", JSON.stringify(selectedRoles));
      
      // Get the selected roles as an array for the message
      const selectedRolesList = Object.keys(selectedRoles).filter(role => selectedRoles[role]);
      const rolesText = selectedRolesList.join(", ");
      
      // Redirect based on first selected role or to dashboard
      if (selectedRolesList.length === 1) {
        const role = selectedRolesList[0];
        if (role === 'buyer') {
          navigate("/buyer-dashboard", { 
            state: { 
              message: `Welcome ${formData.fullName}! Start your home search journey! 🏠`,
              userData: userData
            } 
          });
        } else if (role === 'seller') {
          navigate("/seller-dashboard", { 
            state: { 
              message: `Welcome ${formData.fullName}! List your property today! 📈`,
              userData: userData
            } 
          });
        } else {
          navigate("/renter-dashboard", { 
            state: { 
              message: `Welcome ${formData.fullName}! Find your perfect rental! 🔑`,
              userData: userData
            } 
          });
        }
      } else {
        // Redirect to a unified dashboard if user has multiple roles
        navigate("/dashboard", { 
          state: { 
            message: `Welcome ${formData.fullName}! You can now ${rolesText} on HomeLink! 🏠`,
            selectedRoles: selectedRoles,
            userData: userData
          } 
        });
      }
    } catch (error) {
      setErrors({
        general: "Signup failed. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoles = () => {
    setShowSpecificContent(false);
    setCurrentStep(1);
    setErrors({});
    setVerificationCode("");
    setSentCode("");
  };

  const handleBackStep = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[@$!%*?&]/)) strength++;
    
    if (strength === 0) return { text: "Very Weak", color: "text-red-600", bg: "bg-red-500", width: "25%" };
    if (strength === 1) return { text: "Weak", color: "text-orange-600", bg: "bg-orange-500", width: "50%" };
    if (strength === 2) return { text: "Medium", color: "text-yellow-600", bg: "bg-yellow-500", width: "75%" };
    if (strength >= 3) return { text: "Strong", color: "text-green-600", bg: "bg-green-500", width: "100%" };
    
    return { text: "Very Weak", color: "text-red-600", bg: "bg-red-500", width: "25%" };
  };

  const passwordStrength = getPasswordStrength();

  // Render specific content based on selected roles
  const renderSpecificContent = () => {
    return (
      <div className="space-y-6 mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Additional Information (Optional but Recommended)
        </h3>
        
        {/* Buyer Section */}
        {selectedRoles.buyer && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-md font-semibold text-blue-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Home Buying Preferences
            </h4>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Budget Range</label>
              <select
                name="budget"
                value={buyerData.budget}
                onChange={(e) => handleSpecificDataChange(e, 'buyer')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select budget range</option>
                <option value="100k-200k">$100,000 - $200,000</option>
                <option value="200k-300k">$200,000 - $300,000</option>
                <option value="300k-500k">$300,000 - $500,000</option>
                <option value="500k-1m">$500,000 - $1,000,000</option>
                <option value="1m+">$1,000,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Preferred Location</label>
              <input
                type="text"
                name="preferredLocation"
                value={buyerData.preferredLocation}
                onChange={(e) => handleSpecificDataChange(e, 'buyer')}
                placeholder="City, State or ZIP code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Type</label>
              <select
                name="propertyType"
                value={buyerData.propertyType}
                onChange={(e) => handleSpecificDataChange(e, 'buyer')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select property type</option>
                <option value="house">Single Family House</option>
                <option value="condo">Condo/Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={buyerData.bedrooms}
                  onChange={(e) => handleSpecificDataChange(e, 'buyer')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={buyerData.moveInDate}
                  onChange={(e) => handleSpecificDataChange(e, 'buyer')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Seller Section */}
        {selectedRoles.seller && (
          <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-md font-semibold text-purple-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Property Listing Details
            </h4>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Property Address</label>
              <input
                type="text"
                name="propertyAddress"
                value={sellerData.propertyAddress}
                onChange={(e) => handleSpecificDataChange(e, 'seller')}
                placeholder="Full property address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={sellerData.propertyType}
                  onChange={(e) => handleSpecificDataChange(e, 'seller')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select type</option>
                  <option value="house">Single Family House</option>
                  <option value="condo">Condo/Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Listing Type</label>
                <select
                  name="listingType"
                  value={sellerData.listingType}
                  onChange={(e) => handleSpecificDataChange(e, 'seller')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Estimated Price</label>
              <input
                type="text"
                name="estimatedPrice"
                value={sellerData.estimatedPrice}
                onChange={(e) => handleSpecificDataChange(e, 'seller')}
                placeholder="e.g., $350,000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={sellerData.bedrooms}
                  onChange={(e) => handleSpecificDataChange(e, 'seller')}
                  placeholder="e.g., 3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={sellerData.bathrooms}
                  onChange={(e) => handleSpecificDataChange(e, 'seller')}
                  placeholder="e.g., 2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Square Feet</label>
                <input
                  type="text"
                  name="squareFeet"
                  value={sellerData.squareFeet}
                  onChange={(e) => handleSpecificDataChange(e, 'seller')}
                  placeholder="e.g., 2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Renter Section */}
        {selectedRoles.renter && (
          <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="text-md font-semibold text-orange-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Rental Preferences
            </h4>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Monthly Budget</label>
              <select
                name="monthlyBudget"
                value={renterData.monthlyBudget}
                onChange={(e) => handleSpecificDataChange(e, 'renter')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select budget range</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-1500">$1,000 - $1,500</option>
                <option value="1500-2000">$1,500 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000</option>
                <option value="3000+">$3,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Preferred Area</label>
              <input
                type="text"
                name="preferredArea"
                value={renterData.preferredArea}
                onChange={(e) => handleSpecificDataChange(e, 'renter')}
                placeholder="City, neighborhood or ZIP code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={renterData.propertyType}
                  onChange={(e) => handleSpecificDataChange(e, 'renter')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="studio">Studio</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Lease Duration</label>
                <select
                  name="leaseDuration"
                  value={renterData.leaseDuration}
                  onChange={(e) => handleSpecificDataChange(e, 'renter')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select duration</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={renterData.moveInDate}
                  onChange={(e) => handleSpecificDataChange(e, 'renter')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex items-center mt-7">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={renterData.furnished}
                    onChange={(e) => handleSpecificDataChange(e, 'renter')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Need furnished</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Steps */}
          {!showSpecificContent && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-sm mt-2 font-medium">Choose Roles</p>
                </div>
                <div className="flex-1 h-1 bg-gray-300"></div>
                <div className="flex-1 text-center text-gray-400">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-sm mt-2 font-medium">Account Info</p>
                </div>
                <div className="flex-1 h-1 bg-gray-300"></div>
                <div className="flex-1 text-center text-gray-400">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-sm mt-2 font-medium">Verification</p>
                </div>
              </div>
            </div>
          )}

          {showSpecificContent && currentStep === 1 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p className="text-sm mt-2 font-medium">Roles Selected</p>
                </div>
                <div className="flex-1 h-1 bg-green-600"></div>
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-sm mt-2 font-medium">Account Info</p>
                </div>
                <div className="flex-1 h-1 bg-gray-300"></div>
                <div className="flex-1 text-center text-gray-400">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-sm mt-2 font-medium">Verification</p>
                </div>
              </div>
            </div>
          )}

          {showSpecificContent && currentStep === 2 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p className="text-sm mt-2 font-medium">Roles Selected</p>
                </div>
                <div className="flex-1 h-1 bg-green-600"></div>
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p className="text-sm mt-2 font-medium">Account Info</p>
                </div>
                <div className="flex-1 h-1 bg-green-600"></div>
                <div className="flex-1 text-center text-green-600">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-sm mt-2 font-medium">Verification</p>
                </div>
              </div>
            </div>
          )}

          {/* Sign Up Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {!showSpecificContent ? "Choose Your Roles" : currentStep === 1 ? "Create Your Account" : "Verify Your Email"}
              </h2>
              <p className="text-green-100 mt-2">
                {!showSpecificContent 
                  ? "Select all the ways you want to use HomeLink (you can select multiple)" 
                  : currentStep === 1 
                    ? "Complete your account setup" 
                    : `We sent a verification code to ${formData.email}`}
              </p>
            </div>

            {/* Form Body */}
            <div className="px-8 py-6">
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              {/* Role Selection Screen */}
              {!showSpecificContent && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Buyer Option */}
                    <div
                      onClick={() => handleRoleToggle("buyer")}
                      className={`cursor-pointer p-6 border-2 rounded-xl transition-all text-center ${
                        selectedRoles.buyer 
                          ? 'border-green-500 bg-green-50 shadow-lg' 
                          : 'border-gray-200 hover:border-green-500 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition ${
                        selectedRoles.buyer ? 'bg-blue-200' : 'bg-blue-100'
                      }`}>
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Buy a Home</h3>
                      <p className="text-gray-600 text-sm">Find your dream home with our expert guidance</p>
                      {selectedRoles.buyer && (
                        <div className="mt-3 text-green-600">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Seller Option */}
                    <div
                      onClick={() => handleRoleToggle("seller")}
                      className={`cursor-pointer p-6 border-2 rounded-xl transition-all text-center ${
                        selectedRoles.seller 
                          ? 'border-green-500 bg-green-50 shadow-lg' 
                          : 'border-gray-200 hover:border-green-500 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition ${
                        selectedRoles.seller ? 'bg-purple-200' : 'bg-purple-100'
                      }`}>
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Sell a Home</h3>
                      <p className="text-gray-600 text-sm">Get the best value for your property</p>
                      {selectedRoles.seller && (
                        <div className="mt-3 text-green-600">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Renter Option */}
                    <div
                      onClick={() => handleRoleToggle("renter")}
                      className={`cursor-pointer p-6 border-2 rounded-xl transition-all text-center ${
                        selectedRoles.renter 
                          ? 'border-green-500 bg-green-50 shadow-lg' 
                          : 'border-gray-200 hover:border-green-500 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition ${
                        selectedRoles.renter ? 'bg-orange-200' : 'bg-orange-100'
                      }`}>
                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Rent a Home</h3>
                      <p className="text-gray-600 text-sm">Find the perfect rental property</p>
                      {selectedRoles.renter && (
                        <div className="mt-3 text-green-600">
                          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {errors.role && (
                    <p className="text-center text-sm text-red-600 mb-4">{errors.role}</p>
                  )}

                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1 text-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Sign In Instead
                    </Link>
                    <button
                      onClick={handleContinueToForm}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Account Creation Form - Step 1 */}
              {showSpecificContent && currentStep === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                  {/* Full Name */}
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-300 ${passwordStrength.bg.replace('bg-', 'bg-')}`} style={{ width: passwordStrength.width }}></div>
                          </div>
                          <span className={`text-xs font-medium ${passwordStrength.color}`}>
                            {passwordStrength.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Use 8+ characters with uppercase, lowercase & numbers</p>
                      </div>
                    )}
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* Role-specific questions */}
                  {renderSpecificContent()}

                  {/* Terms and Conditions */}
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the{" "}
                        <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBackToRoles}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Code...
                        </div>
                      ) : (
                        "Continue →"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Verification Step - Step 2 */}
              {showSpecificContent && currentStep === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Verify Your Account</h3>
                    <p className="text-gray-600">
                      We've sent a verification code to <strong className="text-green-600">{formData.email}</strong>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Check your spam folder if you don't see the email</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Enter Verification Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          if (errors.verification) {
                            setErrors({ ...errors, verification: "" });
                          }
                        }}
                        placeholder="Enter 6-digit code"
                        className={`flex-1 px-4 py-2 border ${errors.verification ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-widest`}
                        maxLength="6"
                      />
                    </div>
                    {errors.verification && <p className="mt-1 text-sm text-red-600">{errors.verification}</p>}
                  </div>

                  <div className="text-center mb-6">
                    <button
                      onClick={handleResendCode}
                      disabled={resendTimer > 0 || isResending}
                      className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResending ? (
                        "Sending..."
                      ) : resendTimer > 0 ? (
                        `Resend code in ${resendTimer}s`
                      ) : (
                        "Resend verification code"
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBackStep}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleVerify}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </div>
                      ) : (
                        "Verify & Create Account"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp;