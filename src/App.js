import Capcha from './components/Capcha';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <Home/> */}
      <Login/>
      {/* <Capcha/> */}
      <Footer/>
    </div>
  );
}

export default App;
