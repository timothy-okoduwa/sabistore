import React, { useState, useEffect } from 'react';
import '../pages/DashBoard/Dashboard.css';
import { TbCircleDashed } from 'react-icons/tb';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import s from './images/setup.svg';
const SetUpGuide = ({
  setStep,
  step,
  storeCompleted,
  productCompleted,
  previewCompleted,
  shareStore,
  store,
  create,
  preview,
  share,
  setShareStore,
  setStoreCompleted,
  setProductCompleted,
  setPreviewCompleted,
}) => {
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
                  <div
                    className="steps-to-guide mt-4 mb-4"
                    onClick={storeCompleted ? null : store}
                  >
                    {storeCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}
                    <span className={storeCompleted ? 'grayed-out-text' : ''}>
                      Complete/Create your store profile
                    </span>
                  </div>
                  <div
                    className="steps-to-guide mb-4"
                    onClick={productCompleted ? null : create}
                  >
                    {' '}
                    {productCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    <span className={productCompleted ? 'grayed-out-text' : ''}>
                      Create a Product
                    </span>
                  </div>
                  <div
                    className="steps-to-guide mb-4"
                    onClick={previewCompleted ? null : preview}
                  >
                    {' '}
                    {previewCompleted ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    <span className={previewCompleted ? 'grayed-out-text' : ''}>
                      Preview your store
                    </span>
                  </div>
                  <div
                    className="steps-to-guide mb-4"
                    onClick={shareStore ? null : share}
                  >
                    {shareStore ? (
                      <BsCheckCircleFill className="dashed-circle2" />
                    ) : (
                      <TbCircleDashed className="dashed-circle" />
                    )}{' '}
                    <span className={shareStore ? 'grayed-out-text' : ''}>
                      Share your store link
                    </span>
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
                  setShareStore(true);
                  setStoreCompleted(true);
                  setProductCompleted(true);
                  setPreviewCompleted(true);
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
