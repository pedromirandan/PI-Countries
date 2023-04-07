import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from "./views/Landing/Landing"
import Home from "./views/Home/Home"
import Detail from './views/Detail/Detail';
import { getActivities, getCountries } from './redux/actions';
import { useDispatch } from "react-redux"
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/country/:id" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;