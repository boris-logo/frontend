import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Serachbar from "../components/Serachbar";
import Imfo from "../components/Imfo";
import Testimonial from "../components/Testimonial";
import Faqs from "../components/Faqs";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Serachbar />
      <Imfo />
      <Testimonial />
      <Faqs />
      <Footer />
    </div>
  );
}

export default Home;