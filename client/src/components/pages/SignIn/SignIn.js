import styles from './SignIn.module.scss';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
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
          setTimeout(()=> navigate('/'), 2000)
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError')
      });
  }

  return (
    <>
        <div className={styles.container}>
        {/* <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert> */}

        {/* {status === 'loading' ? <div className={styles.loader}></div> : null} */}

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