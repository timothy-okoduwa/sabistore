import React, { useState, useEffect } from 'react';
import EmptyProductList from './EmptyProductList';
import SetUpGuide from './SetUpGuide';
import { useNavigate } from 'react-router-dom';
const MultiSetUpGuide = () => {
  const [step, setStep] = useState(1);
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
    navigate('/settings');
    setStoreCompleted(true);
    localStorage.setItem('storeCompleted', true);
  };

  const create = () => {
    navigate('/addproduct');
    setProductCompleted(true);
    localStorage.setItem('productCompleted', true);
  };

  const preview = () => {
    navigate('/store');
    setPreviewCompleted(true);
    localStorage.setItem('previewCompleted', true);
  };
  const share = () => {
    navigate('/store');
    setShareStore(true);
    localStorage.setItem('shareCompleted', true);
  };

  const renderGuides = () => {
    const anyStateTrue =
      storeCompleted || productCompleted || previewCompleted || shareStore;
    if (!anyStateTrue) {
      return (
        <SetUpGuide
          step={step}
          setStep={setStep}
          storeCompleted={storeCompleted}
          productCompleted={productCompleted}
          previewCompleted={previewCompleted}
          shareStore={shareStore}
          store={store}
          create={create}
          preview={preview}
          share={share}
          setShareStore={setShareStore}
          setStoreCompleted={setStoreCompleted}
          setProductCompleted={setProductCompleted}
          setPreviewCompleted={setPreviewCompleted}
        />
      );
    } else if (
      !storeCompleted ||
      !productCompleted ||
      !previewCompleted ||
      !shareStore
    ) {
      return (
        <SetUpGuide
          step={step}
          setStep={setStep}
          storeCompleted={storeCompleted}
          productCompleted={productCompleted}
          previewCompleted={previewCompleted}
          shareStore={shareStore}
          store={store}
          create={create}
          preview={preview}
          share={share}
          setShareStore={setShareStore}
          setStoreCompleted={setStoreCompleted}
          setProductCompleted={setProductCompleted}
          setPreviewCompleted={setPreviewCompleted}
        />
      );
    } else {
      return (
        <EmptyProductList
          step={step}
          setStep={1}
          setShareStore={setShareStore}
        />
      );
    }
  };

  return (
    <div className="sososos">
      <div>{renderGuides()}</div>
    </div>
  );
};

export default MultiSetUpGuide;
