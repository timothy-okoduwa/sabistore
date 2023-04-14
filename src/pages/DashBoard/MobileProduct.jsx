import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import v from '../images/vp.jpg';
import { FaCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import 'firebase/compat/firestore';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Link } from 'react-router-dom';
const MobileProduct = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'admin', auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          setData(docSnap.data());
          setFilteredData(docSnap.data().products);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(filteredData);
  const [activeFilter, setActiveFilter] = useState('allProducts');
  const [currentPage, setCurrentPage] = useState(0); // Add currentPage state variable
  const handleFilterClick = (value) => {
    let filteredProducts = [];

    if (value === 'available') {
      filteredProducts = data?.products?.filter(
        (item) => item.status.toLowerCase() === 'available'
      );
    } else if (value === 'outOfStock') {
      filteredProducts = data?.products?.filter(
        (item) => item.status.toLowerCase() === 'out of stock'
      );
    } else if (value === 'fewUnitsLeft') {
      filteredProducts = data?.products?.filter(
        (item) => item.status.toLowerCase() === 'few units left'
      );
    } else if (value === 'allProducts') {
      filteredProducts = data?.products;
    }

    console.log('updating filteredData state', filteredProducts);
    setFilteredData(filteredProducts);

    console.log('updating activeFilter state', value);
    setActiveFilter(value);
  };

  return (
    <>
      <div className="okokok2 dont-min-show">
        <div
          className={`agojie2 ${
            activeFilter === 'allProducts' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('allProducts')}
        >
          All Products
        </div>
        <div
          className={`agojie2 ${
            activeFilter === 'available' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('available')}
        >
          Stock available
        </div>
        <div
          className={`agojie2 ${
            activeFilter === 'fewUnitsLeft' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('fewUnitsLeft')}
        >
          Low on Stock
        </div>
        <div
          className={`agojie2 ${
            activeFilter === 'outOfStock' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('outOfStock')}
        >
          Out of Stock
        </div>
      </div>
      <div className="container dont-min-show pt-3">
        <div className="row">
          {filteredData?.slice(0, 8)?.map((item, index) => (
            <div
              className="col-12 col-md-6 mb-4 d-flex justify-content-center"
              key={item.id}
            >
              <div>
                <div className="image-for-mobile">
                  <img
                    src={item.imageUrls[0] || v}
                    alt=""
                    className="image-for-mobile"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="the-rest">
                  <div className="flipto">
                    <div className="name-ed">{item.productName}</div>
                    <div style={{ cursor: 'pointer' }}>
                      <Link to={`/edit/${item.productId}`}>
                        <Tooltip>
                          <IconButton>
                            <MdEdit />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </div>
                  </div>
                  <div className="too-many mt-2">
                    <FaCircle
                      style={{
                        color:
                          item.status.toLowerCase() === 'available'
                            ? '#44B700'
                            : item.status.toLowerCase() === 'few units left'
                            ? '#FF7777'
                            : item.status.toLowerCase() === 'out of stock'
                            ? '#AAAAAA'
                            : '#44B700',
                      }}
                    />{' '}
                    <span
                      style={{
                        color:
                          item.status.toLowerCase() === 'available'
                            ? '#44B700'
                            : item.status.toLowerCase() === 'few units left'
                            ? '#FF7777'
                            : item.status.toLowerCase() === 'out of stock'
                            ? '#AAAAAA'
                            : '#44B700',
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div>
                    <div className="currency mt-2">
                      {data.storeCurrency}{' '}
                      {Number(item.currentPrice).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileProduct;
