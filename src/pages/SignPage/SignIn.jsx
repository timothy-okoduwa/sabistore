import React from 'react';
import './Sign.css';
import LeftSlider from '../../Components/LeftSlider';
import SignInMultiStep from '../../Components/SignInMultiStep';

const SignIn = () => {
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-6 disappear">
              <LeftSlider />
            </div>
            <div className="col-12 col-lg-6 ">
              <div className="container px-4">
                <SignInMultiStep />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
