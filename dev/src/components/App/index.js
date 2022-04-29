import { Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from 'src/components/Home';
import Auth from 'src/components/Auth';
import Dashboard from 'src/components/Dashboard';
const App = () => {
  const { logModal, connect } = useSelector((state) => state.buyer);
  return (
    <div className="app">
      <header className="App-header">
        <NavLink
          key="/dashboard"
          to="/dashboard"
        >
          <button className="dashboard-btn"></button>
        </NavLink>
        <Auth />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
