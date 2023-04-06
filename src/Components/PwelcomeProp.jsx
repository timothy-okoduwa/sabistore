import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import { HiFolderDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
const DwelcomeProp = () => {
  const navigate = useNavigate()
  const move=()=>{
    navigate('/addproduct')
  }
  return (
    <div className="down-a-bit">
      <div className="switch-up container">
        <div>
          <div className="store-name mb-3">Welcome, Tech_Hub</div>
        </div>
        <div>
          
          <div>
            <button className="preview-store-button2" onClick={move}>Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DwelcomeProp;
