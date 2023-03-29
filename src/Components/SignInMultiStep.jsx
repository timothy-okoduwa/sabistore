import React,{useState} from 'react'
import SigninOTP from './SigninOTP'
import SigninPhoneNumber from './SigninPhoneNumber';
import { Link } from 'react-router-dom';
const SignInMultiStep = () => {
    const [step, setStep] = useState(1);

    const renderForm =()=>{
        switch (step){
            case 1:
            return <SigninPhoneNumber/>;
            case 2:
                return <SigninOTP />;

                default :
                return null;
        }
    }
  return (
    <div>
      <div className="multistep-form">
        {renderForm()}
        <div className="buttons" style={{ paddingRight: '23px' }}>
          {step < 2 && (
            <button
              onClick={() => setStep(step + 1)}
              className="input-submit-button mt-4 negate"
            >
              Next
            </button>
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
}

export default SignInMultiStep