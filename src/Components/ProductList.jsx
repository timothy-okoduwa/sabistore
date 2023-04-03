import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import s from './images/setup.svg';
import Table from './Table';
const ProductList = () => {
  return (
    <div>
      <div>
        <div className="mt-5 mb-3">
          <div className="container">
            <div className="set-up-dash pb-3 ">
              <div className="guideline-hold-with-bottom-border">
                <div className="container p-4 px-5 pb-4 ">
                  <div className="flex-ro">
                    <div className="bold-name-setup">Product List</div>
                    <div className="see-all">See All</div>
                  </div>
                </div>
              </div>
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
