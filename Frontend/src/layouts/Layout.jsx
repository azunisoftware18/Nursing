import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FloatingActionButtons from "../components/common/FloatingActionButtons.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
      <FloatingActionButtons/>
    </div>
  );
}
