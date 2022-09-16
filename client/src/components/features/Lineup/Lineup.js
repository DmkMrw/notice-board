import CardBox from "../CardBox/CardBox";
import styles from "./Lineup.module.scss";
import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";

const Lineup = () => {

  const ads = useSelector(getAllAds);

  console.log('ads', ads);

  return (
      <div className={styles.cards_wrapper}>
      {/* <CardBox/>
      <CardBox/>
      <CardBox/>
      <CardBox/>
      <CardBox/> */}
      {ads.map(ad => <CardBox key={ad._id} {...ad}/> )}
      </div>
  );
}

export default Lineup;