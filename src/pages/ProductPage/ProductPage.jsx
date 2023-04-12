import React,{useState,useEffect} from 'react';
import HeadAndSide from '../DashBoard/HeadAndSide';
import '../DashBoard/Dashboard.css';
import './ProductPage.css';
import PwelcomeProp from '../../Components/PwelcomeProp';
import MobileNav from '../DashBoard/MobileNav';
import ProdEList from '../../Components/ProdEList';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
const ProductPage = () => {
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
        <div className="container ">
          <PwelcomeProp user={user} />
          <ProdEList />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default ProductPage;
