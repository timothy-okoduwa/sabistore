import React from 'react';
import '../pages/Store/Store.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import b from './images/buyjare.svg'
import { useNavigate } from 'react-router-dom';
const CusNavBar = () => {
     const navigate = useNavigate();
     const move = () => {
       navigate('/dashboard');
     };
  return (
    <div>
      <Navbar  expand="lg" className='chill'>
        <Container>
          <Navbar.Brand>
            <img src={b} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="full-g">
              <div className="full-g">
                <div>
                  <button className="About">About GFly</button>
                </div>
                <div>
                  <button className="sell" onClick={move}>Sell with us</button>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CusNavBar;
