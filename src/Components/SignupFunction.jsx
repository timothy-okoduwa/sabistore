import React from 'react';
import '../pages/SignPage/Sign.css';
import Form from 'react-bootstrap/Form';
import { RiErrorWarningFill } from 'react-icons/ri';
import { MdCancel } from 'react-icons/md';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from '@mui/material/Alert';
import m from './images/man-facepalming_1f926-200d-2642-fe0f.png';
import d from './images/disappointed-face_1f61e.png';
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
  setBusinessNameExists,
  businessNameChange,
  emailChange,
  passwordBlur,
  setEmailExixts,
  emailExixts,
  setPhoneNumberExisis,
  phoneNumberExists,
  setFeedback,
  feedback,
  setFeedback3,
  feedback3,
}) => {
  //  const handleCancelClick = () => {
  //    setBusinessNameExists(false);
  //  };

  return (
    <div className="inputs-holder negate">
      <div>
        <div className="sell-with-us">Sell with us</div>
        <div className="sign-up">Sign Up</div>
      </div>
      <Form className="mt-4">
        <div>
          {businessNameExists && (
            <div className="alert2 mb-3">
              <div>
                <RiErrorWarningFill className="mx-2 loik2" />
                An account with <b>{businessName}</b> already exists, Please
                choose a different Business name.{' '}
                <img
                  src={m}
                  alt="New cover image"
                  style={{ width: '7%', marginTop: '-4px' }}
                />
              </div>
            </div>
          )}
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
                marginTop: '8px',
                marginBottom: '8px',
              }}
            >{`sendlinks.com/${businessName}`}</div>
            {feedback3 && (
              <div className="alert3 mb-3">
                <div>
                  <RiErrorWarningFill className="mx-2 loik3" />
                  <span style={{ color: '#f87f7f' }}>
                    {feedback3}
                    <img
                      src={d}
                      alt="New cover image"
                      style={{ width: '7%', marginTop: '-4px' }}
                    />
                  </span>
                </div>
              </div>
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
          {emailExixts && (
            <div className="alert2 mb-3">
              <div>
                <RiErrorWarningFill className="mx-2 loik2" />
                An account with <b>{email}</b> already exists, Please choose a
                different email .
                <img
                  src={m}
                  alt="New cover image"
                  style={{ width: '7%', marginTop: '-4px' }}
                />
              </div>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="input-label mb-3">Password</div>
          <input
            className="input-input"
            value={password}
            onBlur={passwordBlur}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
          {feedback && (
            <div className="alert2 mb-3">
              <div>
                <RiErrorWarningFill className="mx-2 loik2" />
                {feedback}
              </div>
            </div>
          )}
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
          {phoneNumberExists && (
            <div className="alert2 mb-3">
              <div>
                <RiErrorWarningFill className="mx-2 loik2" />
                this phone number <b>{phoneNumber}</b> is tied to an account,
                Please choose a different phone number.
                <img
                  src={m}
                  alt="New cover image"
                  style={{ width: '7%', marginTop: '-4px' }}
                />
              </div>
            </div>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default SignupFunction;
