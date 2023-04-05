import React from 'react';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import './ProductPage.css';
import PwelcomeProp from '../../Components/PwelcomeProp';
import MobileNav from '../DashBoard/MobileNav';
import ProdEList from '../../Components/ProdEList';
const ProductPage = () => {
  return (
    <div>
      <HeadAndSide />
      <div className="pidgon ">
        <div className="container ">
          <PwelcomeProp />
          <ProdEList />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default ProductPage;
