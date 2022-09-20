import styles from './SearchBar.module.scss';
import { useState } from 'react';

const SearchBar = () => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    console.log('SEARCH');
    console.log('searchValue', searchValue);
  };


  return (
    <div className={styles.container}>
      <input type='text' onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;