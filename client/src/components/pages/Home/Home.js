import Lineup from "../../features/Lineup/Lineup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadAdsRequest } from "../../../redux/adsRedux";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAdsRequest()), [dispatch]);

  return (
    <Lineup />
  );
}

export default Home;
