import React from 'react';
import '../pages/SignPage/Sign.css';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import p from './images/party-popper_1f389.png';
import { BsFillCheckCircleFill } from 'react-icons/bs';
const SigninOTP = ({ otp, setOtp, handleSignIn,loading,feedback2 }) => {
  const handleChange3 = (newValue) => {
    setOtp(newValue);
  };
  return (
    <div>
      <div className="inputs-holder2 negate phoneNumber">
        <div>
          <div className="sell-with-us">Welcome back</div>
          <div className="sign-up">Sign In</div>
        </div>
        <Form className="mt-5">
          <div>
            {feedback2 && (
              <div className="alert4 mb-3">
                <div>
                  <BsFillCheckCircleFill className="mx-2 loik" />
                  {feedback2}{' '}
                  <img
                    src={p}
                    alt="New cover image"
                    style={{ width: '7%', marginTop: '-4px' }}
                  />
                </div>
              </div>
            )}
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="input-label mb-3">Enter OTP</div>
            <div className="input-label mb-3">
              *An OTP has been sent to your phone number
            </div>
            <MuiOtpInput
              length={6}
              value={otp}
              onChange={handleChange3}
              type="number"
            />
          </Form.Group>
        </Form>
        <button
          className={`input-submit-button mt-4  ${
            loading || !otp ? 'disabled' : ''
          }`}
          disabled={loading || !otp}
          onClick={handleSignIn}
        >
          {' '}
          {loading ? (
            <CircularProgress style={{ color: 'white' }} />
          ) : (
            'Sign in'
          )}
        </button>
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
