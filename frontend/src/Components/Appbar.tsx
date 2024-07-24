import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../State/userAtom'; // Make sure the import path is correct

export const Appbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({ isLoggedIn: false });
    navigate("/signin");
  };

  const handlePublishClick = () => {
    if (!auth.isLoggedIn) {
      alert("You need to sign in first to publish.");
      navigate("/signin");
    } else {
      navigate("/publish");
    }
  };

  const handleOurStoryClick = () => {
    navigate('/#ourStory');
  };

  return (
    <div className="border-b flex justify-between px-10 py-4 font-bold text-3xl">
      <div className="flex flex-col justify-center cursor-pointer">
        Literary Lane
      </div>
      <div className="flex">
        {isHomePage && (
          <div className="my-4 mx-3">
            <button className="text-black hidden md:flex text-xs md:text-sm font-medium">
              <a onClick={handleOurStoryClick}>Our Story</a>
            </button>
          </div>
        )}
        <div className="my-4 mx-3">
          <button className="text-black hidden md:flex text-xs md:text-sm font-medium">
            <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
              Blogs
            </Link>
          </button>
        </div>
        <div>
          {!auth.isLoggedIn ? (
            <button
              type="button"
              className="mr-4 text-white bg-black hover:text-black hover:bg-white border-2 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <Link to={'/signin'}>Sign In</Link>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="mr-4 text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log Out
            </button>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={handlePublishClick}
            className="mr-4 text-white bg-black hover:text-black hover:bg-white border-2 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Write
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
