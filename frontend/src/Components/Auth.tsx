import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@kanishkk-1/literarylane2.0";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { authState } from '../State/userAtom'; 

interface AuthProps {
  type: "signup" | "signin";
  onSignInSuccess?: () => void;
}

export const Auth = ({ type, onSignInSuccess }: AuthProps) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [, setAuth] = useRecoilState(authState); 

  const validateInputs = () => {
    if (type === "signup" && !postInputs.name) {
      setError("Name is required");
      return false;
    }
    if (!postInputs.username) {
      setError("Username is required");
      return false;
    }
    if (!postInputs.password) {
      setError("Password is required");
      return false;
    }
    setError(null);
    return true;
  };
  const sendRequest = async () => {
    if (!validateInputs()) return;
  
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data;
  
      localStorage.setItem("token", jwt);
  
      if (type === "signin") {
        setAuth({ isLoggedIn: true, user: {} });
  
        navigate("/blogs");
  
        if (onSignInSuccess) {
          onSignInSuccess();
        }
      } else {
        navigate("/signin");
      }
    } catch (e) {
      console.error('Error during sign-in/sign-up:', e);
      setError("Error while signing up/signing in");
    }
  };
  
  

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Sign in to your account"}
            </div>
            <div className="text-slate-500">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput label="Name" placeholder="Kanishk..." onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              }} />
            ) : null}
            <LabelledInput label="Username" placeholder="Kanishk@gmail.com" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value
              })
            }} />
            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }} />
            {error && <p className="text-red-600 mt-2">{error}</p>}
            <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
      <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
  );
}
