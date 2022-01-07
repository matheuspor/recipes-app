import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MIN_PASSWORD_LENGTH = 6;

const useLoginHelper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isLoginDisabled, setisLoginDisabled] = useState(true);

  useEffect(() => {
    if (user.email && (user.password.length >= MIN_PASSWORD_LENGTH)) {
      setisLoginDisabled(false);
    } else setisLoginDisabled(true);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    navigate('/recipes-app/foods');
  };

  const handleChange = ({ target: { type, value } }) => {
    setUser({ ...user, [type]: value });
  };

  return { user, setUser, isLoginDisabled, handleChange, handleSubmit };
};

export default useLoginHelper;
