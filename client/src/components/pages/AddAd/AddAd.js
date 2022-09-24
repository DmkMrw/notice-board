import { API_URL } from '../../../config';
import styles from './AddAd.module.scss';
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from 'react-bootstrap';
import { getUserData } from "../../../redux/userRedux";
import { useNavigate } from 'react-router-dom';


const AddAd = () => {
  const data = useSelector(getUserData);
  const { login, phoneNumber } = data
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(login);
  const [phone, setPhone] = useState(phoneNumber);
  const [status, setStatus] = useState(null); // null, 'loading, 'success', 'serverError', 'clientError', 'loginError'




  const handleSubmit = (e) => {
    e.preventDefault()

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('date', date);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('user', user);
    fd.append('phone', phone);
    fd.append('image', image);

    const options = {
      method: 'POST',
      body: fd
    };
    setStatus('loading');
    fetch(API_URL + '/api/ads', options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          setTimeout(() => navigate('/'), 2000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      });
  }

  return (
    <div className={styles.container}>
      {status === 'success' && (
          <Alert variant='success'>
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have added an advertisement. Going back to home page</p>
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

        {status === 'loading' && (
          <Spinner animation='border' role='status' className='d-block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
)
}
      <div className={styles.ad_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Add new advertisement</h1>
          <label>
            Title
          </label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title" />

          <label>
            Description
          </label>
          <textarea className={styles.textarea} type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" />

          <label>
            Date
          </label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Enter Date" />

          <label>
            Price
          </label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" />

          <label>
            Location
          </label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter Location" />

          <label>
            Author
          </label>
          <input type="text" disabled defaultValue={login}  placeholder="Enter username" />

          <label>
            Phone
          </label>
          <input type="text" disabled defaultValue={phoneNumber}  placeholder="Enter Phone Number"/>

          <label>
            Image
          </label>
          <input type="file" onChange={e => setImage(e.target.files[0])} />


          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddAd;
