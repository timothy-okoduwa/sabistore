import React from 'react'
import './Settings.css';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import OwnerSettings from '../../Components/OwnerSettings';
const Settings = () => {
  return (
    <div>
      <HeadAndSide />
      <div className="pidgon ">
        <div className="container">
          <div>
           <OwnerSettings/>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

export default Settings