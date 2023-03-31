import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import s from './images/setup.svg';
const EmptyProductList = ({ step, setStep }) => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="set-up-dash">
          <div className="guideline-hold-with-bottom-border">
            <div className="container p-4 px-5 pb-4 ">
              <div className="bold-name-setup">Product List</div>
              <div className="guide-line-talks">
                This is a guideline for you on how to create you first product
                in your store
              </div>
            </div>
          </div>
          <div className="container pt-4 px-5 pb-4">
            <div className="row">
              <div className="col-12 hand-book-style2 mt-4 mb-4">
                <div className="hand-book-style2">
                  <img src={s} alt="picss" className="hand-book-image-style" />
                </div>
                <div className="product-list-empty">
                  Your product list is empty
                </div>
                <div className="product-list-guide">
                  This is a guideline for you on how to create you first product
                  in your store
                </div>
                <button className="add-product-button">Add Product</button>
                <button
                  className="add-product-button2"
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Bring back Guideline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyProductList;
