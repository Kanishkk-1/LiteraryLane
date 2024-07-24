import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authState } from '../State/userAtom'; // Adjust import path as needed
import { Auth } from '../Components/Auth';
import { Quote } from '../Components/Quote';

export const Signin = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    // Redirect to home or desired page after successful sign-in
    navigate('/blogs');
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" onSignInSuccess={handleSignInSuccess} />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
