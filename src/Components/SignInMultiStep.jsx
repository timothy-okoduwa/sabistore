import React, { useState } from 'react';
import SigninOTP from './SigninOTP';
import SigninPhoneNumber from './SigninPhoneNumber';
import { Link, useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  getAuth,
  browserSessionPersistence,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
const SignInMultiStep = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [recaptchaPresent, setRecaptchaPresent] = useState(false);
  const [otp, setOtp] = React.useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState({
    loading: false,
    online: true,
  });

  const navigate = useNavigate();
  const { loading, online } = info;

  const authInstance = getAuth();
  authInstance.setPersistence(browserSessionPersistence);

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        callback: () => {
          console.log('reCAPTCHA verification successful');
          setStep(step + 1);
          document.getElementById('recaptcha-container').style.display = 'none';
        },
        siteKey: '6LeVX8gkAAAAAOWuORnO2XZhXikEOrCjU1XssmnV',
      },
      authInstance
    );
    recaptchaVerifier.render().then(() => {
      setRecaptchaPresent(true);
    });
    return signInWithPhoneNumber(authInstance, number, recaptchaVerifier);
  }

  const handleSendVerificationCode = async () => {
    setError('');
    if (phoneNumber === '' || phoneNumber === undefined)
      return setError('Please enter a valid phone number!');
    try {
      const verification = await setUpRecaptcha(phoneNumber);
      setVerificationId(verification.verificationId);
      setError('');
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };
  console.log(error)

  const handleSignIn = async () => {
    setError('');
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(
        authInstance,
        credential
      );
      const user = userCredential.user;
      console.log(user);

      // Update user's online status to true
      const userDocRef = doc(db, 'admin', user.uid);
      await updateDoc(userDocRef, { online: true });
    } catch (err) {
      setError(err.message);
    }
    navigate('/dashboard');
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SigninPhoneNumber
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 2:
        return (
          <SigninOTP otp={otp} setOtp={setOtp} handleSignIn={handleSignIn} loading={loading} />
        );

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
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                className="negate captcha-holder"
              >
                <div id="recaptcha-container"></div>
              </div>
              <button
                onClick={() => {
                  handleSendVerificationCode();
                }}
                className={`input-submit-button mt-4 negate ${
                  loading || !phoneNumber || recaptchaPresent ? 'disabled' : ''
                }`}
                disabled={loading || !phoneNumber || recaptchaPresent}
                style={{ display: recaptchaPresent ? 'none' : 'block' }}
              >
                Next
              </button>
            </>
          )}
        </div>
        <div>
          {step < 2 && (
            <div className="other-items mt-4 negate">
              Don't have an account?{' '}
              <Link to="/" className="Link">
                <span className="sign-in mx-1">Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInMultiStep;
