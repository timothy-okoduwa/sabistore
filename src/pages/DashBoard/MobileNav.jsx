import React from 'react';
import './Dashboard.css';
import { RxDashboard } from 'react-icons/rx';
import { GiPapers } from 'react-icons/gi';
import { FaStore } from 'react-icons/fa';
import { RiSettings4Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
function MobileNav() {
  return (
    <div className="badddd">
      <div className="wibdow">
        <div className="truss">
          <NavLink to="/dashboard" className="Link">
            <div>
              <RxDashboard className="color22 mb-2" />
            </div>
            <div className="textd">Dashboard</div>
          </NavLink>
        </div>
        <div className="truss">
          {' '}
          <NavLink to="/productpage" className="Link">
            <div>
              {' '}
              <GiPapers className="color22 mb-2" />
            </div>
            <div className="textd">Product page</div>
          </NavLink>
        </div>
        <div className="truss">
          {' '}
          <div>
            {' '}
            <FaStore className="color mb-2" />
          </div>
          <div className="textd">Store</div>
        </div>
        <div className="truss">
          <NavLink to="/settings" className="Link">
            {' '}
            <div>
              <RiSettings4Fill className="color mb-2" />
            </div>
            <div className="textd">Settings</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
