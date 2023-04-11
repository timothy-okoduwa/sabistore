import React from 'react';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import NewProduct from '../../Components/NewProduct';
const Dashboard = () => {
  return (
    <div>
      <HeadAndSide />
      <div className="pidgon ">
        <div className="container">
          <div>
            <NewProduct/>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;