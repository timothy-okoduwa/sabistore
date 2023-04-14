import React, { useState, useEffect } from 'react';
import './EditPro.css';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import EEproduct from '../../Components/EEproduct';
import { useParams } from 'react-router-dom';
const EditPro = () => {
      const { productId } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, 'admin', auth?.currentUser?.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  }, []);
  return (
    <div>
      <HeadAndSide user={user} />
      <div className="pidgon ">
        <div className="container">
          <div>
           <EEproduct productId={productId}/>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default EditPro;
