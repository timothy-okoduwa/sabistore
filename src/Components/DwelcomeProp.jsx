import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from 'react-icons/bs';
const DwelcomeProp = ({ user }) => {
  const navigate = useNavigate();
  const move = () => {
    navigate('/cus');
  };
  return user ? (
    <div className="down-a-bit">
      <div className="switch-up container">
        <div>
          <div className="store-name mb-3">
            Welcome, {user?.businessName}{' '}
            <BsFillCircleFill
              style={{
                fontSize: '12px',
                color: user?.online ? '#44b700' : '#FF7777',
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <button className="preview-store-button" onClick={move}>
              Preview Store
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DwelcomeProp;
