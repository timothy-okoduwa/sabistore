import React, { useState } from 'react';
import SignupFunction from './SignupFunction';
import '../pages/SignPage/Sign.css';
import { Link } from 'react-router-dom';
import OTP from './OTP';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const renderForm = () => {
    switch (step) {
      case 1:
        return <SignupFunction />;
      case 2:
        return <OTP/>;

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="multistep-form ">
        {renderForm()}
        <div className="buttons">
          {step < 2 && (
            <button
              onClick={() => setStep(step + 1)}
              className="input-submit-button mt-4 negate"
            >
              Next
            </button>
          )}
        </div>
        <div style={{ height: '44px' }}>
          {step < 2 && (
            <div className="other-items mt-4 negate">
              Already have an account?{' '}
              <Link to="/signin" className="Link">
                <span className="sign-in mx-1">Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
