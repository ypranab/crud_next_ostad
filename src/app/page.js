import Image from "next/image";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductList></ProductList>
    </div>
  );
}
