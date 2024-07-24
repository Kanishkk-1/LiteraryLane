import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {Navbar} from "../Components/Navbar"


export function Home() {
  const divRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [, setBlogs] = useState([]);
  const [, setLoading] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (divRef.current) {
      //@ts-ignore
      const divStart = divRef.current.offsetTop;
      //@ts-ignore
      const divEnd = divStart + divRef.current.offsetHeight;

      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (currentScrollPos < divStart) {
          setOpacity(1);
        } else if (currentScrollPos > divEnd) {
          setOpacity(0);
        } else {
          setOpacity(1 - (currentScrollPos - divStart) / (divEnd - divStart));
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setBlogs(res.data.blogs.slice(0, 6));
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <>
   
      <div className="w-full flex items-center flex-col font-poppins justify-center pb-10">
        <div className="w-full flex flex-col items-center md:min-h-screen" ref={divRef} style={{ opacity: opacity }}>
          <div className="mt-[80px] px-1 md:px-0 md:mt-[200px] flex flex-col items-center justify-center min">
            <p className="text-[30px] md:text-[40px] font-bold text-center">
              A Community Space for Shared Reflections and Thoughts
            </p>
            <p className="text-[14px] px-1 md:px-0 md:text-xl md:w-[700px] text-center text-slate-600">
              "Voices of the Valley" - Where your thoughts find their echo. A
              tapestry of insights woven from the voices of many, awaiting your
              unique thread.
            </p>
            <button
              onClick={handleSignUp}
              className="mt-4 px-6 py-2.5 text-white bg-black rounded-lg hover:bg-white hover:text-black border-2 border-black focus:ring-4 focus:ring-blue-300"
            >
              Sign up to Start Writing
            </button>
          </div>
        </div>
        <div id="ourStory" className="my-[50px] w-full flex md:h-[500px] md:p-[40px]">
          <div className="flex flex-col md:flex-row rounded-2xl items-center justify-center">
            <div className="w-[90vw] md:w-[45%] bg-black md:h-[200px] flex flex-col items-center rounded-full md:ml-10 justify-center py-4 md:py-0">
              <p className="text-white font-extrabold text-3xl md:text-5xl">
                "Literary Lane"
              </p>
              <p className="text-white text-[14px] px-2 md:text-[20px] md:mt-2">
                A Blogging Platform for Shared Stories and Thoughts
              </p>
            </div>
            <div className="h-full mt-4 md:w-[55%] flex justify-center md:px-20 px-[4vw] items-center">
              <p className="md:font-bold text-center md:text-justify text-[16px] md:text-[20px]">
                "Literary Lane" is more than a blogging platform; it's a
                digital sanctuary where stories intertwine, and thoughts
                reverberate. Here, every post is a chapter, every comment a
                conversation, creating a tapestry of shared experiences. Join us
                to share your story, connect with others, and let your voice
                resonate in the vast expanse of the digital world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
