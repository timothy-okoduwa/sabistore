import React, { useState } from 'react';
import './Dashboard.css';
import b from '../images/buyjare.svg';
import c from '../images/SideAds.png';
import { RxDashboard } from 'react-icons/rx';
import { GiPapers } from 'react-icons/gi';
import { FaStore } from 'react-icons/fa';
import { RiSettings4Fill, RiLogoutBoxLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
const HeadAndSide = ({ user, handleLogout }) => {
  const [showHidden, setShowHidden] = useState(false);

  const handleInitialsClick = () => {
    setShowHidden((prevState) => !prevState);
  };
  const und = user?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);

  return (
    <div>
      <div className="static">
        <div className="header-jam">
          <div className="container text-holder-header">
            <div className="flex-up-header">
              <div>
                <div style={{ display: 'flex' }}>
                  <div>
                    <div className="initials" onClick={handleInitialsClick}>
                      {user?.businessName?.charAt(0)}.
                      {firstLetterAfterUnderscore}
                    </div>{' '}
                    <div>
                      {showHidden && (
                        <div className="hidden">
                          <div>
                            <div>
                              <div>
                                <div className="got-u" onClick={handleLogout}>
                                  <RiLogoutBoxLine className="color11" />
                                  <span className="link-name11"> Log Out</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="name-itself">{user?.businessName}</div>
                </div>
              </div>

              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <div className="side-bar">
          <div className="">
            <div className="logo-jolder mb-2">
              <img src={b} alt="picss" className="logo-style" />
            </div>
            <div className="cezer-roller">
              <div className="push-down-a-bit">
                <NavLink to="/dashboard" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <RxDashboard className="color" />
                      <span className="link-name"> Dashboard</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink to="/productpage" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <GiPapers className="color" />
                      <span className="link-name"> Product page</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink to="/store" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <FaStore className="color" />
                      <span className="link-name"> Store</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink to="/settings" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <RiSettings4Fill className="color" />
                      <span className="link-name"> Settings</span>
                    </div>
                  </div>
                </NavLink>
              </div>

              <div className="for-ads push-down-a-bit container">
                <img src={c} alt="picss" className="for-ads" />
              </div>
              <div className="push-down-a-bit logout-push"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadAndSide;
