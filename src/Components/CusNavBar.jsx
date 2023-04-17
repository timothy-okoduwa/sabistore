import React, { useState, useEffect } from 'react';
import '../pages/Store/Store.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import b from './images/buyjare.svg';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, where, query, collection } from 'firebase/firestore';
const CusNavBar = () => {
  const { busName } = useParams();
  const [user, setUser] = useState(null);
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const move = () => {
    navigate('/dashboard');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = collection(db, 'admin');
        const querySnapshot = await getDocs(
          query(userDocRef, where('businessName', '==', busName))
        );

        if (querySnapshot.docs.length === 0) {
          console.log('No matching documents.');
          return;
        }

        const docSnap = querySnapshot.docs[0];
        setUser(docSnap.data());

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [db, busName]);
  return user ? (
    <div>
      <Navbar expand="lg" className="chill">
        <Container>
          <Navbar.Brand>
            <img src={b} alt="" onClick={move} style={{ cursor: 'pointer' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="full-g">
              <div className="full-g">
                <div>
                  <button className="About">About {user.businessName}</button>
                </div>
                <div>
                  <button className="sell" onClick={move}>
                    Sell with us
                  </button>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  ) : null;
};

export default CusNavBar;
