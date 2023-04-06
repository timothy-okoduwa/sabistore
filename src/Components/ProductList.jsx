import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import MobileProduct from '../pages/DashBoard/MobileProduct';
import s from './images/setup.svg';
import { useNavigate } from 'react-router-dom';
import Table from './Table';
const ProductList = () => {
  const navigate = useNavigate()
  const move = ()=>{
    navigate('/productpage');
  }
  return (
    <div>
      <div>
        <div className="mt-5 mb-3">
          <div className="container">
            <div className="set-up-dash pb-3 ">
              <div className="guideline-hold-with-bottom-border">
                <div className="container p-4  pb-4 ">
                  <div className="flex-ro">
                    <div className="bold-name-setup">Product List</div>
                    <div className="see-all" onClick={move}>See All</div>
                  </div>
                </div>
              </div>
              <Table />
              <MobileProduct/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
