// import { Avatar } from "./BlogCard";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const handleOurStoryClick = () => {
//     navigate('/#ourStory');
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/signin");
//   };

//   const handlePublishClick = () => {
//     if (!isLoggedIn) {
//       alert("You need to sign in first to publish.");
//       navigate("/signin");
//     } else {
//       navigate("/publish");
//     }
//   };

//   return (
//     <div className="border-b flex justify-between px-10 py-4 font-bold text-3xl">
//       <Link to={"/"} className="flex flex-col justify-center cursor-pointer">
//         Literary Lane
//       </Link>
//       <div className="flex">
//         <div className="my-4 mx-3">
//         <button className="text-black hidden md:flex text-xs md:text-sm font-medium">
//           <a onClick={handleOurStoryClick}>Our Story</a>
//           </button>
//           </div>
//         <div className="my-4 mx-3">
//         <button className="text-black hidden md:flex text-xs md:text-sm font-medium">
//         <Link to={"/Blogs"} className="flex flex-col justify-center cursor-pointer">
//          Blogs
//       </Link>
//           </button>
//           </div>
//         <div>
          
//             <button
//               type="button"
           
//               className="mr-4 text-white bg-black hover:text-black hover:bg-white border-2 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
//             >
                
//           <Link to={'/signin'}>Signin</Link>
//             </button>
          
//         </div>
       
          
//         <div>
//           <button
//             type="button"
//             onClick={handlePublishClick}
//              className="mr-4 text-white bg-black hover:text-black hover:bg-white border-2  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
//           >
//             Write
//           </button>
//         </div>
    
          
       
        
//       </div>
//     </div>
//   );
// };

// export default Navbar;
