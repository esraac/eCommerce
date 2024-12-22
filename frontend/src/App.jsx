import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App (){
  return (
   <main className="overflow-hidden text-[#404040] bg-primary">
    <ToastContainer />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
   </main>
  );
}