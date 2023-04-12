import React from 'react'
import CusNavBar from './CusNavBar'
import { GoVerified } from 'react-icons/go';
import s from './images/side.png'

const PSCustomer = () => {
 
  return (
    <div>
      <CusNavBar />
      <div className="container">
        <div className="through mt-5">
          <div className="sett mb-3">
            <div style={{ position: 'relative' }}>
              <div className="store-cover"></div>
            </div>
            <div className="container push-little">
              <div className="okokok">
                <div className="low-key ">
                  <div className="loo2">
                    <div className="retrospect">
                      <div className="ava-wrapper2">
                        <div className="ava2">TH</div>
                        <div className="fhfh2">
                          <GoVerified />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="GFly2">GFly</div>
                  <div className="g-stores2">gfly_stores</div>
                </div>
                <div className="Adss">
                  <img src={s} alt="" className="Adss" />
                </div>
              </div>

              <div className="oshey">
                <div className="all">All Product</div>

                <div className="oshey2">
                  <div className="row">
                    <div className="col mb-5 d-flex justify-content-center">
                      <div>
                        <div className="wool"></div>
                        <div className="saya">
                          <div className="sweater">Wool Sweater</div>
                          <div className="off">-70%</div>
                        </div>
                        <div className="saya">
                          <div className="sweater">
                            <span>₦</span>5,000
                          </div>
                          <div className="off2">
                            <span>₦</span> 15,000
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mb-5 d-flex justify-content-center">
                      <div>
                        <div className="wool"></div>
                        <div className="saya">
                          <div className="sweater">Wool Sweater</div>
                          <div className="off">-70%</div>
                        </div>
                        <div className="saya">
                          <div className="sweater">
                            <span>₦</span>5,000
                          </div>
                          <div className="off2">
                            <span>₦</span> 15,000
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mb-5 d-flex justify-content-center">
                      <div>
                        <div className="wool"></div>
                        <div className="saya">
                          <div className="sweater">Wool Sweater</div>
                          <div className="off">-70%</div>
                        </div>
                        <div className="saya">
                          <div className="sweater">
                            <span>₦</span>5,000
                          </div>
                          <div className="off2">
                            <span>₦</span> 15,000
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col mb-5 d-flex justify-content-center">
                      <div>
                        <div className="wool"></div>
                        <div className="saya">
                          <div className="sweater">Wool Sweater</div>
                          <div className="off">-70%</div>
                        </div>
                        <div className="saya">
                          <div className="sweater">
                            <span>₦</span>5,000
                          </div>
                          <div className="off2">
                            <span>₦</span> 15,000
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rights">
              <hr />
              <div className="pt-2 pb-2">
                All rights reserved 2023. gfly_stores
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PSCustomer