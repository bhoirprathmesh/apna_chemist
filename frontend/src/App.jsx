import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import Navlink from "../components/home/Navlink";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navlink/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
