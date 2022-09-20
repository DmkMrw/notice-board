import CardBox from "../../features/CardBox/CardBox";
import styles from "./SearchResult.module.scss";
import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import SearchBar from "../../features/SearchBar/SearchBar";

const SearchResult = () => {

    const ads = useSelector(getAllAds);

  return (
    <>
      <SearchBar/>
      <div className={styles.cards_wrapper}>
        {ads.map(ad => <CardBox key={ad._id} {...ad}/> )}
      </div>
    </>
  );
}

export default SearchResult;