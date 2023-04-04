import React,{useState} from 'react';
import './Dashboard.css';
import v from '../images/vp.jpg';
import { FaCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
const MobileProduct = () => {
      const [originalData, setOriginalData] = useState([
        {
          id: 1,
          product: 'Women Chanel Hand Bag ',
          lastOrdered: '10/03/2023',
          Price: '22,000',
          status: 'Available',
        },
        {
          id: 2,
          product: 'Gucci Cloth',
          lastOrdered: '02/05/2023',
          Price: '5,000',
          status: 'Available',
        },
        {
          id: 3,
          product: 'Apple Watch',
          lastOrdered: '31/10/2023',
          Price: '10,000',
          status: 'Out of Stock',
        },
        {
          id: 4,
          product: 'Apple Watch',
          lastOrdered: '28/11/2023',
          Price: '3,000',
          status: 'Few units left',
        },
        {
          id: 5,
          product: 'Women Chanel Hand Bag ',
          lastOrdered: '10/03/2023',
          Price: '12,000',
          status: 'Available',
        },
      ]);
       const [data, setData] = useState(originalData);
       const [activeFilter, setActiveFilter] = useState('allProducts');
       const handleFilterClick = (value) => {
         if (value === 'available') {
           const filteredData = originalData.filter(
             (item) => item.status.toLowerCase() === 'available'
           );
           setData(filteredData);
         } else if (value === 'outOfStock') {
           const filteredData = originalData.filter(
             (item) => item.status.toLowerCase() === 'out of stock'
           );
           setData(filteredData);
         } else if (value === 'fewUnitsLeft') {
           const filteredData = originalData.filter(
             (item) => item.status.toLowerCase() === 'few units left'
           );
           setData(filteredData);
         } else if (value === 'allProducts') {
           setData(originalData);
         }
         setActiveFilter(value);
       };
  return (
    <>
      <div className="okokok2">
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
          {data.map((item) => (
            <div
              className="col-12 col-md-6 mb-4 d-flex justify-content-center"
              key={item.id}
            >
              <div>
                <div className="image-for-mobile">
                  <img src={v} alt="" className="image-for-mobile" />
                </div>
                <div className="the-rest">
                  <div className="flipto">
                    <div className="name-ed">{item.product}</div>
                    <div style={{ cursor: 'pointer' }}>
                      <MdEdit />
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
                    <div className="currency mt-2">₦ {item.Price}</div>
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
