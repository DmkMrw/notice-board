import { API_URL } from '../../../config';
import { IMGS_URL } from '../../../config';
import styles from './EditAdd.module.scss';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Spinner } from 'react-bootstrap';
import { getUserData } from "../../../redux/userRedux";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditAdd = () => {

  const data = useSelector(getUserData);
  const { login, phoneNumber } = data
  const navigate = useNavigate();
  const { adId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading, 'success', 'serverError', 'clientError',

  useEffect(() => {
    fetch(`${API_URL}/api/ads/${adId}`)
    .then((res) => res.json())
    .then(data => {
      setTitle(data.title)
      setDescription(data.description)
      setDate(data.date)
      setImage(data.image)
      setPrice(data.price)
      setLocation(data.location)
    })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('date', date);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('user', login);
    fd.append('phone', phoneNumber);
    fd.append('image', newImage);

    const options = {
      method: 'PUT',
      body: fd
    };
    setStatus('loading');
    fetch(API_URL + '/api/ads/'+adId, options)
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
            <p>You have edited your advertisement. Going back to home page</p>
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
        )}
      <div className={styles.ad_wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Edit advertisement</h1>
        <div className={styles.img_wrapper}>
          <img src={IMGS_URL + image} alt="product_image" />
        </div>
          <label>
            Title
          </label>
          <textarea className={styles.textarea_title} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title"/>

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
            Image
          </label>
          <input type="file" onChange={e => setNewImage(e.target.files[0])} />
          <button className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditAdd
