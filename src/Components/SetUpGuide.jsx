import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import { TbCircleDashed } from 'react-icons/tb';
import {BsCheckCircleFill} from 'react-icons/bs'
import s from './images/setup.svg'
const SetUpGuide = () => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="set-up-dash">
          <div className="guideline-hold-with-bottom-border">
            <div className="container p-4 px-5 pb-4 ">
              <div className="bold-name-setup">Setup Guide</div>
              <div className="guide-line-talks">
                This is a guideline for you on how to create you first product
                in your store
              </div>
            </div>
          </div>
          <div className="container pt-4 px-5 pb-4">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="steps-to-guide mt-4 mb-4">
                    <TbCircleDashed className="dashed-circle" /> Complete/Create
                    your store profile
                  </div>
                  <div className="steps-to-guide mb-4">
                    {' '}
                    <TbCircleDashed className="dashed-circle" /> Create a
                    Product
                  </div>
                  <div className="steps-to-guide mb-4">
                    {' '}
                    <TbCircleDashed className="dashed-circle" /> Preview your
                    store
                  </div>
                  <div className="steps-to-guide mb-4">
                    <BsCheckCircleFill className="dashed-circle2" /> Share your
                    store link
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 hand-book-style">
                <div className="hand-book-style">
                  <img src={s} alt="picss" className='hand-book-image-style' />
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-4 px-5 pb-4">
            <div>
              <button className="skip-guideline-button">Skip Guideline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUpGuide;
