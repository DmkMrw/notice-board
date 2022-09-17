import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const LogOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(API_URL + '/auth/logout', options)
      .then(() => {
        dispatch(logOut());
      });
    setTimeout(() => navigate('/'), 2000);
  }, [dispatch]);

  return (
    <>
      You are currently logged out
    </>
  );
}

export default LogOut;