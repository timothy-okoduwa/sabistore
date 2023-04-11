import React, { useState } from 'react';
import '../pages/AddProduct/AddProduct.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
const NewProduct = () => {
  const [images, setImages] = useState([]);

  function allowDrop(event) {
    event.preventDefault();
  }

  async function drop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const newImages = [...images];
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push(reader.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }
    await Promise.all(promises);
    setImages(newImages);
  }
  function handleSelect(event) {
    const files = event.target.files;
    Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result);
          };
        });
      })
    ).then((results) => {
      setImages((prevImages) => [...prevImages, ...results]);
    });
  }

  function handleClick(event) {
    // Trigger click on input element to open file selection dialog
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  }

  const handleDeleteImage = (index, event) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    // add this line to prevent the default form submission behavior
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
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Category</div>
                  <select className="yesss">
                    <option value="">Category</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
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
              />
            </div>
            <div className="mt-3">
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Condition of Product</div>
                    <select className="yesss">
                      <option value="">Condition of Product</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Price</div>
                    <input
                      className="yesss"
                      type="number"
                      placeholder="Price"
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
              <div className="dashed" onDragOver={allowDrop} onDrop={drop}>
                {images.length === 0 && (
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
                {images.length > 0 && (
                  <div>
                    <div className="row">
                      {images.map((image, index) => (
                        <div
                          className="col d-flex justify-content-center"
                          key={index}
                        >
                          <div
                            className="my-3"
                            style={{ position: 'relative' }}
                          >
                            <img
                              src={image}
                              alt="Uploaded"
                              className="happed"
                            />
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
                  />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="a34">Product Size</div>
                  <select className="yesss">
                    <option value="">Product Size</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="row mt-4">
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Condition of Product</div>
                    <select className="yesss">
                      <option value="">Condition of Product</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div>
                    <div className="a34">Product Status</div>
                    <select className="yesss">
                      <option value="">Product Status</option>
                      <option value="Available"> Available</option>
                      <option value="Out of Stock"> Out of Stock</option>
                      <option value="Few units left"> Few units left</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container brilliant woww">
          <div className="">
            <button className="delete">Delete</button>
          </div>
          <div>
            <button className="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
