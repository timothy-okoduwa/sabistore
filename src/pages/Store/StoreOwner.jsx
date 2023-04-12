import React,{useState,useEffect} from 'react';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import PSOwner from '../../Components/PSOwner';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
const StoreOwner = () => {
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
      <div>
        <HeadAndSide user={user}/>
        <div className="pidgon ">
          <div className="container">
            <PSOwner />
          </div>
        </div>
        <MobileNav />
      </div>
    </div>
  );
};

export default StoreOwner;
