
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  
  // Redirect to home page immediately
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Auth;
