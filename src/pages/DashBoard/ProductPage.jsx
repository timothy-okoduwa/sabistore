import React from 'react'
import HeadAndSide from './HeadAndSide'
import './Dashboard.css'
import MobileNav from './MobileNav';
const ProductPage = () => {
  return (
    <div>
      <HeadAndSide />
      <div className="pidgon ">
        <div className="container">product freaking page</div>
      </div>
      <MobileNav/>
    </div>
  );
}

export default ProductPage