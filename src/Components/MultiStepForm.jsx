import React, { useState, useEffect } from 'react';
import SignupFunction from './SignupFunction';
import '../pages/SignPage/Sign.css';
import { Link, useNavigate } from 'react-router-dom';
import OTP from './OTP';
import { db } from '../firebase';
import {
  getAuth,
  browserSessionPersistence,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithCredential,
  PhoneAuthProvider,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessNameExists, setBusinessNameExists] = useState(false);
  const [flag, setFlag] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recaptchaPresent, setRecaptchaPresent] = useState(false);
  const [result, setResult] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState({
    loading: false,
    online: true,
  });

const navigate = useNavigate();
const [open, setOpen] = React.useState(false);

const { loading, online } = info;
const authInstance = getAuth();
// Setting Up Recaptcha
function setUpRecaptha(number) {
  const authInstance = getAuth();
  authInstance.setPersistence(browserSessionPersistence);
  const recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      callback: () => {
        console.log('reCAPTCHA verification successful');
        setStep(step+1);
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

const getOtp = async () => {
  console.log(phoneNumber);
  setError('');
  console.log(error);
  if (phoneNumber === '' || phoneNumber === undefined)
    return setError('Please enter a valid phone number!');
  try {
    const response = await setUpRecaptha(phoneNumber);
    setResult(response);
    setFlag(true);
  } catch (err) {
    setError(err.message);
  }
};

// Validating if the business Name Exists
useEffect(() => {
  async function checkBusinessNameExists() {
    const querySnapshot = await getDocs(
      query(collection(db, 'admin'), where('businessName', '==', businessName))
    );
    setBusinessNameExists(!querySnapshot.empty);
  }
  if (businessName) {
    checkBusinessNameExists();
  }
}, [businessName]);


// Verifying the OTP and also passing user input to the document
async function verifyOtp() {
  setInfo({ ...info, error: null, loading: true, online: true });
  setError('');
  if (otp === '' || otp === null) return;
  if (
    !businessName ||
    !phoneNumber ||
    !password ||
    !otp ||
    !password ||
    !email
  ) {
    setInfo({ ...info, error: 'All documents are needed to Fly' });
  }

  // Check if the business name already exists
  const q = query(
    collection(db, 'admin'),
    where('businessName', '==', businessName)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    setInfo({ ...info, error: 'Business name already exists' });
    return;
  }

  try {
    const credential = PhoneAuthProvider.credential(result.verificationId, otp);
    await signInWithCredential(authInstance, credential);
    await setDoc(doc(db, 'admin', authInstance.currentUser.uid), {
      uid: authInstance.currentUser.uid,
      businessName,
      phoneNumber,
      password,
      otp,
      email,
      online,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setInfo({
      businessName: '',
      phoneNumber: '',
      password: '',
      error: null,
      loading: false,
      otp: '',
      online: true,
    });
    navigate('/dasboard');
  } catch (err) {
    setError(err.message);
  }
}


  //Ends here
  const businessNameChange = (event) => {
    setBusinessName(event.target.value);
  };
  // const storeNameChange = (event) => {
  //   setStoreName(event.target.value);
  // };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  console.log(error);
  // passing the states as props to the children
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SignupFunction
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            businessName={businessName}
            setBusinessName={setBusinessName}
            storeName={storeName}
            setStoreName={setStoreName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            businessNameExists={businessNameExists}
            setBusinessNameExists={setBusinessNameExists}
            businessNameChange={businessNameChange}
            emailChange={emailChange}
            passwordChange={passwordChange}
            error={error}
          />
        );
      case 2:
        return (
          <div>
            <OTP
              otp={otp}
              setOtp={setOtp}
              flag={flag}
              verifyOtp={verifyOtp}
              loading={loading}
              error={error}
             
            />
          </div>
        );

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
                  getOtp();
                }}
                className={`input-submit-button mt-4 negate ${
                  loading ||
                  !businessName ||
                  !phoneNumber ||
                  !password ||
                  !email ||
                  recaptchaPresent
                    ? 'disabled'
                    : ''
                }`}
                disabled={
                  loading ||
                  !businessName ||
                  !phoneNumber ||
                  !password ||
                  !email ||
                  recaptchaPresent
                }
                style={{ display: recaptchaPresent ? 'none' : 'block' }}
              >
                Next
              </button>
            </>
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
