import React, { useState, useEffect } from 'react';
import '../pages/DashBoard/Dashboard.css';
import { TbCircleDashed } from 'react-icons/tb';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import s from './images/setup.svg';
const SetUpGuide = ({ step, setStep }) => {
  const [storeCompleted, setStoreCompleted] = useState(
    localStorage.getItem('storeCompleted') === 'true'
  );
  const [productCompleted, setProductCompleted] = useState(
    localStorage.getItem('productCompleted') === 'true'
  );
  const [previewCompleted, setPreviewCompleted] = useState(
    localStorage.getItem('previewCompleted') === 'true'
  );
  const [shareStore, setShareStore] = useState(
    localStorage.getItem('shareCompleted') === 'true'
  );
  useEffect(() => {
    const storedStoreCompleted =
      localStorage.getItem('storeCompleted') === 'true';
    const storedProductCompleted =
      localStorage.getItem('productCompleted') === 'true';
    const storedPreviewCompleted =
      localStorage.getItem('previewCompleted') === 'true';
    const storedShareCompleted =
      localStorage.getItem('shareCompleted') === 'true';
    setStoreCompleted(storedStoreCompleted);
    setProductCompleted(storedProductCompleted);
    setPreviewCompleted(storedPreviewCompleted);
    setShareStore(storedShareCompleted);
  }, []);
  const navigate = useNavigate();
  const store = () => {
    navigate('/productpage');
    setStoreCompleted(true);
    localStorage.setItem('storeCompleted', true);
  };

  const create = () => {
    navigate('/productpage');
    setProductCompleted(true);
    localStorage.setItem('productCompleted', true);
  };

  const preview = () => {
    navigate('/productpage');
    setPreviewCompleted(true);
    localStorage.setItem('previewCompleted', true);
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="set-up-dash">
          <div className="guideline-hold-with-bottom-border">
            <div className="container p-4 px-5 pb-4 ">
              <div className="bold-name-setup">Setup Guide</div>
              <div className="guide-line-talks">
                This is a guideline for you on how to create you first product
                in your store
              </div>
            </div>
          </div>
          <div className="container pt-4 px-5 pb-4">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div>
                  <div className="steps-to-guide mt-4 mb-4" onClick={store}>
                    {storeCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}
                    Complete/Create your store profile
                  </div>
                  <div className="steps-to-guide mb-4" onClick={create}>
                    {' '}
                    {productCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    Create a Product
                  </div>
                  <div className="steps-to-guide mb-4" onClick={preview}>
                    {' '}
                    {previewCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    Preview your store
                  </div>
                  <div className="steps-to-guide mb-4">
                    {shareStore ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    Share your store link
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 hand-book-style">
                <div className="hand-book-style">
                  <img src={s} alt="picss" className="hand-book-image-style" />
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-4 px-5 pb-4">
            <div>
              <button
                className="skip-guideline-button"
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                Skip Guideline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUpGuide;
