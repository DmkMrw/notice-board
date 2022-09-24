import Lineup from "../../features/Lineup/Lineup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadAdsRequest } from "../../../redux/adsRedux";
import SearchBar from "../../features/SearchBar/SearchBar";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAdsRequest()), [dispatch]);

  return (
    <>
    <SearchBar />
    <Lineup />
    </>
  );
}

export default Home;
