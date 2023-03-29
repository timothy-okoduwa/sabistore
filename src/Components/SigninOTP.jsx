import React from 'react';
import '../pages/SignPage/Sign.css';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const SigninOTP = () => {
  return (
    <div>
      <div className="inputs-holder2 negate phoneNumber">
        <div>
          <div className="sell-with-us">Welcome back</div>
          <div className="sign-up">Sign In</div>
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
        <button className="input-submit-button mt-4"> Sign In</button>
        <div className="other-items mt-4">
          Don't have an account?{' '}
          <Link to="/" className="Link">
            <span className="sign-in mx-1">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninOTP;
