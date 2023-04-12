import React,{useState,useEffect} from 'react'
import './Settings.css';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import OwnerSettings from '../../Components/OwnerSettings';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
const Settings = () => {
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
           <OwnerSettings/>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

export default Settings