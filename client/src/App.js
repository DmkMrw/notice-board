import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';
import CardBox from './components/features/CardBox/CardBox';

const App = () => {
  return (
    <>
      <NavBar />
      <Container>
        <CardBox />
      </Container>
    </>
  );
}

export default App;