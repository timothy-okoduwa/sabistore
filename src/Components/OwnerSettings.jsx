import React, { useState } from 'react';
import '../pages/Settings/Settings.css';
import { GoVerified } from 'react-icons/go';
const OwnerSettings = () => {
  const [images, setImages] = useState([]);
  function handleSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages([reader.result]);
    };
  }

  function handleClick(event) {
    // Trigger click on input element to open file selection dialog
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  }

  return (
    <div className="through">
      <div className="sett mb-3">
        <div style={{ position: 'relative' }}>
          <div className="store-cover">
            {images.map((image) => (
              <img src={image} alt="" className="store-cover2" />
            ))}
          </div>
          <div>
            <button className="upppoi" onClick={handleClick}>
              Upload Image
            </button>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleSelect}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="loo">
          <div className="retrospect">
            <div className="ava-wrapper">
              <div className="ava">TH</div>
              <div className="fhfh">
                <GoVerified />
              </div>
            </div>
          </div>
        </div>
        <div className="GFly">GFly</div>
        <div className="g-stores">gfly_stores</div>
        <div className="container mt-5">
          <div className="eleoo">
            <div className="div">Store Details</div>
            <div className="row mt-4">
              <div className="col-12 col-lg-6 mb-4">
                <div>
                  <div className="trouble">Business Name</div>
                  <input
                    type="text"
                    className="cupid"
                    placeholder="Business Name"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6 ">
                <div>
                  <div className="trouble">Email</div>
                  <input
                    type="text"
                    className="cupid"
                    placeholder="@gmail.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mt-4">
                <div className="trouble">About Store</div>
                <textarea
                  className="lrted"
                  rows="7"
                  placeholder="Enter store description"
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="trouble">Location</div>
                  <select className="yesss">
                    <option value="">Ajeromi Ifelodun</option>
                    <option value="option1">NGN</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="trouble">Phone Number</div>
                  <input
                    type="text"
                    className="cupid"
                    placeholder="e.g: 08123769045"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="trouble">Store Currency</div>
                  <select className="yesss">
                    <option value="">NGN</option>
                    <option value="option1">NGN</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                {/* <div>
                  <div className="trouble">Location</div>
                  <select className="yesss">
                    <option value="">Ajeromi Ifelodun</option>
                    <option value="option1">NGN</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="container brilliant woww2">
          <div>
            <button className="delete">Deactivate Store </button>
          </div>
          <div className="">
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerSettings;
