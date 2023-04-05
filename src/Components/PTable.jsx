import React, { useState } from 'react';
import '../pages/DashBoard/Dashboard.css';
import { FaCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HiFolderDownload } from 'react-icons/hi';
// export const handleDownload = (data) => {
//   const doc = new jsPDF();
//   const tableRows = [];
//   const headers = ['ID', 'Product', 'Last Ordered', 'Price', 'Status'];
//   const dataArray = Object.values(data); // convert object to array
//   dataArray.forEach((item) => {
//     const dataRow = [
//       item.id,
//       item.product,
//       item.lastOrdered,
//       item.Price,
//       item.status,
//     ];
//     tableRows.push(dataRow);
//   });
//   doc.autoTable({
//     head: [headers],
//     body: tableRows,
//   });
//   doc.save('product-list.pdf');
// };

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
    {
      id: 6,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 7,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 8,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 9,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 10,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 11,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
    {
      id: 12,
      product: 'Women Chanel Hand Bag ',
      lastOrdered: '10/03/2023',
      Price: '12,000',
      status: 'Available',
    },
  ]);

  const [data, setData] = useState(originalData);
  const handleDownload = () => {
    const doc = new jsPDF();
    const tableRows = [];
    const headers = ['ID', 'Product', 'Last Ordered', 'Price', 'Status'];
    const dataArray = Object.values(data); // convert object to array
    dataArray.forEach((item) => {
      const dataRow = [
        item.id,
        item.product,
        item.lastOrdered,
        item.Price,
        item.status,
      ];
      tableRows.push(dataRow);
    });
    doc.autoTable({
      head: [headers],
      body: tableRows,
    });
    doc.save('product-list.pdf');
  };

  const [activeFilter, setActiveFilter] = useState('allProducts');
  const [currentPage, setCurrentPage] = useState(0); // Add currentPage state variable
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
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 8;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <button className="download-folder" onClick={handleDownload}>
          Download List <HiFolderDownload className="folder" />
        </button>
      </div>

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
            {currentData.map((item) => (
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
                  >
                    {item.status}
                  </span>
                </td>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    // paddingLeft: '20px',
                    cursor: 'pointer',
                  }}
                  className="too-many"
                >
                  <MdEdit />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="wrongs"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            previousLabel="<"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            nextLabel=">"
            disabledClassName="disabledd"
          />
        </div>
      </div>
    </>
  );
};

export default Table;
