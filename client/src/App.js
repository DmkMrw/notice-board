import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAdsRequest } from './redux/adsRedux';
import Footer from './components/Footer/Footer';


// import routes
import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import Home from './components/pages/Home/Home';
import AdPage from './components/pages/AdPage/AdPage';
import NotFound from './components/pages/NotFound/NotFound';
import Register from './components/pages/Register/Register';
import SignIn from './components/pages/SignIn/SignIn';
import LogOut from './components/pages/LogOut/LogOut';
import Profile from './components/pages/Profile/Profile';
import AddAd from './components/pages/AddAd/AddAd';
import EditAdd from './components/pages/EditAdd/EditAdd';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(loadAdsRequest()), [dispatch]);

  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:adId" element={<AdPage />} />
          <Route path="/addAd" element={<AddAd />} />
          <Route path="/ad/edit/:adId" element={<EditAdd />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/logout" element={<LogOut/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer/>
    </>
  );
}

export default App;