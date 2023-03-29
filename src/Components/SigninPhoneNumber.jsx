import React, { useState } from 'react';
import '../pages/SignPage/Sign.css';
import Form from 'react-bootstrap/Form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
const SigninPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <div>
      <div className="inputs-holder2">
        <div>
          <div className="sell-with-us">Welcome back</div>
          <div className="sign-up">Sign In</div>
        </div>
        <Form className="mt-5">
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
      </div>
    </div>
  );
};

export default SigninPhoneNumber;
