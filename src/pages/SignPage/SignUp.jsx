import React from 'react';
import './Sign.css';
import l from '../images/left.png'
import l2 from '../images/left2.png'
import l3 from '../images/left3.png'
import l4 from '../images/left4.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const SignUp = () => {
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6">
              <Carousel autoPlay="true" infiniteLoop='true'>
                <div className="slider-for-description">
                  <div>
                    <img src={l} alt="" className="image-size" />
                  </div>
                  <div className="write-up-under-image">
                    Bring your <span className="store">“Store”</span> to life
                  </div>
                </div>
                <div className="slider-for-description2">
                  <div>
                    <img src={l2} alt="" className="image-size" />
                  </div>
                  <div className="write-up-under-image">
                    Bring your <span className="store2">“Store”</span> to life
                  </div>
                </div>
                <div className="slider-for-description3">
                  <div>
                    <img src={l3} alt="" className="image-size3" />
                  </div>
                  <div className="write-up-under-image2">
                    Bring your <span className="store3">“Store”</span> to life
                  </div>
                </div>
                <div className="slider-for-description4">
                  <div>
                    <img src={l4} alt="" className="image-size3" />
                  </div>
                  <div className="write-up-under-image2">
                    Bring your <span className="store4">“Store”</span> to life
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="col-12 col-sm-6 bg-secondary">gjgu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
