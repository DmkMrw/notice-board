import { API_URL } from '../../../config';
import styles from './AddAd.module.scss';
import { useState } from "react";



const AddAd = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');

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

    fetch(API_URL + '/api/ads', options)


    console.log('title:', title,
      'description:', description,
      'date:', date,
      'image:', image,
      'price:', price,
      'location:', location,
      'user:', user,
      'phoneNumber:', phone,
    );
  }




  return (
    <div className={styles.container}>
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
          <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Enter Date" />

          <label>
            Price
          </label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" />

          <label>
            Location
          </label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter Location" />

          <label>
            User
          </label>
          <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Enter username" />

          <label>
            Phone
          </label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter Phone Number"/>

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
