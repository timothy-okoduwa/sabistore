import React, { useState, useEffect } from 'react';
import SignupFunction from './SignupFunction';
import '../pages/SignPage/Sign.css';
import { Link, useNavigate } from 'react-router-dom';
import OTP from './OTP';
import { db } from '../firebase';
import m from './images/man-facepalming_1f926-200d-2642-fe0f.png';
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
  const [emailExixts, setEmailExixts] = useState(false);
  const [flag, setFlag] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedback2, setFeedback2] = useState('');
  const [feedback3, setFeedback3] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberExists, setPhoneNumberExisis] = useState(false);
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
          setFeedback2('reCAPTCHA verification successful');
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
      switch (err.code) {
        case 'auth/invalid-email':
          setError({
            error: 'All fields are required.',
          });
          break;
        case 'auth/user-disabled':
          setError({
            error:
              'Your account has been disabled,contact the super Admin for help',
          });
          break;
        case 'auth/user-not-found':
          setError({
            error: 'You are not authorized, go away 😡',
          });
          break;
        case 'auth/too-many-requests':
          setError({
            error:
              'you have exhusted the maxium trial limit, come back 1hr later ',
          });
          break;
        case 'auth/network-request-failed':
          setError({
            error: 'check your internet connection, it seems to be slow ',
          });
          break;
        case 'auth/auth/internal-error':
          setError({
            error: 'check your internet connection, it seems to be slow ',
          });
          break;

        case 'auth/wrong-password':
          setError({
            error: 'Invalid password.',
          });
          break;
        default:
          setError(error);
          break;
      }
    }
  };

  // Validating if the business Name Exists
  useEffect(() => {
    async function checkBusinessNameExists() {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'admin'),
          where('businessName', '==', businessName)
        )
      );
      setBusinessNameExists(!querySnapshot.empty);
    }
    if (businessName) {
      checkBusinessNameExists();
    }
  }, [businessName]);
  // Validating if the email Exists
  useEffect(() => {
    async function checkEmailExisits() {
      const querySnapshot = await getDocs(
        query(collection(db, 'admin'), where('email', '==', email))
      );
      setEmailExixts(!querySnapshot.empty);
    }
    if (email) {
      checkEmailExisits();
    }
  }, [email]);
  // Validating if the phone number Exists
  useEffect(() => {
    async function checkPhoneNumberExists() {
      const querySnapshot = await getDocs(
        query(collection(db, 'admin'), where('phoneNumber', '==', phoneNumber))
      );
      setPhoneNumberExisis(!querySnapshot.empty);
    }
    if (phoneNumber) {
      checkPhoneNumberExists();
    }
  }, [phoneNumber]);

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
      const credential = PhoneAuthProvider.credential(
        result.verificationId,
        otp
      );
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  //Ends here
  const businessNameChange = (event) => {
    const newBusinessName = event.target.value;
    if (newBusinessName.includes(' ')) {
      setFeedback3(
        '  Business name should not contain spaces. You can use " _ "  to seprate your words, e.g test_Stores. '
      );
    } else {
      setFeedback3(null);
    }
    setBusinessName(newBusinessName);
  };
  // const storeNameChange = (event) => {
  //   setStoreName(event.target.value);
  // };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordBlur = (event) => {
    const newPassword = event.target.value;
    if (newPassword.length < 8) {
      setFeedback(
        <>
          Password must be at least 8 characters long.{' '}
          <img
            src={m}
            alt="New cover image"
            style={{ width: '7%', marginTop: '-4px' }}
          />
        </>
      );
    } else {
      setFeedback('');
    }
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
            passwordBlur={passwordBlur}
            error={error}
            emailExixts={emailExixts}
            setEmailExixts={setEmailExixts}
            phoneNumberExists={phoneNumberExists}
            setPhoneNumberExisis={setPhoneNumberExisis}
            setFeedback={setFeedback}
            feedback={feedback}
            setFeedback3={setFeedback3}
            feedback3={feedback3}
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
              setFeedback2={setFeedback}
              feedback2={feedback2}
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
                  password.length < 8 ||
                  businessName.includes(' ') ||
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
                  password.length < 8 ||
                  businessName.includes(' ') ||
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
