import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 shadow-md bg-white/95 backdrop-blur-sm">
      <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
        <Home className="w-6 h-6" />
        HomeLink
      </Link>

      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link to="/properties" className="hover:text-blue-600 transition-colors relative group">
            Properties
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-600 transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </li>
        <li>
         <Link to="/contact" className="text-blue-600 font-semibold relative">
  Contact
  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600"></span>
</Link>
        </li>
      </ul>

      <div className="flex gap-3">
        <Link 
          to="/signup" 
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-600/30 font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Sign Up
        </Link>

        <Link 
          to="/login" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/30 font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;