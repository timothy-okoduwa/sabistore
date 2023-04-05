import React, { useState } from 'react';
import '../pages/DashBoard/Dashboard.css';
import { FaCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const Table = () => {
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
    <div className="table-container">
      <div className="okokok">
        <div
          className={`agojie ${
            activeFilter === 'allProducts' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('allProducts')}
        >
          All Products
        </div>
        <div
          className={`agojie ${
            activeFilter === 'available' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('available')}
        >
          Stock available
        </div>
        <div
          className={`agojie ${
            activeFilter === 'fewUnitsLeft' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('fewUnitsLeft')}
        >
          Low on Stock
        </div>
        <div
          className={`agojie ${
            activeFilter === 'outOfStock' ? 'activevvf' : ''
          }`}
          onClick={() => handleFilterClick('outOfStock')}
        >
          Out of Stock
        </div>
      </div>
      <table className="table no-border-bottom ">
        <thead className="sctop ">
          <tr>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '28px',
              }}
            >
              S/N
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '28px',
              }}
            >
              Products
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '28px',
              }}
            >
              Last Ordered
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              Price
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '12px',
              }}
            >
              Status
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              Edit
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  paddingLeft: '28px',
                }}
              >
                {item.id}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  paddingLeft: '28px',
                }}
                className="too-many"
              >
                {item.product}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  paddingLeft: '28px',
                }}
                className="too-manyll"
              >
                {item.lastOrdered}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  // paddingLeft: '20px',
                }}
                className="too-many"
              >
                {item.Price}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  paddingLeft: '20px',
                }}
                className="too-many"
              >
                <FaCircle
                  className="mx-2"
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
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  // paddingLeft: '20px',
                  cursor:'pointer'
                }}
                className="too-many"
              >
                <MdEdit/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
