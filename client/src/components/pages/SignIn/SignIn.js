import styles from './SignIn.module.scss';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { addUserInfo } from "../../../redux/userRedux";


const SignIn = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading, 'success', 'serverError', 'clientError'
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    };

    setStatus('loading');
    fetch(API_URL + '/auth/login', options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(logIn({ login }));
          setTimeout(() => navigate('/'), 2000)
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        };
      })
      .catch(err => {
        setStatus('serverError')
      });

    fetch(API_URL + '/auth/user/'+login)
      .then((res) => res.json())
      .then((user) => dispatch(addUserInfo( user )));
  };

  return (
    <>
      <div className={styles.container}>
        {status === 'success' && (
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully logged in!</p>
          </Alert>
        )}

        {status === 'serverError' && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error.. Please try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='danger'>
            <Alert.Heading>Incorrect data</Alert.Heading>
            <p>Login or password are incorrect.</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation='border' role='status' className='d-block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <label>
            Login
          </label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter Login" />

          <label>
            Password
          </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
          <button>Submit</button>
        </form>
      </div>
    </>

  );
}

export default SignIn;