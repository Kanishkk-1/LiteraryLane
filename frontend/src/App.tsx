import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/Components/Authcontext';  // Ensure this path is correct
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Home } from './pages/Home';
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';
import Appbar from "../src/Components/Appbar";  // Or Navbar if using that instead

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
