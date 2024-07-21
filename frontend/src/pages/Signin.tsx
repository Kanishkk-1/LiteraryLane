import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../src/State/Post/user/user";

export function Signin() {
  const navigate = useNavigate(); 
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';
  
    // Enable scroll on cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchInfo = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/user/check`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data.user) {
            setUser({
              id: res.data.user.id,
              name: res.data.user.name,
              username: res.data.user.username,
              password: "", // Do not store password in Recoil
            });
            navigate("/blogs");
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchInfo();
    }
  }, [navigate, setUser]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}
