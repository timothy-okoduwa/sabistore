import React, { useState } from 'react';
import '../pages/SignPage/Sign.css';
import Form from 'react-bootstrap/Form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
const SignupFunction = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <div className="inputs-holder">
      <div>
        <div className="sell-with-us">Sell with us</div>
        <div className="sign-up">Sign Up</div>
      </div>
      <Form className="mt-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Business Name</div>
          <input className="input-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Store Name</div>
          <input className="input-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Email</div>
          <input className="input-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Password</div>
          <input className="input-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Phone Number</div>
          <PhoneInput
            defaultCountry="NG"
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="px-3 input-input wow"
            required
          />
        </Form.Group>
      </Form>
      <button className="input-submit-button mt-4"> Register</button>
      <div className="other-items mt-4">
        Already have an account?  <span className='sign-in mx-1'>Sign In</span>
      </div>
    </div>
  );
};

export default SignupFunction;
