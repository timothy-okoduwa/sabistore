import React, { useState, useEffect } from 'react';
import '../pages/AddProduct/AddProduct.css';
import { MdCancel } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
const NewProduct = () => {
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [condition, setCondition] = useState('');
  const [info, setInfo] = useState({ error: null, loading: false });

  const { loading } = info;
  const navigate = useNavigate();
  const uploadProduct = async () => {
    setInfo({ ...info, error: null, loading: true });

    setIsButtonClicked(true);
    // Generate a unique ID for the product and image folders
    const uuid = uuidv4();

    const images = [];
    const uploadTasks = [];

    for (let i = 0; i < productImages.length; i++) {
      const fileName = productImages[i] ? productImages[i].name : null;

      if (fileName) {
        const imagesRef = ref(
          storage,
          `images/productImages/${uuid}/${fileName}`
        );
        const fileRef = ref(imagesRef);
        const uploadTask = uploadBytesResumable(fileRef, productImages[i]);

        uploadTasks.push(uploadTask);

        uploadTask.on('state_changed', (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(`Upload of image ${i} is ${progress}% done`);
          setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[i] = progress;
            return updatedProgress;
          });
        });

        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);

        images.push(downloadURL);
      }
    }

    const docRef = doc(db, 'admin', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const businessData = docSnap.data();

    const newProduct = {
      productName: productName,
      category: category,
      productDescription: productDescription,
      previousPrice: previousPrice,
      currentPrice: currentPrice,
      color: color,
      size: size,
      status: status,
      condition: condition,
      imageUrls: images,
      productId: uuid,
      dateAdded: Timestamp.fromDate(new Date()),
      userUid: auth.currentUser.uid,
      businessName: businessData.businessName,
    };
    await updateDoc(docRef, {
      products: arrayUnion(newProduct),
    });
    setProductName('');
    setCategory('');
    setProductDescription('');
    setPreviousPrice('');
    setCurrentPrice('');
    setColor('');
    setSize('');
    setStatus('');
    setCondition('');
    navigate('/productpage');
  };

  const clearForm = () => {
    setProductName('');
    setCategory('');
    setProductDescription('');
    setPreviousPrice('');
    setCurrentPrice('');
    setColor('');
    setSize('');
    setStatus('');
    setCondition('');
    setProductImages([]);
  };

  useEffect(() => {
    setUploadProgress(new Array(productImages.length).fill(0));
  }, [productImages]);

  function allowDrop(event) {
    event.preventDefault();
  }

  const drop = (event) => {
    event.preventDefault();
    const images = [];
    const maxImages = 10; // maximum number of images
    const files = event.dataTransfer.files;

    if (files.length > maxImages) {
      setFeedback('Sorry, you can only upload up to 10 images, we have deleted the rest');
      for (let i = 0; i < maxImages; i++) {
        const file = files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    }

    setProductImages(images);
  };
  const handleSelect = (event) => {
    const images = [];
    const maxImages = 10; // maximum number of images

    if (event.target.files.length > maxImages) {
      setFeedback('Sorry, you can only upload up to 10 images, we have deleted the rest');
      for (let i = 0; i < maxImages; i++) {
        const file = event.target.files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const imgUrl = URL.createObjectURL(file);
        setSelectedImage(imgUrl);
        images.push(file);
      }
    }

    setProductImages(images);
  };

  function handleClick(event) {
    // Trigger click on input element to open file selection dialog
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  }

  const handleDeleteImage = (index, event) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    // add this line to prevent the default form submission behavior
  };
  const handleCancelClick = () => {
    setFeedback('');
  };

  return (
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
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Category</div>
                  <select
                    className="yesss"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
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
                      value={previousPrice}
                      onChange={(e) => setPreviousPrice(e.target.value)}
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
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="borer container brilliant">
          <div className="Media">Media</div>
          <div className="own-eyes">
            <div className="upload-images">Upload Product Images</div>
            <div>
              {feedback && (
                <div className="alert">
                  <div>
                    <RiErrorWarningFill className="mx-2 loik2" />
                    {feedback}
                  </div>
                  <div className="cann">
                    <MdCancel onClick={handleCancelClick} />
                  </div>
                </div>
              )}
              <div className="dashed" onDragOver={allowDrop} onDrop={drop}>
                {productImages.length === 0 && (
                  <div className="moddd">
                    <div className="uppl">
                      Upload your Product Images Here (10 Images Max)
                    </div>
                    <div className="faint">
                      Drag files here or Click “Upload” to open your “File
                      Manager”
                    </div>
                    <div className="mt-3">
                      <FaCloudUploadAlt className="cloud" />
                    </div>
                    <div className="highg">
                      <button className="uppp" onClick={handleClick}>
                        Upload Images
                      </button>
                      <input
                        type="file"
                        id="file-input"
                        multiple
                        accept="image/*"
                        onChange={handleSelect}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                )}
                {productImages.length > 0 && (
                  <div>
                    <div className="row">
                      {productImages.map((image, index) => (
                        <div
                          className="col d-flex justify-content-center"
                          key={index}
                        >
                          <div
                            className="my-3"
                            style={{ position: 'relative' }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Uploaded"
                              className="happed"
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <div
                                className="pRogress"
                                style={{
                                  background: '#000000',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '40px',
                                  width: '40px',
                                }}
                              >
                                {uploadProgress[index] > 0 && (
                                  <CircularProgress
                                    style={{
                                      height: '25px',
                                      width: '25px',
                                      color: 'white',
                                    }}
                                    variant="determinate"
                                    value={uploadProgress[index]}
                                  />
                                )}
                              </div>
                            </div>
                            {!isButtonClicked && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  height: '34px',
                                  width: '34px',
                                  borderRadius: '50%',
                                  background: '#F6F6F7',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  color: 'black',
                                  fontWeight: 'bolder',
                                }}
                                onClick={(event) =>
                                  handleDeleteImage(event, index)
                                }
                              >
                                X
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Product Size</div>
                  <select
                    className="yesss"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
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
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
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
        <div className="container brilliant woww">
          <div className="">
            <button
              onClick={clearForm}
              disabled={loading}
              className={`delete ${loading ? 'disableddd2' : ''}`}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              className={`save ${
                loading ||
                !productName ||
                !category ||
                !productDescription ||
                !currentPrice ||
                !status ||
                !condition ||
                !selectedImage
                  ? 'disableddd'
                  : ''
              }`}
              onClick={uploadProduct}
              disabled={
                !productName ||
                !category ||
                !productDescription ||
                !currentPrice ||
                !status ||
                !condition ||
                !selectedImage
              }
            >
              {loading ? (
                <>
                  <CircularProgress
                    style={{ color: 'white', height: '23px', width: '23px' }}
                  />
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
