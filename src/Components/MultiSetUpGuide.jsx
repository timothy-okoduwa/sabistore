import React, { useState } from 'react';
import EmptyProductList from './EmptyProductList';
import SetUpGuide from './SetUpGuide';

const MultiSetUpGuide = () => {
  const [step, setStep] = useState(1);

  const renderGuides = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <SetUpGuide step={step} setStep={setStep} />
          </div>
        );
      case 2:
        return (
          <div>
            <EmptyProductList step={step} setStep={setStep} />
          </div>
        );

      default:
       return null;
    }
  };

  return (
    <div>
      <div>{renderGuides()}</div>
    </div>
  );
};

export default MultiSetUpGuide;
