import React, { useState, useEffect } from 'react';
import CusNavBar from './CusNavBar';
import { GoVerified } from 'react-icons/go';
import s from './images/side.png';
import { useParams, Link } from 'react-router-dom';
import { BsFillCircleFill } from 'react-icons/bs';
import { db } from '../firebase';
import { getDocs, where, query, collection } from 'firebase/firestore';
import moment from 'moment';
const PSCustomer = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { busName } = useParams();
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
    setCurrentYear(new Date().getFullYear());
  }, []);

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
        const products = docSnap.data().products.map((product) => {
          return {
            ...product,
            businessName: docSnap.data().businessName,
          };
        });
        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [db, busName]);

  const und = user?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);

  return user ? (
    <div>
      <CusNavBar />
      <div className="container">
        <div className="through mt-5">
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
              <div className="okokok">
                <div className="low-key ">
                  <div className="loo2">
                    <div className="retrospect">
                      <div className="ava-wrapper2">
                        <div className="ava2">
                          {user?.businessName?.charAt(0)}.
                          {firstLetterAfterUnderscore}
                        </div>
                        <div className="fhfh2">
                          {(user.businessName === 'Tech_Hub' ||
                            (user.createdAt &&
                              (new Date() - user.createdAt.toDate()) /
                                (1000 * 60 * 60 * 24 * 30) >=
                                1)) && <GoVerified />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="define">
                    <div className="GFly2">{user?.businessName} </div>
                    <div className="mx-2 mt-2">
                      {' '}
                      <BsFillCircleFill
                        style={{
                          fontSize: '12px',
                          color: user?.online ? '#44b700' : '#FF7777',
                        }}
                      />
                    </div>
                  </div>

                  <div className="g-stores2">
                    {formattedDuration} on e-market
                  </div>
                </div>
                <div className="Adss">
                  <img src={s} alt="" className="Adss" />
                </div>
              </div>

              <div className="oshey">
                <div className="all">All Product</div>

                <div className="oshey2">
                  <div className="row">
                    {products?.map((prod) => (
                      <div className="col mb-5 d-flex justify-content-center">
                        <Link
                          to={`/${user.businessName}/${prod.productId}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div>
                            <div className="wool">
                              <img
                                src={prod?.imageUrls[0]}
                                alt=""
                                className="wool"
                              />
                            </div>
                            <div className="saya">
                              <div className="sweater">{prod?.productName}</div>
                              {prod?.previousPrice && (
                                <div className="off">
                                  -
                                  {(
                                    ((prod?.previousPrice - prod?.currentPrice) /
                                      prod?.previousPrice) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </div>
                              )}
                            </div>
                            <div className="saya">
                              <div className="sweater">
                                <span>{user.storeCurrency}</span>
                                {Number(prod?.currentPrice)?.toLocaleString()}
                              </div>
                              <div className="off2">
                                <span>{user?.storeCurrency}</span>
                                {Number(prod?.previousPrice)?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rights">
              <hr />
              <div className="pt-2 pb-2">
                ©  All rights reserved {currentYear}. {user.businessName} stores
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PSCustomer;
