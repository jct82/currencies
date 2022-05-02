import { Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from 'src/components/Home';
import Auth from 'src/components/Auth';
import Basket from "../Basket";
import Dashboard from 'src/components/Dashboard';
const App = () => {
  const { logModal, connect } = useSelector((state) => state.buyer);
  return (
    <div className="app">
      <div className="background-app">  
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
         <div className="ray"></div>
      </div>
      <header className="App-header">
        <NavLink className="dashboard-cta"
          key="/dashboard"
          to="/dashboard"
        >
          <button className="dashboard-btn"></button>
        </NavLink>
        <NavLink className="home-cta"
          key="/"
          to="/"
        >
          <span className="home-cta">Currency App</span>
        </NavLink>
        <Auth />
      </header>
      <Basket />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
