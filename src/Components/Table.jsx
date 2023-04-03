import React from 'react';
import '../pages/DashBoard/Dashboard.css';
import { FaCircle } from 'react-icons/fa';
const data = [
  {
    id: 1,
    product: 'Women Chanel Hand Bag ',
    lastOrdered: '10/03/2023',
    sales: 22,
    status: 'Avaliable',
  },
  {
    id: 2,
    product: 'Gucci Cloth',
    lastOrdered: '02/05/2023',
    sales: 5,
    status: 'Avaliable',
  },
  {
    id: 3,
    product: 'Apple Watch',
    lastOrdered: '31/10/2023',
    sales: 10,
    status: 'Out of Stock',
  },
  {
    id: 4,
    product: 'Apple Watch',
    lastOrdered: '28/11/2023',
    sales: 3,
    status: 'Few units left',
  },
  {
    id: 5,
    product: 'Women Chanel Hand Bag ',
    lastOrdered: '10/03/2023',
    sales: 12,
    status: 'Avaliable',
  },
];

const Table = () => {
  return (
    <div className="table-container">
      <table className="table no-border-bottom ">
        <thead className="sctop ">
          <tr>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
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
              Sales
            </th>
            <th
              scope="col"
              style={{
                background: '#F8FBFC',
                paddingTop: '20px',
                paddingBottom: '20px',
              }}
            >
              Status
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
                }}
              >
                {item.id}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
                className="too-many"
              >
                {item.product}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
                className="too-many"
              >
                {item.lastOrdered}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
                className="too-many"
              >
                {item.sales}
              </td>
              <td
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
