import React from 'react';
import HeadAndSide from './HeadAndSide';
import './Dashboard.css';
import DwelcomeProp from '../../Components/DwelcomeProp';
import Danalytics from '../../Components/Danalytics';
import MultiSetUpGuide from '../../Components/MultiSetUpGuide';
const Dashboard = () => {
  return (
    <div>
      <HeadAndSide />
      <div className="pidgon ">
        <div className="container">
          <DwelcomeProp/>
          <Danalytics/>
          <MultiSetUpGuide/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
