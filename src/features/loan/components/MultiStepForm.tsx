import { useEffect, useState } from 'react';
import CustomerInfo from './CustomerInfo';
import CreditInfo from './CreditInfo';
import CreditGuarantors from './CreditGuarantors';
import CreditSummary from './CreditSummary';
import LoanCalculator from './LoanCalculator';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formHeader, setFormHeader] = useState('Müştəri məlumatları');

  const navigate = useNavigate();

  const handleNext = () => setStep(prev => prev + 1);

  const handleBack = () => setStep(prev => prev - 1);

  useEffect(() => {
    switch (step) {
      case 1:
        setFormHeader('Müştəri məlumatları');
        break;
      case 2:
        setFormHeader('Kredit detalları');
        break;
      case 3:
        setFormHeader('Zamin seçimi');
        break;
      case 4:
        setFormHeader('Kredit hesablanması');
        break;
      case 5:
        setFormHeader('Xülasə');
        break;
      default:
        break;
    }
  }, [step]);

  return (
    <div>
      <div className="flex gap-8 items-center">
        <Button onClick={() => navigate('/')}>Əsas səhifəyə dön</Button>
        <h1 className="my-4">{formHeader}</h1>
      </div>
      {step === 1 && <CustomerInfo onNext={handleNext} />}
      {step === 2 && <CreditInfo onNext={handleNext} onBack={handleBack} />}
      {step === 3 && (
        <CreditGuarantors onNext={handleNext} onBack={handleBack} />
      )}
      {step === 4 && <LoanCalculator onNext={handleNext} onBack={handleBack} />}
      {step === 5 && <CreditSummary />}
    </div>
  );
};

export default MultiStepForm;
