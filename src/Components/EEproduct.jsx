import React, { useState, useEffect } from 'react';
import '../pages/AddProduct/AddProduct.css';
import CircularProgress from '@mui/material/CircularProgress';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
const EEproduct = ({ productId }) => {
  const [business, setBusiness] = useState(null);
  const [product, setProduct] = useState({
    productName: '',
    currentPrice: '',
    previousPrice: '',
    status: '',
    condition: '',
    color: '',
    category: '',
    productDescription: '',
    size: '',
  });
  const [info, setInfo] = useState({
    loading: false,
  });
  const navigate = useNavigate();
  const { loading } = info;
  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, 'admin', auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);
        const businessData = docSnap.data();
        const products = businessData.products;
        const product = products.find(
          (product) => product.productId === productId
        );
        console.log(product); // Add this line to check if the product state is being set
        setProduct(product || {});
        setBusiness(businessData || {});
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [db, auth, productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInfo({ ...info, error: null, loading: true });

    try {
      const docRef = doc(db, 'admin', auth?.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      const businessData = docSnap.data();
      const products = businessData.products;
      const newProducts = products.map((p) =>
        p.productId === productId ? product : p
      );
      await updateDoc(docRef, { products: newProducts });
      // show success message
    } catch (error) {
      console.error(error);
      // show error message
    }
    navigate('/dashboard');
  };

  const handleProductNameChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      productName: event.target.value,
    }));
  };
  const handlecurrentPriceChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      currentPrice: event.target.value,
    }));
  };
  const handlepreviousPriceChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      previousPrice: event.target.value,
    }));
  };
  const handlestatusChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };
  const handleconditionChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      condition: event.target.value,
    }));
  };
  const handlecolorChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      color: event.target.value,
    }));
  };
  const handlecategoryChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };
  const handleproductDescriptionChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      productDescription: event.target.value,
    }));
  };
  const handlesizeChange = (event) => {
    setProduct((prevState) => ({
      ...prevState,
      size: event.target.value,
    }));
  };

  return product ? (
    <div className="through mt-5">
      <div>
        <div className="borer container">
          <div className="new-product">New Product</div>
          <div className="conc mt-4 ">
            <div className="prod-det mt-4">Product Details</div>
            <div className="row mt-4">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Product Name</div>
                  <input
                    className="yesss"
                    type="text"
                    placeholder="Product Name"
                    defaultValue={product.productName}
                    onChange={handleProductNameChange}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Category</div>
                  <select
                    className="yesss"
                    defaultValue={product.category}
                    onChange={handlecategoryChange}
                  >
                    <option value="">Category</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="Home & Office">Home & Office</option>
                    <option value="Phones & Tablets">Phones & Tablets</option>
                    <option value="Computing">Computing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Baby Products">Baby Products</option>
                    <option value="Sporting Goods ">Sporting Goods </option>
                    <option value="Automobile">Automobile</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Book">Book</option>
                    <option value="Movie">Movie</option>
                    <option value="Music">Music</option>
                    <option value="Musical Instrument">
                      Musical Instrument
                    </option>
                    <option value="Pet Supplies">Pet Supplies</option>
                    <option value="Others..">Others..</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="a34">Product Description</div>
              <textarea
                name="Enter Product Description"
                id=""
                placeholder="Enter Product Description"
                rows="8"
                className="keep-on"
                defaultValue={product.productDescription}
                onChange={handleproductDescriptionChange}
              />
            </div>
            <div className="mt-3">
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Previous Price</div>
                    <input
                      className="yesss"
                      type="number"
                      placeholder="Price"
                      defaultValue={product.previousPrice}
                      onChange={handlepreviousPriceChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Current Price</div>
                    <input
                      className="yesss"
                      type="number"
                      placeholder="Price"
                      defaultValue={product.currentPrice}
                      onChange={handlecurrentPriceChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="borer container brilliant">
          <div className="conc mt-4 ">
            <div className="prod-det mt-4">Other Details</div>
            <div className="row mt-4">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Product Colour</div>
                  <input
                    className="yesss"
                    type="text"
                    placeholder="Product Colour"
                    defaultValue={product.color}
                    onChange={handlecolorChange}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Product Size</div>
                  <select
                    className="yesss"
                    defaultValue={product.size}
                    onChange={handlesizeChange}
                  >
                    <option value="">Product Size</option>
                    <option value="SM">SM</option>
                    <option value="MD">MD</option>
                    <option value="LG">LG</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Product Status</div>
                    <select
                      className="yesss"
                      defaultValue={product.status}
                      onChange={handlestatusChange}
                    >
                      <option value="">Product Status</option>
                      <option value="Available"> Available</option>
                      <option value="Out of Stock"> Out of Stock</option>
                      <option value="Few units left"> Few units left</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Condition of Product</div>
                    <select
                      className="yesss"
                      defaultValue={product.condition}
                      onChange={handleconditionChange}
                    >
                      <option value="">Condition of Product</option>
                      <option value="Brand New">Brand New</option>
                      <option value="Fairly Used">Fairly Used</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" brilliant woww">
          <div>
            <button className="save" onClick={handleSubmit}>
              {loading ? (
                <CircularProgress style={{ width: '25px', height: '25px',color:'white' }} />
              ) : (
                'Update '
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EEproduct;
