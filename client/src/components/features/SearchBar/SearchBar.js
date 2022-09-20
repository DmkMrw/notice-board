import styles from './SearchBar.module.scss';
import { useState } from 'react';
import { API_URL } from '../../../config';
import { updateAds } from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { loadAdsRequest } from '../../../redux/adsRedux';
import { Link } from 'react-router-dom';

const SearchBar = () => {

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('SEARCH');
    if (searchValue === '') {
      dispatch(loadAdsRequest())
    } else if (searchValue !== '') {
      fetch(API_URL + '/api/ads/search/' + searchValue)
      .then(res => res.json())
      .then(data => dispatch(updateAds(data)))
    }
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} type='text' onChange={(e) => setSearchValue(e.target.value)} />
      <Link to='/searchresult'>
        <button className={styles.button} onClick={handleSearch}>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;