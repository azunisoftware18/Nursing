import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import AdminRoutes from "./routes/AdminRoutes";

// Public Pages
import Home from "./pages/PublicPages/Home";
import YoutubeAd from "./pages/PublicPages/YoutubeAd";
import About from "./pages/PublicPages/About";
import Colleges from "./pages/PublicPages/Colleges";
import Blog from "./pages/PublicPages/Blog";
import Contact from "./pages/PublicPages/Contact";
import PrivacyPolicy from "./pages/PublicPages/PrivacyPolicy";
import PopularColleges from "./pages/PublicPages/PopularColleges";
import PopularCourses from "./pages/PublicPages/PopularCourses";
import { Toaster } from "react-hot-toast";
import CollegeDetails from "./pages/PublicPages/collegeDetails";
import ViewBlog from "./pages/PublicPages/ViewBlog";

function App() {
  return (
    <>
    <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <Routes>
      
      {/*  PUBLIC ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="youtube-ad" element={<YoutubeAd />} />
        <Route path="about" element={<About />} />
        <Route path="colleges" element={<Colleges />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="popular-colleges" element={<PopularColleges />} />
        <Route path="popular-courses" element={<PopularCourses />} />
        <Route path="college-details" element={<CollegeDetails />} />
        <Route path="/college/:id" element={<CollegeDetails />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
      </Route>

      {/*  ADMIN ROUTES */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
    </>
  );
}

export default App;
