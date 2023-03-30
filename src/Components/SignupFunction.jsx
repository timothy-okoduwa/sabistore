import React from 'react';
import '../pages/SignPage/Sign.css';
import Form from 'react-bootstrap/Form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from '@mui/material/Alert';

const SignupFunction = ({
  phoneNumber,
  setPhoneNumber,
  businessName,
  setBusinessName,
  storeName,
  setStoreName,
  email,
  setEmail,
  setPassword,
  password,
  error,
  businessNameExists,
  businessNameChange,
  emailChange,
  passwordChange,
}) => {
  

  return (
    <div className="inputs-holder negate">
      <div>
        <div className="sell-with-us">Sell with us</div>
        <div className="sign-up">Sign Up</div>
      </div>
      <Form className="mt-4">
        <div>
          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Business Name</div>
          <div>
            <input
              className="input-input"
              value={businessName}
              onChange={businessNameChange}
              required
            />
            <div
              style={{
                fontSize: '12px',
                color: '#90908F',
                marginTop:'8px',
                marginBottom: '8px',
              }}
            >{`sendlinks.com/preview/${businessName}`}</div>
            {businessNameExists && (
              <p
                style={{
                  fontSize: '12px',
                  color: '#ff0000',

                  marginBottom: '8px',
                  marginTop: '9px',
                }}
              >
                An account with <b>{businessName}</b> already exists. Please
                choose a different Business name.
              </p>
            )}
          </div>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Store Name</div>
          <input
            className="input-input"
            value={storeName}
            onChange={storeNameChange}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Email</div>
          <input
            className="input-input"
            value={email}
            onChange={emailChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Password</div>
          <input
            className="input-input"
            value={password}
            onChange={passwordChange}
            required
            type="password"
          />
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
    </div>
  );
};

export default SignupFunction;
