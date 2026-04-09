import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />

          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        import Login from './components/Login';

// In your routes
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;