import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap'
import styles from './LogOut.module.scss';



const LogOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null); //'success'


  useEffect(() => {
    const options = {
      method: 'DELETE',
    };

    fetch(API_URL + '/auth/logout', options)
      .then(() => {
        dispatch(logOut());
      });
    setStatus('success')
    setTimeout(() => navigate('/'), 2500);
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {status === 'success' && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged out! See You next time!</p>
        </Alert>
      )}
    </div>
  );
}

export default LogOut;