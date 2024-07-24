
import { useNavigate } from 'react-router-dom';
import { Auth } from '../Components/Auth';
import { Quote } from '../Components/Quote';

export const Signin = () => {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
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
