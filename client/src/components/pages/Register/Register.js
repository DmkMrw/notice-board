import { useState } from 'react';
import { API_URL } from '../../../config';
import styles from './Register.module.scss';
import { Alert } from 'react-bootstrap'



const Register = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading')
    console.log(login, password, phoneNumber, avatar);

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phoneNumber);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    }
    console.log('ABCD');
    fetch(API_URL + '/auth/register', options)
      .then(res => {
        console.log('aaa')
        if (res.status === 201) {
          setStatus(null)
        }
      });
  }

  return (
    <>
      <div className={styles.container}>
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>

        {status === 'loading' ? <div className={styles.loader}></div> : null}

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
          <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}id="phone" name="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" />

          <label>
            Avatar
          </label>
          <input type="file" onChange={e => setAvatar(e.target.files[0])} />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;