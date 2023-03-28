import React, { useState } from 'react';
import SignupFunction from './SignupFunction';
import '../pages/SignPage/Sign.css';
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
      <div className="multistep-form">
        {renderForm()}
        <div className="buttons" style={{ paddingRight: '23px' }}>
          {step < 2 && (
            <button
              onClick={() => setStep(step + 1)}
              className="input-submit-button mt-4"
            >
              Next
            </button>
          )}
        </div>
        <div>
          {step < 2 && (
            <div className="other-items mt-4">
              Already have an account?{' '}
              <span className="sign-in mx-1">Sign In</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
