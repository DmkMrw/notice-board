import { useState } from 'react';
import { API_URL } from '../../../config';
import styles from './Register.module.scss';
import { Alert, Spinner } from 'react-bootstrap';


const Register = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading, 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading')

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phoneNumber);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    }

    setStatus('loading');
    fetch(API_URL + '/auth/register', options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      });
  }

  return (
    <>
      <div className={styles.container}>
        {status === 'success' && (
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been successfully registered! You can now log in...</p>
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
            <Alert.Heading>Not enough data</Alert.Heading>
            <p>You have to fill all the fields.</p>
          </Alert>
        )}

        {status === 'loginError' && (
          <Alert variant='warning'>
            <Alert.Heading>Login already in use</Alert.Heading>
            <p>You have to use other login.</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation='border' role='status' className='d-block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <label>
            Login
          </label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter Login" />

          <label>
            Password
          </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />

          <label>
            Phone number
          </label>
          <small>Format: 501502503</small>
          <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} id="phone" placeholder="Enter phone number" name="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" />

          <label>
            Avatar
          </label>
          <input type="file" onChange={e => setAvatar(e.target.files[0])} />
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;