import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import { AiFillHeart, AiFillEye } from 'react-icons/ai';
import { MdOutlineAdsClick } from 'react-icons/md';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
const Danalytics = ({ user }) => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="sizes-of-analytics p-4">
              <div className="flip-killer">
                <AiFillHeart className="heart" />
                <div className="no-of-product mx-3">No of Product</div>
              </div>
              <div className="mt-4">
                <div className="flip-killer2 mt-4">
                  <div className="number">{user?.products?.length}</div>
                  <div>
                    {/* <HiTrendingUp /> <span>{user?.products?.length}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="sizes-of-analytics p-4">
              <div className="flip-killer">
                <AiFillEye className="heart" />
                <div className="no-of-product mx-3">No of Visitors</div>
              </div>
              <div className="mt-4">
                <div className="flip-killer2 mt-4">
                  <div className="number">1,000</div>
                  <div>
                    <HiTrendingDown className="down" />{' '}
                    <span className="percent">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="sizes-of-analytics p-4">
              <div className="flip-killer">
                <MdOutlineAdsClick className="heart" />
                <div className="no-of-product mx-3">No of Visitors</div>
              </div>
              <div className="mt-4">
                <div className="flip-killer2 mt-4">
                  <div className="number">200</div>
                  <div>
                    <HiTrendingUp className="up" />{' '}
                    <span className="percent">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danalytics;
