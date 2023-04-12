import React,{useState,useEffect} from 'react';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import MobileNav from '../DashBoard/MobileNav';
import NewProduct from '../../Components/NewProduct';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
const Dashboard = () => {
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
            <NewProduct/>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Dashboard;
