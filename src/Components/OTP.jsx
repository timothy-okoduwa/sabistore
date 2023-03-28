import React from 'react';
import '../pages/SignPage/Sign.css';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Form from 'react-bootstrap/Form';

const OTP = () => {
  return (
    <div>
      <div className="inputs-holder2">
        <div>
          <div className="sell-with-us">Sell with us</div>
          <div className="sign-up">Sign Up</div>
        </div>
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="input-label mb-3">Enter OTP</div>
            <div className="input-label mb-3">
              *An OTP has been sent to your phone number
            </div>
            <MuiOtpInput length={6} />
          </Form.Group>
        </Form>
        <button className="input-submit-button mt-4"> Register</button>
        <div className="other-items mt-4">
          Already have an account? <span className="sign-in mx-1">Sign In</span>
        </div>
      </div>
    </div>
  );
};

export default OTP;
