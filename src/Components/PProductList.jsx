import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import PMobileProduct from './PMobileProduct';
import PTable from './PTable';
const ProductList = () => {
  return (
    <div>
      <div>
        <div className="mt-5 mb-3">
          <div className="container">
            <div className="set-up-dash  ">
              <div className="guideline-hold-with-bottom-border">
                <div className="container p-4  pb-4 ">
                  <div className="flex-ro">
                    <div className="bold-name-setup">Product List</div>
                    <div className="see-all">Back</div>
                  </div>
                </div>
              </div>
              <PTable />
              <PMobileProduct />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
