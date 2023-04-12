import React,{useState,useEffect} from 'react';
import HeadAndSide from './HeadAndSide';
import './Dashboard.css';
import DwelcomeProp from '../../Components/DwelcomeProp';
import Danalytics from '../../Components/Danalytics';
import MultiSetUpGuide from '../../Components/MultiSetUpGuide';
import MobileNav from './MobileNav';
import { getDoc, doc } from 'firebase/firestore';
import { db,auth } from '../../firebase';
const Dashboard = () => {
  const [user, setUser]=useState()
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
          <DwelcomeProp user={user} />
          <Danalytics />
          <MultiSetUpGuide />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
