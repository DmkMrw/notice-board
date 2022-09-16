import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAdsRequest } from './redux/adsRedux';

// import routes
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAdsRequest()), [dispatch]);

  console.log('useEffect(() => dispatch(loadAdsRequest()), [dispatch]);', useEffect(() => dispatch(loadAdsRequest()), [dispatch]));

  return (
    <>
      <NavBar />
      <Container>
        <Home />
        <NotFound />
      </Container>
    </>
  );
}

export default App;