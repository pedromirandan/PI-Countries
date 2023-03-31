import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Landing from "./views/Landing/Landing"
import Home from "./views/Home/Home"
import { useLocation } from 'react-router-dom';
import { getCountries } from './redux/actions';
import { useDispatch } from "react-redux"
import { useEffect } from 'react';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

  return (
    <div className="App">
      {location.pathname !== '/' ? <Nav className='NavBar'/> : null}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;