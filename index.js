import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestState from './TestState';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Processbuy from './Processbuy';
import History from './History';
import Daily from './Daily';
// import Results from './results';
import Results from './Results'
import Signup from './Signup';
// import FarmerHome from './FarmerHome';
import FarmerHome from './FarmerHome';
import จัดการข้อมูลสวนยางพารา from './จัดการข้อมูลสวนยางพารา';
import ข้อมูลการขายน้ำยางพารา from './ข้อมูลการขายน้ำยางพารา';
import ค้นหาสถานที่รับซื้อ from './ค้นหาสถานที่รับซื้อ'
import แสดงข้อมูลสวนยางพารา from './แสดงข้อมูลสวนยางพารา';
import Profile from './Profile';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="processbuy" element={<Processbuy />} />
        <Route path="history" element={<History />} />
        <Route path="daily" element={<Daily />} />
        <Route path="Results" element={<Results />} />
        {/* <Route path="signup" element={<signup />} /> */}
        <Route path="signup" element={<Signup />} />
        <Route path="farmerhome" element={<FarmerHome />} />
        <Route path="จัดการข้อมูลสวนยางพารา" element={<จัดการข้อมูลสวนยางพารา />} />
        <Route path="ข้อมูลการขายน้ำยางพารา" element={<ข้อมูลการขายน้ำยางพารา />} />
        <Route path="ค้นหาสถานที่รับซื้อ" element={<ค้นหาสถานที่รับซื้อ />} />
        <Route path="แสดงข้อมูลสวนยางพารา" element={<แสดงข้อมูลสวนยางพารา />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
