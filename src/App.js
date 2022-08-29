// Importing router elements
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import context
import { RealEstateProvider } from "./context/RealEstateContext";

// Importing components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Offers from "./components/Offers";
import { MyProfile } from "./components/MyProfile";
import DetailAdd from "./components/DetailAdd";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <RealEstateProvider>
      <Router>
        <div className="w-full mx-auto overflow-hidden relative h-screen bg-cover bg-[url('../public/Background2.png')]  ">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/offers" element={<Offers />}></Route>
            <Route path="/myProfile" element={<MyProfile />}></Route>
            <Route path="/offers/offer/:id" element={<DetailAdd />}></Route>
            <Route path="/About" element={<About />}></Route>
          </Routes>

          <Footer />
        </div>
      </Router>
    </RealEstateProvider>
  );
}

export default App;
