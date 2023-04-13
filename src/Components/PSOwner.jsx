import React,{useState,useEffect} from 'react';
import '../pages/Store/Store.css';
// import '../pages/Settings/Settings.css';
import { GoVerified } from 'react-icons/go';
import {
  doc,
  // deleteDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import moment from 'moment';
const PSOwner = () => {
   const [user, setUser] = useState({});

  const duration = moment.duration(
    moment() - moment(user?.createdAt?.toDate())
  );

  // Format the duration as a string with the appropriate units
  let formattedDuration = '';
  if (duration.asDays() < 1) {
    formattedDuration = `${Math.round(duration.asHours())}h`;
  } else if (duration.asDays() < 30) {
    formattedDuration = `${Math.round(duration.asDays())}d`;
  } else if (duration.asDays() < 365) {
    formattedDuration = `${Math.round(duration.asMonths())}m`;
  } else {
    formattedDuration = `${Math.round(duration.asYears())}y`;
  }

   useEffect(() => {
     const fetchData = async () => {
       try {
         const docRef = doc(db, 'admin', auth?.currentUser?.uid);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
           setUser(docSnap.data());
          
         }
       } catch (error) {
         console.log(error.message);
       }
     };
     fetchData();
   }, []);
  const und = user?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);
  return user ? (
    <div>
      <div className="through">
        <div className="sett mb-3">
          <div style={{ position: 'relative' }}>
            <div className="store-cover">
              <img
                src={user.adsCover || null}
                alt=""
                className="store-cover2"
              />
            </div>
          </div>
          <div className="container push-little">
            <div className="low-key">
              <div className="loo2">
                <div className="retrospect">
                  <div className="ava-wrapper2">
                    <div className="ava2">
                      {user?.businessName?.charAt(0)}.
                      {firstLetterAfterUnderscore}
                    </div>
                    <div className="fhfh2">
                      {(new Date() - user.createdAt?.toDate()) /
                        (1000 * 60 * 60 * 24 * 30) >=
                        1 && <GoVerified />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="GFly2">{user.businessName}</div>
              <div className="g-stores2">{formattedDuration} on e-market</div>
            </div>

            <div>
              <div className="oshey">
                <div className="all">All Product</div>

                <div className="oshey2">
                  <div className="row">
                    {user?.products?.map((usd) => (
                      <div className="col mb-5 d-flex justify-content-center">
                        <div>
                          <div className="wool">
                            <img
                              src={usd.imageUrls[0]}
                              alt=""
                              className="wool"
                            />
                          </div>
                          <div className="saya">
                            <div className="sweater">{usd.productName}</div>
                            <div className="off">
                              -
                              {(
                                ((usd.previousPrice - usd.currentPrice) /
                                  usd.previousPrice) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                          </div>
                          <div className="saya">
                            <div className="sweater">
                              <span>{user.storeCurrency}</span>
                              {Number(usd.currentPrice).toLocaleString()}
                            </div>
                            <div className="off2">
                              <span>{user.storeCurrency}</span>
                              {Number(usd.previousPrice).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rights">
            <hr />
            <div className="pt-2 pb-2">
              All rights reserved 2023. {user.businessName}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PSOwner;
