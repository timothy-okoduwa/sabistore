import React, { useState, useEffect } from 'react';
import '../pages/DashBoard/Dashboard.css';
import { FaCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HiFolderDownload } from 'react-icons/hi';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import 'firebase/compat/firestore';
import {
  doc,
  // deleteDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Link } from 'react-router-dom';
const Table = () => {
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

  // console.log(data?.products);
  const handleDownload = () => {
    const doc = new jsPDF();
    const tableRows = [];
    const headers = [
      'ID',
      'Product',
      'Date Added',
      'Price',
      'Status',
      'Category',
      'Previous Price',
      'Status',
      'Product ID',
    ];
    const dataArray = Object.values(data?.products); // convert object to array
    dataArray.forEach((item, index) => {
      const dataRow = [
        index + 1,
        item?.productName,
        item?.dateAdded?.toDate()?.toLocaleString(),
        item?.currentPrice,
        item?.status,
        item?.category,
        item?.previousPrice,

        item?.status,
        item?.productId?.substring(0, 6),
      ];
      tableRows.push(dataRow);
    });
    const formattedHeaders = [
      'ID',
      'Product',
      'Date Added',
      'Price',
      'Status',
      'Category',
      'Previous Price',
      'Status',
      'Product ID',
    ];
    doc.autoTable({
      head: [formattedHeaders],
      body: tableRows,
    });
    doc.save('product-list.pdf');
  };

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
        (item) => item?.status?.toLowerCase() === 'out of stock'
      );
    } else if (value === 'fewUnitsLeft') {
      filteredProducts = data?.products?.filter(
        (item) => item?.status?.toLowerCase() === 'few units left'
      );
    } else if (value === 'allProducts') {
      filteredProducts = data?.products;
    }

    console.log('updating filteredData state', filteredProducts);
    setFilteredData(filteredProducts);

    console.log('updating activeFilter state', value);
    setActiveFilter(value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 8;
  const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData?.slice(startIndex, endIndex);

  return (
    <>
      <div className="table-container">
        <div className=" letsse">
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
          <div className="" style={{ marginRight: '6px' }}>
            <button className="download-folder" onClick={handleDownload}>
              Download List <HiFolderDownload className="folder" />
            </button>
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
                Date Added
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
            {currentData?.slice(0, 8)?.map((item, index) => (
              <tr key={item.id}>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '28px',
                  }}
                  className="too-manyll"
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '28px',
                  }}
                  className="too-manyll"
                >
                  {item.productName}
                </td>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '28px',
                  }}
                  className="too-manyll"
                >
                  {new Date(item?.dateAdded?.toDate()).toLocaleString('en-US', {
                    timeZone: 'UTC',
                    hour12: true,
                  })}
                </td>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    // paddingLeft: '20px',
                  }}
                  className="too-manyll"
                >
                  {data.storeCurrency}{' '}
                  {Number(item.currentPrice).toLocaleString()}
                </td>
                <td
                  style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                  }}
                  className="too-manyll"
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
                  <Link to={`/edit/${item.productId}`}>
                    <Tooltip>
                      <IconButton>
                        <MdEdit />
                      </IconButton>
                    </Tooltip>
                  </Link>
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
