import React from 'react';
import './Sign.css';
import LeftSlider from '../../Components/LeftSlider';
import SignupFunction from '../../Components/SignupFunction';
const SignUp = () => {
  return (
    <div style={{ background: '#F9F9F9' }}>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 disappear">
              <LeftSlider />
            </div>
            <div className="col-12 col-md-6 ">
              <div className="container px-4">
                <SignupFunction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
