import React, { useState, useEffect } from 'react';
import '../pages/Store/Store.css';
import { GoVerified } from 'react-icons/go';
import { useParams, useNavigate } from 'react-router-dom';
import { BsFillCircleFill, BsFacebook } from 'react-icons/bs';
import { FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import v from './images/vp.jpg';
const SDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [business, setBusiness] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const duration = moment.duration(
    moment() - moment(business?.createdAt?.toDate())
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

  const move = () => {
    navigate(`/${business.businessName}`);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'admin'));
        querySnapshot.forEach((doc) => {
          const businessData = doc.data();
          const products = businessData.products;
          const product = products?.find(
            (product) => product.productId === productId
          );
          if (product) {
            console.log(product); // Add this line to check if the product state is being set
            setProduct(product || {});
            setBusiness(businessData || {});
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [db, productId]);
  const und = business?.businessName;
  const underscoreIndex = und?.indexOf('_');
  const firstLetterAfterUnderscore = und?.charAt(underscoreIndex + 1);
  return product ? (
    <div>
      <div>
        <div>
          <div>
            <div className="container mt-5 mb-5">
              <div className="bord">
                <div className="container">
                  <div className="wrong">
                    <div className="mb-4">
                      <div className="ava-wrapper2">
                        <div className="ava2">
                          {business?.businessName?.charAt(0)}.
                          {firstLetterAfterUnderscore}
                        </div>
                        <div className="fhfh2">
                          {(new Date() - business?.createdAt?.toDate()) /
                            (1000 * 60 * 60 * 24 * 30) >=
                            1 && <GoVerified />}
                        </div>
                      </div>
                      <span className="emp">{business?.businessName}</span>
                    </div>
                    <div>
                      <button className="go-back" onClick={move}>
                        Go back to {business?.businessName} store
                      </button>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="row">
                      <div className="col-12 col-lg-6 mb-5">
                        <div className="longth">
                          <div className="btight">
                            <Carousel interval={null}>
                              {product.imageUrls &&
                                product.imageUrls.map((url, index) => (
                                  <Carousel.Item key={index}>
                                    <img
                                      className="d-block w-100 btight"
                                      src={url || v}
                                      alt={`Slide ${index}`}
                                    />
                                  </Carousel.Item>
                                ))}
                            </Carousel>
                          </div>
                          <div className="hfhfd">
                            {product.imageUrls &&
                              product.imageUrls.map((url, index) => (
                                <div className="boxes">
                                  <img
                                    className="d-block w-100 boxes "
                                    src={url || v}
                                    alt="First slide"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div>
                          <div>
                            <div className="wools">{product.productName}</div>
                            <div>
                              <span className="person">
                                <span className="nar">
                                  {business.storeCurrency}
                                </span>
                                {Number(
                                  product?.currentPrice
                                )?.toLocaleString()}
                              </span>
                              <span className="mx-3 packa">
                                <span>{business.storeCurrency}</span>
                                {Number(
                                  product?.previousPrice
                                )?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 spi">
                            <div
                              className="aval"
                              style={{
                                color:
                                  product.status.toLowerCase() === 'available'
                                    ? '#44B700'
                                    : product.status.toLowerCase() ===
                                      'few units left'
                                    ? '#FF7777'
                                    : product.status.toLowerCase() ===
                                      'out of stock'
                                    ? '#AAAAAA'
                                    : '#44B700',
                                background:
                                  product.status.toLowerCase() === 'available'
                                    ? '#43b70037'
                                    : product.status.toLowerCase() ===
                                      'few units left'
                                    ? '#ff777744'
                                    : product.status.toLowerCase() ===
                                      'out of stock'
                                    ? '#aaaaaa33'
                                    : '#43b7002c',
                              }}
                            >
                              {' '}
                              <BsFillCircleFill
                                style={{
                                  color:
                                    product.status.toLowerCase() === 'available'
                                      ? '#44B700'
                                      : product.status.toLowerCase() ===
                                        'few units left'
                                      ? '#FF7777'
                                      : product.status.toLowerCase() ===
                                        'out of stock'
                                      ? '#AAAAAA'
                                      : '#44B700',
                                }}
                              />
                              {product.status}
                            </div>
                            <div className="aval2 mx-4">
                              {' '}
                              <BsFillCircleFill />
                              {product.condition}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="prd">Product Description</div>
                            <div className="descv">
                              {product.productDescription}
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="prd">Size</div>
                            <div className="descv2">
                              <div
                                className="oiu"
                                style={{
                                  background:
                                    product.size.toLowerCase() === 's'
                                      ? '#44B700'
                                      : '#e7e7e7',
                                }}
                              >
                                S
                              </div>
                              <div
                                className="oiu"
                                style={{
                                  background:
                                    product.size.toLowerCase() === 'm'
                                      ? '#44B700'
                                      : '#e7e7e7',
                                }}
                              >
                                M
                              </div>
                              <div
                                className="oiu"
                                style={{
                                  background:
                                    product.size.toLowerCase() === 'l'
                                      ? '#44B700'
                                      : '#e7e7e7',
                                }}
                              >
                                L
                              </div>
                              <div
                                className="oiu"
                                style={{
                                  background:
                                    product.size.toLowerCase() === 'xl'
                                      ? '#44B700'
                                      : '#e7e7e7',
                                }}
                              >
                                XL
                              </div>
                              <div
                                className="oiu"
                                style={{
                                  background:
                                    product.size.toLowerCase() === 'xxl'
                                      ? '#44B700'
                                      : '#e7e7e7',
                                }}
                              >
                                XXL
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <a
                              href={`https://api.whatsapp.com/send?phone=${business.phoneNumber}&text=Hi%20*${business.businessName}*%20i%20would%20like%20to%20purchase%20*${product.productName}*%20from%20your%20store`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ textDecoration: 'none' }}
                            >
                              <button className="order">Order Now</button>
                            </a>
                          </div>
                          <div className="mt-4">
                            <div className="prd">Share</div>
                            <div className="descv2">
                              <div>
                                <BsFacebook className=" manyfb" />
                              </div>
                              <div>
                                <FaInstagramSquare className=" manyfb2" />
                              </div>
                              <div>
                                <FaWhatsappSquare className=" manyfb3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="rights">
                    <hr />
                    <div className="pt-2 pb-2">
                      © All rights reserved {currentYear}.{' '}
                      {business?.businessName} stores
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SDetails;
