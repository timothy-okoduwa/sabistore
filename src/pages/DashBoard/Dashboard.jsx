import React,{useState,useEffect} from 'react';
import HeadAndSide from './HeadAndSide';
import './Dashboard.css';
import DwelcomeProp from '../../Components/DwelcomeProp';
import Danalytics from '../../Components/Danalytics';
import MultiSetUpGuide from '../../Components/MultiSetUpGuide';
import MobileNav from './MobileNav';
import { getDoc, doc,updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
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
const navigate=useNavigate()
    const handleLogout = async () => {
      const auth = getAuth();
      try {
        // Update the online status to false in the Firestore database
        const docRef = doc(db, 'admin', auth.currentUser.uid);
        await updateDoc(docRef, { online: false });

        // Sign out the user
        await auth.signOut();

        // Redirect to the login page
        navigate('/signin');
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div>
      <HeadAndSide user={user} handleLogout={handleLogout} />
      <div className="pidgon ">
        <div className="container">
          <DwelcomeProp user={user} />
          <Danalytics user={user} />
          <MultiSetUpGuide />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
